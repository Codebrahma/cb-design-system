import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, css } from 'theme-ui';

const CollapseItem = styled(Box)`
  ${({ theme, open, height, transitionDuration }) =>
    css({
      maxHeight: open ? height + 'px' : '0',
      overflow: 'hidden',
      transitionProperty: 'all',
      transitionDuration: parseInt(transitionDuration) + 'ms',
      transitionTimingFunction: 'linear',
    })(theme)}
`;

const Collapse = ({
  children,
  variant,
  item,
  isOpen: defaultOpen,
  transitionDuration,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef();
  console.log(contentRef);
  return (
    <Fragment>
      <Box onClick={() => setIsOpen(!isOpen)}>
        {item && item()}
      </Box>

      <CollapseItem
        open={isOpen}
        height={contentRef && contentRef.current && contentRef.current.getBoundingClientRect().height}
        transitionDuration={transitionDuration}
      >
        <Box ref={contentRef}>
          {children}
        </Box>
      </CollapseItem>
    </Fragment>
  );
};

Collapse.propTypes = {
  isOpen: PropTypes.bool,
  transitionDuration: PropTypes.number,
  variant: PropTypes.string,
  item: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Collapse.defaultProps = {
  isOpen: false,
  transitionDuration: 200,
  variant: 'primary',
  item: null,
};

export default Collapse;
