import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, css } from 'theme-ui';
import styled from '@emotion/styled';
import input from './input';
import textArea from './textArea';
import { applyVariation } from '../utils/getStyles';

const styles = (position) => {
  switch (position) {
    case 'right':
      return {
        input: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        textarea: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        div: {
          borderRadius: 3,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          bg: 'borderGray',
          minWidth: 'unset',
          position: 'relative',
          zIndex: 1,
        },
      };

    case 'left':
      return {
        flexDirection: 'row-reverse',
        input: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        textarea: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        div: {
          borderRadius: 3,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          bg: 'borderGray',
          minWidth: 'unset',
          position: 'relative',
          zIndex: 1,
        },
      };

    case 'top':
      return {
        flexDirection: 'column-reverse',
        alignItems: 'flex-start',
        div: {
          marginbottom: 1,
        },
      };

    case 'bottom':
      return {
        flexDirection: 'column',
        alignItems: 'flex-start',
        div: {
          marginTop: 1,
        },
      };
  }
};

const InputGroupContainer = styled(Flex)`
  ${({ theme, position }) =>
    css({
      alignItems: 'stretch',
      margin: 0,
      ...styles(position),
    })(theme)}
  ${({ theme, variant }) => applyVariation(theme, variant, 'inputGroup')}
`;

const Label = styled(Box)`
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.label`, 'inputGroup')}
`;

const Input = styled(input)`
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.input`, 'inputGroup')}
`;

const Textarea = styled(textArea)`
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.input`, 'inputGroup')}
`;

const InputGroup = ({ labelPosition, label, variant, as, ...otherProps }) => {
  return (
    <InputGroupContainer position={labelPosition} variant={variant}>
      {as === 'textarea' ? (
        <Textarea variant={variant} {...otherProps} />
      ) : (
        <Input type='text' variant={variant} {...otherProps} />
      )}
      <Label variant={variant}>
        {typeof label === 'string' ? label : label()}
      </Label>
    </InputGroupContainer>
  );
};

InputGroup.propTypes = {
  labelPosition: PropTypes.string,
  as: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

InputGroup.defaultProps = {
  labelPosition: 'right',
  variant: 'primary',
  as: 'input',
};

export default InputGroup;
