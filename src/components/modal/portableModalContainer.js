import React, { useState, useEffect, Fragment } from 'react';
import { getModalData } from './utils';

export default () => {
  const [modalInstances, setModalInstances] = useState([]);

  useEffect(() => {
    const modalData = getModalData();
    modalData.setObserver(setModalInstances);

    return () => modalData.unsetObserver();
  }, []);

  return modalInstances.map((modalInstance, key) => (
    <Fragment key={key}>{modalInstance}</Fragment>
  ));
};
