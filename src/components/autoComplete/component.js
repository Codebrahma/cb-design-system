import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Input as input, css } from 'theme-ui';
import { Relative, Absolute } from '../position';
import { InlineBlock } from '../layout';

const DropDownContainer = styled(Relative)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 6px;
  ${({ theme }) =>
    css({
      '&:focus': {
        outline: 'none',
        borderColor: 'primary',
      },
    })(theme)}

  ${({ theme, focused }) =>
    css({
      borderColor: focused ? 'primary' : '',
      borderWidth: focused ? '1px' : '',
    })(theme)}
`;

const Options = styled(Absolute)`
  z-index: 1;
  max-height: 300px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: scroll;
  background: #fff;
`;

const Option = styled(Box)`
  cursor: pointer;
  height: max-content;
  max-height: 300px;
  border-bottom: 1px solid #ddd;
  padding: 5px;
  &:hover {
    background: #ddd;
  }
  ${({ theme, hover }) =>
    css({
      background: hover ? '#ddd' : '',
    })(theme)}
`;

const Input = styled(input)`
  border: none;
  outline: none;
  padding: 0;
  width: 2px;
  min-width: max-content;
`;

const Selected = Absolute;
const Placeholder = Absolute;

const ClearIcon = styled(InlineBlock)`
  padding: 0 7px;
  cursor: pointer;
`;

// MultiSelect component

const SelectOption = styled(InlineBlock)`
  background: #ddd;
  margin-right: 5px;
  min-width: max-content;
  display: flex;
  padding: 0 0 0 3px;
`;
const CloseIcon = styled(InlineBlock)`
  padding: 0 6px 3px;
  &:hover {
    background: #333;
    cursor: pointer;
  }
`;

const MultiSelectOption = ({ children, onClick }) => (
  <SelectOption>
    <InlineBlock>{children}</InlineBlock>
    <CloseIcon onClick={onClick}>x </CloseIcon>
  </SelectOption>
);
MultiSelectOption.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

export {
  DropDownContainer,
  Options,
  Option,
  MultiSelectOption,
  Input,
  Selected,
  Placeholder,
  ClearIcon,
};
