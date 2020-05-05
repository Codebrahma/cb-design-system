import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Flex } from 'theme-ui';
import { Content, CloseButton } from './components';

const getPositionStyles = (position) => {
  switch (position) {
    case 'top-center':
      return {
        top: '10px',
        width: '80%',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'top-left':
      return {
        top: '10px',
        width: '40%',
        left: '10px',
      };
    case 'top-right':
      return {
        top: '10px',
        width: '40%',
        right: '10px',
      };
    case 'bottom-center':
      return {
        bottom: '10px',
        width: '80%',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    case 'bottom-left':
      return {
        bottom: '10px',
        width: '40%',
        left: '10px',
      };
    case 'bottom-right':
      return {
        bottom: '10px',
        width: '40%',
        right: '10px',
      };
    default:
      return {
        top: '10px',
        width: '80%',
        left: '50%',
        transform: 'translateX(-50%)',
      };
  }
};

const Toast = ({
  open,
  timeout,
  onClose,
  position,
  body,
  ...otherProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(isOpen);
  const closeToast = () => {
    if (!isOpenRef.current) { return; }

    setIsOpen(false);
    return onClose && onClose();
  };

  useEffect(() => {
    setIsOpen(open);

    if (timeout) {
      setTimeout(closeToast, timeout);
    }

    return () => isOpenRef.current && onClose && onClose();
  }, []);
  useEffect(() => setIsOpen(open), [open]);
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames='toast'
      unmountOnExit
    >
      <Flex
        {...otherProps}
        __themeKey='toast'
        __css={{
          p: 4,
          position: 'fixed',
          ...getPositionStyles(position),
          zIndex: '9999',
          bg: 'primary',
          '&.toast-enter': {
            opacity: 0,
          },
          '&.toast-enter-active': {
            opacity: 1,
            transition: 'all 300ms ease-in',
          },
          '&.toast-exit': {
            opacity: 1,
          },
          '&.toast-exit-active': {
            opacity: 0,
            transition: 'all 300ms ease-out',
          },
        }}
      >
        <Content>
          {body}
        </Content>

        <CloseButton onClick={closeToast}>
          &times;
        </CloseButton>
      </Flex>
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
  variant: PropTypes.string,
  position: PropTypes.string,
};

Toast.defaultProps = {
  open: false,
  timeout: 4000,
  onClose: null,
  body: null,
  variant: 'primary',
  position: 'top-center',
};

export default Toast;
