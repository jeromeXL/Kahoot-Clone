import React from 'react';

export default function ErrorPopup ({ message }) {
  return (
    <div className="error-popup alert alert-danger" role="alert">
      <h4>{message}</h4>
    </div>
  );
}
