import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function editQuestionForm (props) {
  const [switchState, setSwitchState] = useState(false);
  // const [numQuestions, setNumQuestions] = useState(2);
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Question</Form.Label>
        <Form.Control type="text" placeholder="Enter a question" required/>
        <Form.Control.Feedback type="invalid"> Please type a question. </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
        type="switch"
        label="Multiple correct answers?"
        defaultChecked={switchState}
        onChange={() => setSwitchState(!switchState)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter an answer" required/>
            <Form.Control.Feedback type="invalid"> Please type a valid answer. </Form.Control.Feedback>
            <Form.Check
            inline
            type={switchState ? 'radio' : 'checkbox'}
            />
      </Form.Group>
      <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter an answer" required/>
            <Form.Control.Feedback type="invalid"> Please type a valid answer. </Form.Control.Feedback>
            <Form.Check
            inline
            type={switchState ? 'radio' : 'checkbox'}
            />
      </Form.Group>
    </>
  );
}
