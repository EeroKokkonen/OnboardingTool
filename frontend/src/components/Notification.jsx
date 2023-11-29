import React, { useEffect } from 'react';

function ErrorNotification({ message, onClose, type }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    //Add 'type' prop to classname
    <div className={`alert alert-${type} alert-dismissible`}>
          <span>{message}</span>
        </div>
  );
}

export default ErrorNotification;