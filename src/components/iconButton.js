import React from 'react';
import PropTypes from 'prop-types';
import Button from 'theme-ui';

const IconButton = ({ icon, children, ...otherProps }) => (
  <Button {...otherProps}>
    {icon}
    {children}
  </Button>
);

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default IconButton;
