import { React, useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { QuestionsContext } from './EditGame.js'

export default function ToEditQuestionButton (props) {
  const navigate = useNavigate();
  const payload = useContext(QuestionsContext);
  console.log('payload: ', payload);
  const toEditQuestion = () => {
    navigate(`./${props.id}`, {
      state: {
        token: props.token,
        questions: payload.questions,
        data: payload.data,
        id: payload.id,
      }
    });
  }
  return (
    <Button onClick={toEditQuestion}>Edit Question</Button>
  );
}
