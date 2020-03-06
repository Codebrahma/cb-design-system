import React from 'react';
import { createPortal } from 'react-dom';
import Modal from './modal';
import getState from './../../utils/getState';

const modalState = getState('modal');

const openModal = ({
  header,
  body,
  footer,
  closeOnEscape,
  overlayClickable,
  onClose,
}) => {
  const { modalInstances = [] } = modalState.get();
  const container = document.createElement('div');
  document.body.append(container);

  modalInstances.push(
    createPortal(
      <Modal
        open={true}
        header={header}
        body={body}
        footer={footer}
        closeOnEscape={closeOnEscape}
        overlayClickable={overlayClickable}
        onClose={() => {
          setTimeout(() => {
            document.body.removeChild(container);
            modalInstances.pop();
            modalState.update({
              modalInstances: Array.from(modalInstances),
            });
          }, 200);
          onClose && onClose();
        }}
      />,
      container
    )
  );

  modalState.update({
    modalInstances: Array.from(modalInstances),
  });
};

const closeModal = () => {
  const lastInstance = Modal.instances[Modal.instances.length - 1];
  lastInstance.closeModal();
};

export { openModal, closeModal };
