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
import { useMediaQuery } from 'react-responsive';

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

  const calcTimeSincePosted = (createdAt) => {
    // Calculate the difference between today and createdAt
    const today = new Date();
    // console.log(today);
    const created = new Date(createdAt);
    // console.log(created);
    const daysBetween = (today - created) / (1000 * 60 * 60 * 24);
    let postedAgo;
    if (daysBetween <= 1) {
      const hours = Math.floor((today - created) / (1000 * 60 * 60));
      const min = Math.floor(((today - created) / (1000 * 60)) % 60);
      if (hours === 0 && min === 0) {
        postedAgo = 'Created less than a minute ago';
      } else if (hours === 0) {
        postedAgo = `Created ${min} minutes ago`;
      } else {
        postedAgo = `Created ${hours} hours and ${min} min ago`;
      }
    } else {
      postedAgo = `Created on ${createdAt.substring(0, 10)}`;
    }
    return postedAgo;
  }

  let width;
  let margin;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen) {
    width = '300px';
    margin = '20px 0px';
  } else if (isMediumScreen) {
    width = '400px';
    margin = '30px 0px';
  } else {
    width = '500px'
    margin = '50px 15px';
  }
  return (
    <div style={{ backgroundColor: '#D9D9D9', width, borderRadius: '9px', margin }}>
      <GameDetailsContainer>
        <GameThumbnail img={quizData.thumbnail} id={quizId}/>
        <GameTextDetailContainer>
          <GameTitle>{quizData.name}</GameTitle>
          <CreatedAtText>{quizData.createdAt ? calcTimeSincePosted(quizData.createdAt) : ''}</CreatedAtText>
          <GameText>{questions.length} questions</GameText>
          <GameText>{min} min {sec} sec</GameText>
        </GameTextDetailContainer>
      </GameDetailsContainer>
      <GameButtonContainer>
        <StartGameButton token={token} quizId={quizId}/>
        <EditGameButton questions={questions} id={quizId} token={token}/>
        <DeleteGameButton quizId={quizId} token={token} update={props.update}/>
      </GameButtonContainer>
    </div>
  );
}
