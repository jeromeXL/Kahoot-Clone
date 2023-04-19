import { React, useState, useEffect } from 'react'
import data from '../../config.json';
import { useLocation } from 'react-router-dom';
import QuestionForPlayer from './QuestionForPlayer';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function InGameScreenPlayer () {
  const location = useLocation();
  const playerId = location.state.playerId;
  console.log(playerId);
  const [question, setQuestion] = useState({});

  const getQuestionData = async () => {
    console.log('Getting question data...')
    console.log('Player Id = ', playerId);
    const response = await fetch(url + `/play/${playerId}/question`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
      alert(`ERROR: ${data.error}`);
    } else {
      setQuestion(data.question);
      console.log('data is :', data);
      console.log('question: ', data.question);
    }
  }

  useEffect(() => {
    // Get question data every 3 second. If the data changes, it should update the page with the new question
    setInterval(getQuestionData, 3000);
  }, [])

  return (
    <>
      <h1>In Game Screen for players Here</h1>
      <QuestionForPlayer playerId={playerId} options={question.options} title={question.title} question={question.points} image={question.image} link={question.link}/>
    </>
  );
}
