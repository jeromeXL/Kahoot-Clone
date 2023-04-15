import React from 'react';
import Form from 'react-bootstrap/Form';

export default function ImageInput (props) {
  return (
    <>
      <Form.Label>Upload Image</Form.Label>
      <Form.Control type="file" accept="image/*" onChange={props.onChange}/>
    </>
  );
}
