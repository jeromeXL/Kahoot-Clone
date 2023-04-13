import { React, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import data from '../../config.json';
import Question from '../EditGame/Question';
import { QuestionsContext } from '../EditGame/EditGame.js'

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`

export default function EditQuestion (props) {
  const allQuestions = useContext(QuestionsContext);
  console.log('all questions:', allQuestions)
  const location = useLocation();
  const token = location.state.token;
  const params = useParams();
  console.log('index = ', params.question);
  const question = allQuestions ? allQuestions[params.question] : undefined;
  console.log('question to be edited:', question);
  return (
    <>
      Testing
      {url}
      <hr/>
      {token}
      <hr/>
      {params.question}
      {allQuestions}
      {question
        ? <Question title={question.title} points={question.points} time={question.time} options={question.options} multi={question.multi} edit='true'/>
        : <></>
      }
    </>
  );
}
