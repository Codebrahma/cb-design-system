import React, { useState, useEffect, Fragment } from 'react';
import getState from './../../utils/getState';

export default () => {
  const [modalInstances, setModalInstances] = useState([]);

  useEffect(() => {
    const modalState = getState('modal');

    modalState.setObserver(
      ({ modalInstances = [] }) => setModalInstances(modalInstances)
    );

    return () => modalState.unsetObserver();
  }, []);

  return modalInstances.map((modalInstance, key) => (
    <Fragment key={key}>{modalInstance}</Fragment>
  ));
};
