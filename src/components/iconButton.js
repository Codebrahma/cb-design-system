import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'theme-ui';

const IconButton = ({ icon, iconFirst, children, ...otherProps }) => (
  <Button {...otherProps}>
    { iconFirst ? icon : null }
    { children }
    { iconFirst ? null : icon }
  </Button>
);

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  iconFirst: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

IconButton.defaultProps = {
  iconFirst: true,
};

export default IconButton;
