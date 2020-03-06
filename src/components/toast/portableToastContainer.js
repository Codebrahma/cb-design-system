import React, { useState, useEffect, Fragment } from 'react';
import getState from './../../utils/getState';

export default () => {
  const [toastInstances, setToastInstances] = useState([]);

  useEffect(() => {
    const modalState = getState('toast');

    modalState.setObserver(
      ({ toastInstances = [] }) => setToastInstances(toastInstances)
    );

    return () => modalState.unsetObserver();
  }, []);

  return toastInstances.map((toastInstance, key) => (
    <Fragment key={key}>{toastInstance}</Fragment>
  ));
};
