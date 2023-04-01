import React from 'react';
import '@fontsource/inter';

export default function AuthContainer (props) {
  return (
    <div style={{ backgroundColor: '#AAB8D4', padding: 25, borderRadius: '9px', width: '400px', fontFamily: 'Inter' }}>
      {props.children}
    </div>
  );
}
