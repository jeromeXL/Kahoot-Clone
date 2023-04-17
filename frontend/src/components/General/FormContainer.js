import React from 'react';

export default function FormContainer (props) {
  return (
    <div style={{ backgroundColor: props.color, padding: 25, borderRadius: '9px', width: '400px', fontFamily: 'Inter', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {props.children}
    </div>
  );
}
