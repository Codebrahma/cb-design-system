import React from 'react';
import { createPortal } from 'react-dom';
import Modal from './modal';

class ModalData {
  constructor() {
    this.observer = null;
    this.modalInstances = [];
  }

  update(data = []) {
    this.modalInstances = Array.from(data);
    this.notify(this.modalInstances);
  }

  get() {
    return this.modalInstances;
  }

  setObserver(observer) {
    this.observer = observer;
  }

  unsetObserver() {
    this.observer = null;
  }

  notify(data) {
    this.observer && this.observer(data);
  }
}

const getModalData = () => {
  if (!ModalData.instance) {
    ModalData.instance = new ModalData();
  }
  return ModalData.instance;
};

const modalData = getModalData();

const openModal = ({
  header,
  body,
  footer,
  closeOnEscape,
  overlayClickable,
  onClose,
}) => {
  const modalInstances = modalData.get();
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
            modalData.update(modalInstances);
          }, 200);
          onClose && onClose();
        }}
      />,
      container
    )
  );

  modalData.update(modalInstances);
};

const closeModal = () => {
  const lastInstance = Modal.instances[Modal.instances.length - 1];
  lastInstance.closeModal();
};

export {
  getModalData,
  openModal,
  closeModal,
};
