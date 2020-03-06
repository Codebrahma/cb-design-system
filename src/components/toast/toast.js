import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { ToastContainer, Content, CloseButton } from './components';

const Toast = ({
  open,
  onClose,
  body,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeToast = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(open);
    return () => onClose && onClose();
  }, []);

  useEffect(() => setIsOpen(open), [open]);

  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames='toast'
      unmountOnExit
    >
      <ToastContainer>
        <Content>
          {body}
        </Content>

        <CloseButton color='text' onClick={closeToast}>
          &times;
        </CloseButton>
      </ToastContainer>
    </CSSTransition>
  );
};

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

Toast.defaultProps = {
  open: false,
  onClose: PropTypes.func,
  body: null,
};

export default Toast;
