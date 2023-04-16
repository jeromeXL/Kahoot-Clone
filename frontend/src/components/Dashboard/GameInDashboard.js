import { React, useState, useEffect } from 'react';
import GameTitle from './GameTitle';
import GameText from './GameText';
import StartGameButton from './StartGameButton';
import EditGameButton from './EditGameButton';
import DeleteGameButton from './DeleteGameButton';
import CreatedAtText from './CreatedAtText';
import data from '../../config.json';
import GameButtonContainer from './GameButtonContainer';
import GameDetailsContainer from './GameDetailsContainer';
import GameThumbnail from './GameThumbnail';
import GameTextDetailContainer from './GameTextDetailContainer';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function GameInDashBoard (props) {
  const token = props.token;
  const quizId = props.quiz.id;
  const [quizData, setQuizData] = useState({});
  const [questions, setQuestions] = useState([]);

  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);

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
    }
  }

  const calcualteTime = () => {
    const timeSum = questions.reduce((accumulator, curr) => {
      return accumulator + curr.time;
    }, 0);

    if (!timeSum) {
      setSec(0);
      setMin(0);
    } else {
      setSec(timeSum % 60);
      setMin(Math.floor(timeSum / 60));
    }
  }

  useEffect(async () => {
    await fetchQuizData();
  }, []);

  useEffect(async () => {
    calcualteTime();
  }, [questions]);

  return (
    <div style={{ backgroundColor: '#D9D9D9', width: '500px', borderRadius: '9px', margin: '50px 0px' }}>
      {/* <div className='d-flex justify-content-around align-items-center p-2'>
        <img style={{ width: '135px', height: 'auto', marginLeft: '18px', marginTop: '10px', borderRadius: '9px' }} src={quizData.thumbnail === null ? require('./defaultGameImage.png') : quizData.thumbnail} className='p-1'/>
        <div className='d-flex flex-column justify-content-around align-items-start flex-grow-1 p-1' >
          <GameTitle>{quizData.name}</GameTitle>
          <CreatedAtText>{quizData.createdAt}</CreatedAtText>
          <GameText>{questions.length} questions</GameText>
          <GameText>{min} min {sec} sec</GameText>
        </div>
      </div> */}
      <GameDetailsContainer>
        <GameThumbnail img={quizData.thumbnail} id={quizId}/>
        <GameTextDetailContainer>
          <GameTitle>{quizData.name}</GameTitle>
          <CreatedAtText>{quizData.createdAt}</CreatedAtText>
          <GameText>{questions.length} questions</GameText>
          <GameText>{min} min {sec} sec</GameText>
        </GameTextDetailContainer>
      </GameDetailsContainer>
      {/* <div className='d-flex justify-content-around align-items-center p-3' style={{ padding: '10px' }}>
        <StartGameButton/>
        <EditGameButton questions={questions} id={quizId} token={token}/>
        <DeleteGameButton quizId={quizId} token={token} update={props.update}/>
      </div> */}
      <GameButtonContainer>
        <StartGameButton/>
        <EditGameButton questions={questions} id={quizId} token={token}/>
        <DeleteGameButton quizId={quizId} token={token} update={props.update}/>
      </GameButtonContainer>
    </div>
  );
}
