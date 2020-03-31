import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

import { Box, css } from 'theme-ui';
import { InlineBlock } from './layout';
import { PropTypes } from 'prop-types';
import {
  applyVariation,
} from './../utils/getStyles';
import {
  UP_ARROW,
  DOWN_ARROW,
  ENTER_KEY,
  TAB_KEY,
} from './../utils/general';

const DropdownContainer = styled(InlineBlock)({
  position: 'relative',
});

const DropDown = styled(InlineBlock)(
  ({ theme, variant }) => applyVariation(theme, `${variant}.dropdownTrigger`, 'dropdownMenu')
);

const MenusContainer = styled(Box)`
  ${({ theme, displayTop }) => css({
    position: 'absolute',
    width: '200px',
    background: 'white',
    padding: '10px 0',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'borderGray',
    borderRadius: '6px',
    bottom: displayTop,
  })(theme)}
  ${({theme, variant}) => applyVariation(theme, `${variant}.dropdownContainer`, 'dropdownMenu')}
`;

const Menu = styled(Box)`
  ${({ theme }) => css({
    position: 'relative',
    padding: '5px 10px',
    '&:hover': {
      background: 'borderGray',
    },
  })(theme)}
  ${({ theme, variant }) => applyVariation(theme, `${variant}.dropdownOption`, 'dropdownMenu')}
  ${({ theme, variant, hover }) => hover ? applyVariation(theme, `${variant}.dropdownOption.&:hover`, 'dropdownMenu') : ''}
  ${({ theme, variant, hover }) => hover ? applyVariation(theme, `${variant}.dropdownOption.&:focus`, 'dropdownMenu') : ''}
`;

const DropdownMenu = ({
  id,
  variant,
  children,
  options,
  onSelect,
  noOptionMessage,
  scrollableContainer,
}) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [keySelected, setKeySelected] = useState(null);
  const [positionTop, setPositionTop] = useState(false);
  const componentRef = useRef();
  const contentRef = useRef();
  const dropdownButton = useRef();

  useEffect(() => {
    showDropdownMenu && determinePosition();
  }, [showDropdownMenu]);

  useEffect(() => {
    const scrollContainer = scrollableContainer || document.body;
    if (showDropdownMenu) {
      document.body.addEventListener('click', handleOutsideClick, true);
      document.body.addEventListener('keydown', handleKeyboardEvent, true);
      scrollContainer.addEventListener('scroll', determinePosition, true);
    }
    return () => {
      if (showDropdownMenu) {
        document.body.removeEventListener('click', handleOutsideClick, true);
        document.body.removeEventListener('keydown', handleKeyboardEvent, true);
        scrollContainer.removeEventListener('scroll', determinePosition, true);
      }
    };
  });

  const toggleDropdown = toggleState => {
    setShowDropdownMenu(toggleState);
    if (!toggleState) {
      setKeySelected(null);
      setPositionTop(false);
    }
  };

  const handleKeyboardEvent = e => {
    e.preventDefault();
    const len = options.length;

    switch (e.keyCode) {
      case UP_ARROW:
        const i = keySelected < 1 ? len - 1 : (keySelected - 1) % len;
        setKeySelected(i);
        return;
      case DOWN_ARROW:
        const index = keySelected !== null ? ((keySelected + 1) % len) : 0;
        setKeySelected(index);
        return;
      case ENTER_KEY:
        if (showDropdownMenu && onSelect) onSelect(options[keySelected], e);
        if (!showDropdownMenu) {
          dropdownButton.current.focus();
        } else {
          dropdownButton.current.blur();
        }
        toggleDropdown(!showDropdownMenu);
        return;
      case TAB_KEY:
        toggleDropdown(!showDropdownMenu);
    }
  };

  const determinePosition = () => {
    const [target, content] = componentRef.current.children;
    const windowHeight = window.innerHeight;
    const { top, height } = content.getBoundingClientRect();
    const { height: contentHeight } = target.getBoundingClientRect();
    const totalHeight = top + height;

    if ((totalHeight > windowHeight) && (top > height)) {
      setPositionTop(`${contentHeight}px`);
    } else {
      setPositionTop(false);
    }
  };

  const handleOutsideClick = e => {
    if (componentRef.current.contains(e.target)) {
      return;
    }
    toggleDropdown(false);
  };

  const dropdownMenus = options
    ? options.map((option, index) => (
      <Menu
        onClick={e => {
          toggleDropdown(!showDropdownMenu);
          onSelect && onSelect(option, e);
        }}
        key={option.value}
        onMouseOver={() => setKeySelected(index)}
        hover={keySelected === index}
        variant={variant}
      >
        {option.label}
      </Menu>
    ))
    : noOptionMessage;

  return (
    <DropdownContainer ref={componentRef}>
      <DropDown
        variant={variant}
        onClick={() => toggleDropdown(!showDropdownMenu)}
        id={id}
        tabIndex='0'
        onKeyUp={(e) => e.keyCode === ENTER_KEY ? handleKeyboardEvent(e) : null}
        ref={dropdownButton}
      >
        {children}
      </DropDown>
      {showDropdownMenu && (
        <MenusContainer
          variant={variant}
          ref={contentRef}
          displayTop={positionTop || 'unset'}
        >
          {dropdownMenus}
        </MenusContainer>
      )}
    </DropdownContainer>
  );
};

DropdownMenu.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  noOptionMessage: PropTypes.string,
  variant: PropTypes.string,
  onSelect: PropTypes.func,
  scrollableContainer: PropTypes.node,
};

DropdownMenu.defaultProps = {
  id: '',
  onSelect: null,
  variant: 'primary',
  noOptionMessage: 'No options found',
  scrollableContainer: null,
  options: null,
};

export default React.memo(DropdownMenu);
