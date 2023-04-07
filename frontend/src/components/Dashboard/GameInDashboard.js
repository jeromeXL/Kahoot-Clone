import { React, useState, useEffect } from 'react';
import GameTitle from './GameTitle';
import GameText from './GameText';
import StartGameButton from './StartGameButton';
import EditGameButton from './EditGameButton';
import DeleteGameButton from './DeleteGameButton';
import CreatedAtText from './CreatedAtText';
import data from '../../config.json';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function GameInDashBoard (props) {
  const token = props.token;
  const quizId = props.quiz.id;
  console.log(props.quiz);
  console.log(`ID is : ${props.quiz.id}`);
  const [quizData, setQuizData] = useState({});
  const [questions, setQuestions] = useState([]);
  // Fetch req to /get/admin/quiz/{quizid}
  const fetchQuizData = async () => {
    console.log(`fetching quiz data for ${props.quiz.name}`);
    const response = await fetch(url + `/admin/quiz/${quizId}`, {
      method: 'GET',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
    })

    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    } else {
      setQuizData(data);
      setQuestions(data.questions);
      console.log(data);
    }
  }
  useEffect(async () => {
    await fetchQuizData();
  }, []);
  console.log(quizData);
  return (
    <div style={{ backgroundColor: '#D9D9D9', width: '500px', borderRadius: '9px', margin: '50px 0px' }}>
      <div className='d-flex justify-content-around align-items-center p-2'>
        <img style={{ width: '135px', height: 'auto', marginLeft: '18px', marginTop: '10px', borderRadius: '9px' }} src={require('./defaultGameImage.png')} className='p-1'/>
        <div className='d-flex flex-column justify-content-around align-items-start flex-grow-1 p-1' >
          <GameTitle>{quizData.name}</GameTitle>
          <CreatedAtText>{quizData.createdAt}</CreatedAtText>
          <GameText>{questions.length} questions</GameText>
          <GameText>20 minutes</GameText>
        </div>
      </div>
      <div className='d-flex justify-content-around align-items-center p-3' style={{ padding: '10px' }}>
        <StartGameButton/>
        <EditGameButton questions={questions} id={quizId} token={token}/>
        <DeleteGameButton/>
      </div>
    </div>
  );
}
