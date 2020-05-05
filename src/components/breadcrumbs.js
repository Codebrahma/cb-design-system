import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Flex, css, Box } from 'theme-ui';
import { InlineBlock } from './layout';
import { ENTER_KEY } from '../utils/general';
import { applyVariation } from '../utils/getStyles';

const BreadcrumbContainer = styled(Flex)`
  flex-wrap: wrap;
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.breadcrumbContainer`, 'breadcrumbs')}
`;

const BreadcrumbItem = styled(InlineBlock)`
  cursor: pointer;
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.breadcrumbItem`, 'breadcrumbs')}
`;

const Separater = styled(InlineBlock)`
  ${css({
    color: 'borderGray',
    mx: 2,
  })}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.separater`, 'breadcrumbs')}
`;

const Breadcrumbs = ({
  options,
  onSelect,
  separater,
  tabIndex,
  variant,
  ...otherProps
}) => {
  const len = options.length;

  return (
    <BreadcrumbContainer variant={variant}>
      {options.map((option, i) => (
        <Box key={option.value}>
          <BreadcrumbItem
            key={option.value}
            onClick={(e) => onSelect && onSelect(option, e)}
            onKeyUp={(e) =>
              onSelect && e.keyCode === ENTER_KEY && onSelect(option, e)
            }
            tabIndex={tabIndex}
            variant={variant}
            {...otherProps}
          >
            {option.label}
          </BreadcrumbItem>
          {i !== len - 1 ? (
            <Separater variant={variant}>
              {' '}
              {separater || <span>&#62;</span>}
            </Separater>
          ) : null}
        </Box>
      ))}
    </BreadcrumbContainer>
  );
};

Breadcrumbs.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func,
  separater: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  tabIndex: PropTypes.string,
  variant: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  onSelect: null,
  separater: null,
  tabIndex: '0',
  variant: 'primary',
};

export default Breadcrumbs;
