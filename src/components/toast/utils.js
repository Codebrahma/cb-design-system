import React from 'react';
import { createPortal } from 'react-dom';
import Toast from './toast';
import getState from './../../utils/getState';

const toastState = getState('toast');
const getCurrentToastInstances = () => (toastState.get().toastInstances || {});

const openToast = ({ onClose, ...toastProps }) => {
  const toastId = Math.random()
    .toString()
    .slice(-10);
  const container = document.createElement('div');
  document.body.append(container);

  const toastInstance = createPortal(
    <Toast
      {...toastProps}
      open={true}
      toastId={toastId}
      onClose={() => {
        setTimeout(() => {
          const {
            [toastId]: currentInstance,
            ...toastInstances
          } = getCurrentToastInstances();

          document.body.removeChild(container);
          toastState.update({ toastInstances });
        }, 300);
        onClose && onClose();
      }}
    />,
    container
  );

  toastState.update({
    toastInstances: {
      ...getCurrentToastInstances(),
      [toastId]: toastInstance,
    },
  });
};

export { openToast };
