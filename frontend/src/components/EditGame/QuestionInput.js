import React from 'react';
import Form from 'react-bootstrap/Form';

export default function QuestionInput (props) {
  return (
    <>
      <Form.Label>Question</Form.Label>
      <Form.Control type="text" placeholder="Enter a question" required onChange={props.onChange} />
    </>
  );
}