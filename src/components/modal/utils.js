import React from 'react';
import { createPortal } from 'react-dom';
import Modal from './modal';
import getState from './../../utils/getState';

const modalState = getState('modal');
const getCurrentModalInstances = () => (modalState.get().modalInstances || []);

const openModal = ({
  header,
  body,
  footer,
  closeOnEscape,
  overlayClickable,
  onClose,
  ...otherArgs
}) => {
  const container = document.createElement('div');
  const modalId = Math.random()
    .toString()
    .slice(-10);
  document.body.append(container);

  const modalInstance = createPortal(
    <Modal
      {...otherArgs}
      open={true}
      header={header}
      body={body}
      footer={footer}
      closeOnEscape={closeOnEscape}
      overlayClickable={overlayClickable}
      onClose={() => {
        setTimeout(() => {
          const {
            [modalId]: currentInstance,
            ...toastInstances
          } = getCurrentModalInstances();

          document.body.removeChild(container);
          modalState.update({ toastInstances });
        }, 200);
        onClose && onClose();
      }}
    />,
    container
  );

  modalState.update({
    modalInstances: {
      ...getCurrentModalInstances(),
      [modalId]: modalInstance,
    },
  });
};

const closeModal = () => {
  const lastInstance = Modal.instances[Modal.instances.length - 1];
  lastInstance.closeModal();
};

export { openModal, closeModal };
