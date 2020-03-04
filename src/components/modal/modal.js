import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Overlay,
  Content,
  CloseButton,
  Header,
  Body,
  Footer,
} from './components';

const instances = [];
const ESCAPE_KEY_CODE = 27;

const onKeyDown = event => {
  const lastInstance = instances[instances.length - 1] || {};
  if (event.keyCode === ESCAPE_KEY_CODE || lastInstance.closeOnEscape) {
    lastInstance.closeModal();
  }
};

const Modal = ({
  id,
  open,
  closeOnEscape,
  overlayClickable,
  onClose,
  header,
  body,
  footer,
}) => {
  const [isClosed, setIsClosed] = useState(!open);

  const closeModal = () => {
    setIsClosed(true);
    onClose && onClose();
    setTimeout(() => {
      const element = document.querySelector(`#app-modal-${id}`);
      if (!element) {
        return;
      }

      element.parentNode.removeChild(element);
      instances.pop();
      if (instances.length === 0) {
        document.removeEventListener('keydown', onKeyDown, false);
      }
    }, 250);
  };

  const onOverlayClick = () => {
    if (overlayClickable) {
      closeModal();
    }
  };

  useEffect(() => {
    instances.push({ id, closeOnEscape, closeModal });
    if (instances.length === 1) {
      document.addEventListener('keydown', onKeyDown, false);
    }
  });

  return (
    <Overlay
      isClosed={isClosed}
      onClick={onOverlayClick}
    >
      <Content isClosed={isClosed}>
        <CloseButton color='text' onClick={closeModal}>
          &times;
        </CloseButton>
        {header ? <Header>{header}</Header> : null}
        {body ? <Body>{body}</Body> : null}
        {footer ? <Footer>{footer}</Footer> : null}
      </Content>
    </Overlay>
  );
};

Modal.instances = instances;

Modal.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  open: PropTypes.bool.isRequired,
  closeOnEscape: PropTypes.bool,
  overlayClickable: PropTypes.bool,
  onClose: PropTypes.func,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

Modal.defaultProps = {
  open: true,
  closeOnEscape: true,
  overlayClickable: true,
  onClick: null,
  header: null,
  body: null,
  footer: null,
};

export default Modal;
