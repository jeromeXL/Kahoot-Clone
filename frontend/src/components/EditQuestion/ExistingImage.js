import React from 'react';
import Form from 'react-bootstrap/Form';

export default function ExistingImage (props) {
  return (
    <div>
      <h4>Currently selected photo</h4>
      <img src={props.image} alt={`image for question ${props.id}`} style={{ width: '500px', height: 'auto', margin: 'auto' }}/>
      <br/>
      <Form.Text muted>
        If you choose to not upload a photo, the previous image will be kept.
      </Form.Text>
    </div>
  );
}
