import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

import { Box, css } from 'theme-ui';
import { InlineBlock } from './layout';
import { PropTypes } from 'prop-types';

const DropDown = styled(InlineBlock)`
  position: relative;
`;

const DropdownContainer = styled(Box)`
  position: absolute;

  width: 200px;
  background: #fff;
  padding: 10px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const Menu = styled(Box)`
  position: relative;
  padding: 5px 10px;
  &:hover {
    background: #ddd;
  }

  ${({ theme, hover }) =>
    css({
      bg: hover ? '#ddd' : '',
    })(theme)}
`;

const DropdownMenu = ({ children, options, id, onSelect, noOptionMessage }) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [keySelected, setKeySelected] = useState(0);
  const componentRef = useRef();

  useEffect(() => {
    options &&
      document.body.addEventListener('click', handleOutsideClick, true);
    options &&
      document.body.addEventListener('keydown', handleKeyboardEvent, true);
    return () => {
      options &&
        document.body.removeEventListener('click', handleOutsideClick, true);
      options &&
        document.body.removeEventListener('keydown', handleKeyboardEvent, true);
    };
  });

  const handleKeyboardEvent = e => {
    if (showDropdownMenu) {
      const len = options.length;
      switch (e.keyCode) {
        case 38: // up arrow
          const i = keySelected < 1 ? len - 1 : (keySelected - 1) % len;
          setKeySelected(i);
          return;
        case 40: // down arrow
          setKeySelected((keySelected + 1) % len);
          return;
        case 13: // enter key
          setShowDropdownMenu(!showDropdownMenu);
          onSelect && onSelect(e, options[keySelected]);
      }
    }
  };

  const handleOutsideClick = e => {
    if (componentRef.current.contains(e.target)) {
      return;
    }
    setShowDropdownMenu(false);
  };

  const dropdownMenus = options ? (
    options.map((option, index) => (
      <Menu
        onClick={e => {
          setShowDropdownMenu(!showDropdownMenu);
          onSelect && onSelect(e, option);
        }}
        key={option.value}
        onMouseOver={() => setKeySelected(index)}
        hover={keySelected === index}
      >
        {option.label}
      </Menu>
    ))
  ) : (
    <Box>{noOptionMessage}</Box>
  );

  return (
    <InlineBlock ref={componentRef}>
      <DropDown onClick={() => setShowDropdownMenu(!showDropdownMenu)} id={id}>
        {children}
      </DropDown>
      {showDropdownMenu && (
        <DropdownContainer>{dropdownMenus}</DropdownContainer>
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
  onSelect: PropTypes.func,
};
DropdownMenu.defaultProps = {
  id: '',
  onSelect: null,
  noOptionMessage: 'No options found',
};

export default DropdownMenu;
