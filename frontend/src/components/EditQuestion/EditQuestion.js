import { React } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import data from '../../config.json';
import EditableQuestion from './EditableQuestion';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`

export default function EditQuestion (props) {
  const location = useLocation();
  const token = location.state.token;
  const allQuestions = location.state.questions;
  const allData = location.state.data;
  const gameId = location.state.id;
  console.log('All data: ', allData);
  // console.log('all questions:', allQuestions)
  const params = useParams();
  // console.log('index = ', params.question);
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
      <hr/>
      {question
        ? <EditableQuestion title={question.title} points={question.points} time={question.time} options={question.options} multi={question.multi} edit='true' token={token} allQuestions={allQuestions} index={params.question} data={allData} id={gameId}/>
        : <></>
      }
    </>
  );
}
