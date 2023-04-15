import React from 'react';
import Form from 'react-bootstrap/Form';

export default function MultiChoiceToggle (props) {
  return (
    <Form.Check
      type="switch"
      label="multiple correct answers"
      className="mb-3"
      // {...(multi === true) ? { checked: 'success' } : { }}
      // onChange={switchChange}
      {...props}
    />
  );
}
