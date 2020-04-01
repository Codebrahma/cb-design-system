import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';

import { css } from 'theme-ui';
import { InlineBlock } from './layout';
import { Absolute, Relative } from './position';
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

const OptionsContainer = styled(Absolute)`
  ${({ theme, positionTop }) => css({
    zIndex: 7,
    width: '200px',
    background: 'white',
    py: 3,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'borderGray',
    borderRadius: 4,
    bottom: positionTop,
  })(theme)}
  ${({theme, variant}) => applyVariation(theme, `${variant}.dropdownContainer`, 'dropdownMenu')}
`;

const Menu = styled(Relative)`
  ${({ theme }) => css({
    py: 2,
    px: 3,
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
  tabIndex,
  noOptionMessage,
  scrollableContainer,
}) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [keySelected, setKeySelected] = useState(null);
  const [positionTop, setPositionTop] = useState(false);
  const componentRef = useRef();
  const contentRef = useRef();
  const dropdownButton = useRef();

  useEffect(() => {
    isOptionsVisible && determinePosition();
  }, [isOptionsVisible]);

  useEffect(() => {
    const scrollContainer = scrollableContainer || document.body;
    if (isOptionsVisible) {
      document.body.addEventListener('click', handleOutsideClick, true);
      document.body.addEventListener('keydown', handleKeyboardEvent, true);
      scrollContainer.addEventListener('scroll', determinePosition, true);
    }
    return () => {
      if (isOptionsVisible) {
        document.body.removeEventListener('click', handleOutsideClick, true);
        document.body.removeEventListener('keydown', handleKeyboardEvent, true);
        scrollContainer.removeEventListener('scroll', determinePosition, true);
      }
    };
  });

  const toggleDropdown = useCallback((toggleState) => {
    setIsOptionsVisible(toggleState);
    if (!toggleState) {
      setKeySelected(null);
      setPositionTop(false);
    }
  }, []);

  const handleKeyboardEvent = useCallback((e) => {
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
        if (isOptionsVisible && onSelect) onSelect(options[keySelected], e);
        if (!isOptionsVisible) {
          dropdownButton.current.focus();
        } else {
          dropdownButton.current.blur();
        }
        toggleDropdown(!isOptionsVisible);
        return;
      case TAB_KEY:
        toggleDropdown(!isOptionsVisible);
    }
  }, [isOptionsVisible, options, keySelected]);

  const determinePosition = useCallback(() => {
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
  }, [componentRef]);

  const handleOutsideClick = useCallback((e) => {
    if (componentRef.current.contains(e.target)) {
      return;
    }
    toggleDropdown(false);
  }, [componentRef]);

  const dropdownOptions = options
    ? options.map((option, index) => (
      <Menu
        onClick={e => {
          toggleDropdown(!isOptionsVisible);
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
        onClick={() => toggleDropdown(!isOptionsVisible)}
        id={id}
        tabIndex={tabIndex}
        onKeyUp={(e) => e.keyCode === ENTER_KEY ? handleKeyboardEvent(e) : null}
        ref={dropdownButton}
      >
        {children}
      </DropDown>
      {isOptionsVisible && (
        <OptionsContainer
          variant={variant}
          ref={contentRef}
          positionTop={positionTop || 'unset'}
        >
          {dropdownOptions}
        </OptionsContainer>
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
  tabIndex: PropTypes.string,
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
  tabIndex: '0',
};

export default React.memo(DropdownMenu);
