import React from 'react';

export default function CreatedAtText (props) {
  return (
    <small className="text-muted" style={{ marginLeft: '50px', display: 'inline-block', fontWeight: 'normal' }}>
      {props.children}
    </small>
  );
}
