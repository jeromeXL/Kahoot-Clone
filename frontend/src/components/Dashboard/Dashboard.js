import { React, useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
// import '@fontsource/inter';
import GamesContainer from './GamesContainer';
import GameInDashBoard from './GameInDashboard';
import { useLocation } from 'react-router-dom';
import data from '../../config.json';

let token;
const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function Dashboard () {
  const location = useLocation();
  token = location.state.token;

  const [quizzes, setQuizzes] = useState([]);

  const fetchAllQuizzes = async () => {
    console.log('Loading quizzes');
    const response = await fetch(url + '/admin/quiz', {
      method: 'GET',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    } else {
      setQuizzes(data.quizzes);
    }
  };

  useEffect(async () => {
    await fetchAllQuizzes();
  }, []);

  console.log(quizzes);

  return (
    <>
      <DashboardHeader token={token} update={fetchAllQuizzes}/>
      <GamesContainer>
        {/* <ul>
        {quizzes.map((quiz, index) => (
          <li key={index}>
            {quiz.name}
            <br/>
            {quiz.id}
            <br/>
          </li>
        ))}
        </ul>
        <br/> */}
        {quizzes.map((quiz, index) => (
          <GameInDashBoard key={index} token={token} quiz={quiz} update={fetchAllQuizzes}/>
        ))}
      </GamesContainer>
    </>
  );
}
