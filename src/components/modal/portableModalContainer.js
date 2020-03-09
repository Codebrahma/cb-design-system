import React, { useState, useEffect, Fragment } from 'react';
import getState from './../../utils/getState';

export default () => {
  const [modalInstances, setModalInstances] = useState({});

  useEffect(() => {
    const modalState = getState('modal');

    modalState.setObserver(
      ({ modalInstances = {} }) => setModalInstances(modalInstances)
    );

    return () => modalState.unsetObserver();
  }, []);

  return Object.keys(modalInstances).map((key) => (
    <Fragment key={key}>{modalInstances[key]}</Fragment>
  ));
};
