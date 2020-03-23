import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

import { Box, css } from 'theme-ui';
import { InlineBlock } from './layout';
import { PropTypes } from 'prop-types';
import {
  getThemeStyles,
  UP_ARROW,
  DOWN_ARROW,
  ENTER_KEY,
} from './../utils/getStyles';

const DropdownContainer = styled(InlineBlock)({
  position: 'relative',
});

const DropDown = styled(InlineBlock)`
  ${({ theme, variant }) =>
    css({
      ...getThemeStyles(theme, 'dropdownMenu', variant, 'dropdownTrigger'),
    })(theme)}
`;

const MenusContainer = styled(Box)`
  position: absolute;
  width: 200px;
  background: #fff;
  padding: 10px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  ${({ theme, variant, displayTop }) =>
    css({
      ...getThemeStyles(theme, 'dropdownMenu', variant, 'dropdownContainer'),
      bottom: displayTop,
    })(theme)}
`;

const Menu = styled(Box)`
  position: relative;
  padding: 5px 10px;
  &:hover {
    background: #ddd;
  }
  ${({ theme, variant, hover }) =>
    css({
      bg: hover
        ? getThemeStyles(
          theme,
          'dropdownMenu',
          variant,
          'dropdownMenu',
          '&:hover',
          'bg'
        ) || '#ddd'
        : '',
      ...getThemeStyles(theme, 'dropdownMenu', variant, 'dropdownMenu'),
    })(theme)}
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

  useEffect(() => {
    showDropdownMenu && determinePosition();
  }, [showDropdownMenu]);

  useEffect(() => {
    const scrollContainer = scrollableContainer || document.body;
    if (options && showDropdownMenu) {
      document.body.addEventListener('click', handleOutsideClick, true);
      document.body.addEventListener('keydown', handleKeyboardEvent, true);
      scrollContainer.addEventListener('scroll', determinePosition, true);
    }
    return () => {
      if (options && showDropdownMenu) {
        document.body.removeEventListener('click', handleOutsideClick, true);
        document.body.removeEventListener('keydown', handleKeyboardEvent, true);
        scrollContainer.removeEventListener('scroll', determinePosition, true);
      }
    };
  });

  const toggleDropdown = toggleState => {
    setShowDropdownMenu(toggleState);
    if (!toggleState) {
      setKeySelected(0);
      setPositionTop(false);
    }
  };

  const handleKeyboardEvent = e => {
    e.preventDefault();
    if (showDropdownMenu) {
      const len = options.length;
      switch (e.keyCode) {
        case UP_ARROW:
          const i = keySelected < 1 ? len - 1 : (keySelected - 1) % len;
          setKeySelected(i);
          return;
        case DOWN_ARROW:
          setKeySelected((keySelected + 1) % len);
          return;
        case ENTER_KEY:
          toggleDropdown(!showDropdownMenu);
          onSelect && onSelect(e, options[keySelected]);
      }
    }
  };

  const determinePosition = () => {
    const [target, content] = componentRef.current.children;
    const windowHeight = window.innerHeight;
    const { top, height } = content.getBoundingClientRect();
    const { height: contentHeight } = target.getBoundingClientRect();
    const totalHeight = top + height;
    console.log(top, height);
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
          onSelect && onSelect(e, option);
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
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
};

export default React.memo(DropdownMenu);
