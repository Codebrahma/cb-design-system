import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Box } from 'theme-ui';

const withPosition = (comp, position) => {
  const component = styled(comp)(
    ({ top, bottom, left, right, zIndex }) => ({
      position,
      top,
      bottom,
      left,
      right,
      zIndex,
    })
  );

  component.propTypes = {
    top: PropTypes.string,
    bottom: PropTypes.string,
    right: PropTypes.string,
    left: PropTypes.string,
    zIndex: PropTypes.string,
  };

  component.defaultProps = {
    top: 'unset',
    bottom: 'unset',
    right: 'unset',
    left: 'unset',
    zIndex: 'unset',
  };

  return component;
};

const Relative = styled(Box)({ position: 'relative' });
const Absolute = withPosition(Box, 'absolute');
const Fixed = withPosition(Box, 'fixed');
const Sticky = withPosition(Box, 'sticky');

export { Relative, Absolute, Fixed, Sticky };
