import { React, useState, useEffect } from 'react'
import data from '../../config.json';
import { useLocation } from 'react-router-dom';
import QuestionForPlayer from './QuestionForPlayer';
import Centre from '../General/Centre';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function InGameScreenPlayer () {
  const location = useLocation();
  const playerId = location.state.playerId;
  console.log(playerId);
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [options, setOptions] = useState([]);
  const [image, setImage] = useState(null);
  const [link, setLink] = useState(null);

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
      setTitle(data.question.title);
      setOptions(data.question.options);
      setPoints(data.question.points);
      setTime(data.question.time);
      setLink(data.question.link)
      setImage(data.question.image);
      console.log('data is :', data);
      console.log('question: ', data.question);
    }
  }

  useEffect(() => {
    // Get question data every 1 second. If the data changes, it should update the page with the new question
    getQuestionData();
    setInterval(getQuestionData, 1000);
  }, [])

  return (
    <Centre color="#39548D">
      <QuestionForPlayer playerId={playerId} points={points} options={options} title={title} question={points} image={image} time={time} link={link}/>
    </Centre>
  );
}
