import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Flex } from 'theme-ui';
import { Content, CloseButton } from './components';

const Toast = ({
  open,
  timeout,
  onClose,
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
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'border',
          position: 'fixed',
          top: '10px',
          width: '80%',
          left: '50%',
          transform: 'translateX(-50%)',
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

        <CloseButton color='text' onClick={closeToast}>
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
};

Toast.defaultProps = {
  open: false,
  timeout: null,
  onClose: PropTypes.func,
  body: null,
};

export default Toast;
