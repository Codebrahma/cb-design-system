import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { CSSTransition } from 'react-transition-group';
import { Flex, Box, css } from 'theme-ui';

const ToastContainer = styled(Flex)(
  (theme) => css({
    p: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'border',
    position: 'fixed',
    top: '10px',
    width: '80%',
    left: '50%',
    transform: 'translateX(-50%)',
    bg: 'white',
  })(theme),
);

const CloseButton = styled(Box)(
  css({
    cursor: 'pointer',
    bg: 'none',
    outline: 'none',
  }),
);

const Content = styled(Box)(
  css({
    width: '100%',
  }),
);

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
        <Box>
          <CloseButton color='text' onClick={closeToast}>
            &times;
          </CloseButton>
        </Box>
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
