/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
// import PropTypes from 'prop-types';
import { Box } from 'theme-ui';
import { InlineBlock } from './layout';

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
const DropdownMenu = styled(Box)`
  position: relative;
  padding: 5px 10px;
  &:hover {
    background: #ddd;
  }
`;

const DropDownMenu = ({ children, options, id, onSelect, noOptionMessage }) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  const handleOutsideClick = e => {
    if (componentRef.current.contains(e.target)) {
      return;
    }
    setShowDropdownMenu(false);
  };

  const menus = options.map(option => {
    return (
      <DropdownMenu
        onClick={() => {
          console.log(option.value);
          onSelect && onSelect(option);
        }}
        key={option.value}
      >
        {option.label}
      </DropdownMenu>
    );
  });

  return (
    <InlineBlock ref={componentRef}>
      <DropDown onClick={() => setShowDropdownMenu(!showDropdownMenu)}>
        {children}
      </DropDown>
      {showDropdownMenu && <DropdownContainer>{menus}</DropdownContainer>}
    </InlineBlock>
  );
};

const D = () => {
  const options = [
    { label: 'Menu Item One', value: 'A0' },
    { label: 'Menu Item Two', value: 'B0' },
    { label: 'Menu Item Three', value: 'C0' },
    { label: 'Menu Item Four', value: 'D0' },
    { label: 'Menu Item Five', value: 'E0' },
    { label: 'Menu Item Six', value: 'F0' },
    { label: 'Menu Item Seven', value: 'G0' },
  ];
  return <DropDownMenu options={options}>Trigger</DropDownMenu>;
};

export default D;
