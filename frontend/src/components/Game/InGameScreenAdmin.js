import { React, useState } from 'react'
import data from '../../config.json';
import { useLocation, useNavigate } from 'react-router-dom';
import Centre from '../General/Centre';
import Title from '../General/Title';
import Subtitle from '../General/Subtitle';
import FormContainer from '../General/FormContainer';
import SubmitButton from '../General/SubmitButton';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function InGameScreenAdmin (props) {
  const location = useLocation();
  const { token, quizId, sessionId } = location.state;

  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState('Question');
  const [position, setPosition] = useState(null);

  const updateCurrentQuestion = async () => {
    console.log('Updating current question');
    const response = await fetch(url + `/admin/session/${sessionId}/status`, {
      method: 'GET',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })

    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    }
    const questions = data.results.questions;
    setPosition(data.results.position);
    console.log(position);

    if (position <= questions.length) {
      setCurrentQuestion(questions[position]);
      console.log('Current question:', currentQuestion);
    } else {
      console.log('Position value is out of range');
    }

  }

  const nextQuestion = async () => {
    console.log('Next Question Button Pressed');
    // Fetch Request
    const response = await fetch(url + `/admin/quiz/${quizId}/advance`, {
      method: 'POST',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizid: quizId })
    })

    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    } else {
      updateCurrentQuestion();
    }
  }

  const endQuiz = async () => {
    console.log('End Quiz Button Pressed');
    // Fetch Request
    const response = await fetch(url + `/admin/quiz/${quizId}/end`, {
      method: 'POST',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizid: quizId })
    })

    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    }
    // Switch Routes
    navigate(`/admin/game/${quizId}/results`, {
      token: token,
      quizId: quizId
    });
  }

  return (
    <>
      <Centre color="#39548D">
        <Title/>
        <Subtitle> Quiz </Subtitle>
        <FormContainer color="#AAB8D4">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Question {position+1}: {currentQuestion}</h2>
            <br></br>
            <SubmitButton color="#475A81" onClick={nextQuestion}>Next Question</SubmitButton>
            <br></br>
            <SubmitButton color="#475A81" onClick={endQuiz}>End Quiz</SubmitButton>
          </div>
        </FormContainer>
      </Centre>
    </>
  );
}
