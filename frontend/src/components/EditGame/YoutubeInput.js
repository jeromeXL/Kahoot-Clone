import React from 'react';
import Form from 'react-bootstrap/Form';

export default function YoutubeInput (props) {
  return (
    <>
      <Form.Label>Enter Youtube URL</Form.Label>
      <Form.Control data-cy='YoutubeInput' {...props}/>
    </>
  );
}
