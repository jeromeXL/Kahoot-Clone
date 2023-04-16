import { React } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import EditableQuestion from './EditableQuestion';

export default function EditQuestion () {
  const location = useLocation();
  const token = location.state.token;
  const allQuestions = location.state.questions;
  const allData = location.state.data;
  const gameId = location.state.id;
  console.log('All data: ', allData);
  const params = useParams();
  const question = allQuestions ? allQuestions[params.question] : undefined;
  console.log('question to be edited:', question);
  return (
    <>
      {question
        ? <EditableQuestion title={question.title} points={question.points} time={question.time} options={question.options} multi={question.multi} edit='true' token={token} allQuestions={allQuestions} index={params.question} data={allData} id={gameId} link={question.link} image={question.image}/>
        : <></>
      }
    </>
  );
}
