import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

export const generateContainer = (modalId, containerId) => {
  const containerDomNode = document.createElement('div');
  const id = modalId || Math.floor(Math.random() * 100000 + 1);

  containerDomNode.setAttribute('id', `app-modal-${id}`);
  if (containerId) {
    document.getElementById(containerId).appendChild(containerDomNode);
  } else {
    document.body.appendChild(containerDomNode);
  }

  return { containerDomNode, id };
};

export const openModal = ({
  header,
  body,
  footer,
  closeOnEscape,
  containerId,
  modalId,
  overlayClickable,
}) => {
  const { containerDomNode, id } = generateContainer(modalId, containerId);
  return ReactDOM.render(
    <Modal
      id={id}
      header={header}
      body={body}
      footer={footer}
      closeOnEscape={closeOnEscape === undefined ? true : closeOnEscape}
      overlayClickable={overlayClickable}
    />,
    containerDomNode,
  );
};

const findIndex = (id) => {
  for (let i = 0; i < Modal.instances.length; i += 1) {
    if (id === Modal.instances[i].id) return i;
  }
  return null;
};

export const closeModal = (...args) => {
  if (typeof args[0] === 'number') {
    for (let i = 0; i < args.length; i += 1) {
      const instance = Modal.instances[findIndex(args[i])];
      setTimeout(instance.closeModal(), 250);
    }
  } else {
    const lastInstance = Modal.instances[Modal.instances.length - 1];
    setTimeout(lastInstance.closeModal(), 250);
  }
};
