import React from 'react';
import { createPortal } from 'react-dom';
import Toast from './toast';
import getState from './../../utils/getState';

const toastState = getState('toast');

const openToast = ({
  body,
  onClose,
}) => {
  const { toastInstances = [] } = toastState.get();
  const container = document.createElement('div');
  document.body.append(container);

  toastInstances.push(
    createPortal(
      <Toast
        open={true}
        body={body}
        onClose={() => {
          setTimeout(() => {
            document.body.removeChild(container);
            toastInstances.pop();
            toastState.update({
              toastInstances: Array.from(toastInstances),
            });
          }, 200);
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
