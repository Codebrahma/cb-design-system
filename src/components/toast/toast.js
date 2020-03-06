import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { ToastContainer, Content, CloseButton } from './components';

const Toast = ({
  open,
  timeout,
  onClose,
  body,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(isOpen);
  const closeToast = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  useEffect(() => {
    setIsOpen(open);

    if (timeout) {
      setTimeout(closeToast, timeout);
    }

    return () => isOpenRef.current && onClose && onClose();
  }, []);
  useEffect(() => setIsOpen(open), [open]);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  return (
    <CSSTransition
      in={isOpen}
      timeout={400}
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
  timeout: PropTypes.number,
  onClose: PropTypes.func,
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

Toast.defaultProps = {
  open: false,
  timeout: null,
  onClose: PropTypes.func,
  body: null,
};

export default Toast;
