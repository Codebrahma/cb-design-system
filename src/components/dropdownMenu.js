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

const DropDown = styled(InlineBlock)`
  position: relative;
  ${({ theme, variant }) =>
    css({
      ...getThemeStyles(theme, 'dropdownMenu', variant, 'dropdownTrigger'),
    })(theme)}
`;

const DropdownContainer = styled(Box)`
  position: absolute;
  width: 200px;
  background: #fff;
  padding: 10px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  ${({ theme, variant }) =>
    css({
      ...getThemeStyles(theme, 'dropdownMenu', variant, 'dropdownContainer'),
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
  children,
  variant,
  options,
  id,
  onSelect,
  noOptionMessage,
}) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [keySelected, setKeySelected] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    if (options && showDropdownMenu) {
      document.body.addEventListener('click', handleOutsideClick, true);
      document.body.addEventListener('keydown', handleKeyboardEvent, true);
    }
    return () => {
      if (options && showDropdownMenu) {
        document.body.removeEventListener('click', handleOutsideClick, true);
        document.body.removeEventListener('keydown', handleKeyboardEvent, true);
      }
    };
  });

  const toggleDropdown = toggleState => {
    setShowDropdownMenu(toggleState);
    setKeySelected(0);
  };

  const handleKeyboardEvent = e => {
    e.preventDefault();
    e.stopPropagation();
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
    <InlineBlock ref={componentRef}>
      <DropDown
        variant={variant}
        onClick={() => toggleDropdown(!showDropdownMenu)}
        id={id}
      >
        {children}
      </DropDown>
      {showDropdownMenu && (
        <DropdownContainer variant={variant}>{dropdownMenus}</DropdownContainer>
      )}
    </InlineBlock>
  );
};

DropdownMenu.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  noOptionMessage: PropTypes.string,
  variant: PropTypes.string,
  onSelect: PropTypes.func,
};
DropdownMenu.defaultProps = {
  id: '',
  onSelect: null,
  variant: 'primary',
  noOptionMessage: 'No options found',
};

export default DropdownMenu;
