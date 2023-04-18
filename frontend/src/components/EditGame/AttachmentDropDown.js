import React from 'react';
import Form from 'react-bootstrap/Form';

export default function AttachmentDropDown (props) {
  return (
    <Form.Select aria-label="select attachment type" {...props} style={{ marginBottom: '20px' }}>
      <option aria-label='No attachment' value="none">No attachment</option>
      <option aria-label='image' value="img">Image</option>
      <option aria-label='Youtube link' value="link">Youtube Link</option>
    </Form.Select>
  );
}
