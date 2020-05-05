import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, css } from 'theme-ui';
import { applyVariation } from '../utils/getStyles';

const CollapseContent = styled(Box)`
  ${({ theme, open, height, transitionDuration, transitionFunction }) =>
    css({
      maxHeight: open ? height + 'px' : '0',
      overflow: 'hidden',
      transitionProperty: 'all',
      transitionDuration: parseInt(transitionDuration) + 'ms',
      transitionTimingFunction: transitionFunction,
    })(theme)}
`;

const CollapseBody = styled(Box)(({ theme, variant }) =>
  applyVariation(theme, `${variant}.body`, 'collapse')
);

const CollapseHead = styled(Box)(({ theme, variant }) =>
  applyVariation(theme, `${variant}.head`, 'collapse')
);

const Collapse = ({
  children,
  variant,
  head,
  isOpen: defaultOpen,
  transitionDuration,
  transitionFunction,
  isCollapsed,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef();

  return (
    <Fragment>
      <CollapseHead
        onClick={() => {
          setIsOpen(!isOpen);
          isCollapsed && isCollapsed();
        }}
        variant={variant}
      >
        {head && head()}
      </CollapseHead>
      <CollapseContent
        open={isOpen}
        height={
          contentRef &&
          contentRef.current &&
          contentRef.current.getBoundingClientRect().height
        }
        transitionDuration={transitionDuration}
        transitionFunction={transitionFunction}
        variant={variant}
      >
        <CollapseBody ref={contentRef} variant={variant}>
          {children}
        </CollapseBody>
      </CollapseContent>
    </Fragment>
  );
};

Collapse.propTypes = {
  isOpen: PropTypes.bool,
  transitionDuration: PropTypes.number,
  variant: PropTypes.string,
  head: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  transitionFunction: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  isCollapsed: PropTypes.func,
};

Collapse.defaultProps = {
  isOpen: false,
  transitionDuration: 200,
  variant: 'primary',
  transitionFunction: 'linear',
  isCollapsed: null,
};

export default Collapse;
