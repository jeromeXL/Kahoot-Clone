import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

export default function ToEditQuestionButton (props) {
  const navigate = useNavigate();
  const toEditQuestion = () => {
    navigate(`./${props.id}`, {
      state: {
        token: props.token,
      }
    });
  }
  return (
    <Button onClick={toEditQuestion}>Edit Question</Button>
  );
}
