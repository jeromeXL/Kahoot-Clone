import React from 'react';

export default function QuestionContainer (props) {
  return (
    <div style={{ width: '800px', backgroundColor: '#AAB8D4', margin: '20px auto', padding: '20px' }}>
      {props.children}
    </div>
  );
}
