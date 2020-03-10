import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
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
  if (event.keyCode === ESCAPE_KEY_CODE && lastInstance.dismissOnEscape) {
    lastInstance.closeModal();
  }
};

const Modal = ({
  open,
  dismissOnEscape,
  dismissOnBackdropClick,
  noCloseButton,
  onClose,
  header,
  body,
  footer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  let isOpenRef = useRef(isOpen);

  const closeModal = (event) => {
    event && event.stopPropagation();
    if (!isOpenRef.current) { return; }

    setIsOpen(false);
    onClose && onClose();
    instances.pop();

    if (instances.length === 0) {
      document.removeEventListener('keydown', onKeyDown, false);
    }
  };

  const onOverlayClick = (event) =>
    event.target.id === 'overlay' && dismissOnBackdropClick
      ? closeModal(event)
      : null;

  const renderComponent = (Comp, Capsule) => {
    if (!Comp) {
      return null;
    }

    return typeof Comp === 'string'
      ? React.cloneElement(<Capsule />, {}, Comp)
      : <Comp />;
  };

  useEffect(() => {
    instances.push({ dismissOnEscape, closeModal });
    setIsOpen(open);
    if (instances.length === 1) {
      document.addEventListener('keydown', onKeyDown, false);
    }

    return () => isOpenRef.current && onClose && onClose();
  }, []);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);
  useEffect(() => setIsOpen(open), [open]);

  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames='modal'
      unmountOnExit
    >
      <Overlay
        onClick={onOverlayClick}
        id='overlay'
      >
        <Content>
          {
            noCloseButton ? null : (
              <CloseButton color='text' onClick={closeModal}>
                &times;
              </CloseButton>
            )
          }
          { renderComponent(header, Header) }
          { renderComponent(body, Body) }
          { renderComponent(footer, Footer) }
        </Content>
      </Overlay>
    </CSSTransition>
  );
};

Modal.instances = instances;

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  dismissOnEscape: PropTypes.bool,
  dismissOnBackdropClick: PropTypes.bool,
  noCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

Modal.defaultProps = {
  open: false,
  dismissOnEscape: true,
  dismissOnBackdropClick: true,
  noCloseButton: false,
  onClick: null,
  header: null,
  body: null,
  footer: null,
};

export default Modal;
