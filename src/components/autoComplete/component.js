import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Input as input, css, Flex } from 'theme-ui';
import { Relative, Absolute } from '../position';
import { InlineBlock } from '../layout';
import { applyVariation } from '../../utils/getStyles';

const DropDownContainer = styled(Relative)`
  ${({ theme }) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'borderGray',
    })(theme)}
  ${({ theme, variant }) => applyVariation(theme, `${variant}.container`, 'autoComplete')}
  ${({ theme, variant, focused }) => focused ? applyVariation(theme, `${variant}.container.&:focus`, 'autoComplete') : ''}
`;

const Options = styled(Absolute)`
  ${({ theme }) => css({
    zIndex: 7,
    maxHeight: '300px',
    width: '100%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'borderGray',
    borderRadius: 4,
    overflow: 'scroll',
    background: 'white',
  })(theme)}
  ${({ theme, variant }) => applyVariation(theme, `${variant}.optionsContainer`, 'autoComplete')}
`;

const Option = styled(Box)`
  ${({ theme }) => css({
    cursor: 'pointer',
    height: 'max-content',
    maxHeight: '300px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'borderGray',
    p: 2,
  })(theme)}
  ${({ theme, variant }) => applyVariation(theme, `${variant}.option`, 'autoComplete')}
  ${({ theme, variant, hover }) => hover ? applyVariation(theme, `${variant}.option.&:hover`, 'autoComplete') : ''}
`;

const Input = styled(input)`
  ${css({
    width: 'max-content',
    border: 'none',
    outline: 'none',
    padding: 0,
    my: 2,
  })}
`;

const Placeholder = styled(Absolute)(
  ({theme, variant}) => applyVariation(theme, `${variant}.placeholder`, 'autoComplete')
);

const Icon = styled(Flex)(
  ({theme}) => css({
    px: 2,
    py: 0,
    cursor: 'pointer',
  })(theme)
);

// MultiSelect component

const SelectOption = styled(Flex)`
  ${({ theme }) => css({
    margin: '1px',
    minWidth: 'max-content',
    borderRadius: 2,
    paddingLeft: 2,
    fontSize: 'small',
  })(theme)}
  ${({ theme, variant }) => applyVariation(theme, `${variant}.multiselectContainer`, 'autoComplete')}
`;

const CloseIcon = styled(Flex)`
  ${css({
    alignItems: 'center',
    px: 1,
    '&:hover': {
      background: 'lightGray',
      cursor: 'pointer',
    },
  })}
`;

const CustomIcon = styled('img')`
  ${({ theme, variant }) => applyVariation(theme, `${variant}.customIcon`, 'autoComplete')}
`;

const MultiSelectOption = ({ children, onClick, variant }) => (
  <SelectOption variant={variant}>
    <InlineBlock css={{ paddingRight: '2px' }} >{children}</InlineBlock>
    <CloseIcon onClick={onClick}>
      <svg
        height='20'
        width='20'
        viewBox='0 0 20 20'
        aria-hidden='true'
        focusable='false'
        fill='#929292'
      >
        <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' />
      </svg>
    </CloseIcon>
  </SelectOption>
);
MultiSelectOption.propTypes = {
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

export {
  DropDownContainer,
  Options,
  Option,
  MultiSelectOption,
  Input,
  Absolute as Selected,
  Placeholder,
  Icon,
  CustomIcon,
};
