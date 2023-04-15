import React from 'react';
import Form from 'react-bootstrap/Form';

export default function AttachmentDropDown (props) {
  return (
    <Form.Select aria-label="select attachment type" {...props} style={{ marginBottom: '20px' }}>
      <option value="none">No attachment</option>
      <option value="img">Image</option>
      <option value="link">Youtube Link</option>
    </Form.Select>
  );
}
