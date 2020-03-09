import React from 'react';
import { createPortal } from 'react-dom';
import Toast from './toast';
import getState from './../../utils/getState';

const toastState = getState('toast');

const openToast = ({ onClose, ...toastProps }) => {
  const { toastInstances = [] } = toastState.get();
  const container = document.createElement('div');
  document.body.append(container);

  toastInstances.push(
    createPortal(
      <Toast
        {...toastProps}
        open={true}
        onClose={() => {
          setTimeout(() => {
            document.body.removeChild(container);
            toastInstances.pop();
            toastState.update({
              toastInstances: Array.from(toastInstances),
            });
          }, 300);
          onClose && onClose();
        }}
      />,
      container
    )
  );

  toastState.update({
    toastInstances: Array.from(toastInstances),
  });
};

export { openToast };
