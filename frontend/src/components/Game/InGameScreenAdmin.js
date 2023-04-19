import { React, useState } from 'react'
import data from '../../config.json';
import { useLocation, useNavigate } from 'react-router-dom';
import Centre from '../General/Centre';
import Title from '../General/Title';
import Subtitle from '../General/Subtitle';
import FormContainer from '../General/FormContainer';
import SubmitButton from '../General/SubmitButton';
import QuestionForAdmin from './QuestionForAdmin';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function InGameScreenAdmin (props) {
  const location = useLocation();
  const { token, quizId, sessionId } = location.state;
  console.log('Token: ', token);
  console.log('quizId: ', quizId);
  console.log('sessionId: ', sessionId);

  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState('Question');
  const [currentOptions, setCurrentOptions] = useState([]);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [position, setPosition] = useState(-1);
  const [link, setLink] = useState(null)
  const [image, setImage] = useState(null)
  const [isLastQ, setIsLastQ] = useState(false);

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
    const currPos = data.results.position;
    setPosition(currPos);
    console.log('Position:', position);
    if (currPos === questions.length - 1) {
      setIsLastQ(true);
    } else {
      setIsLastQ(false);
    }
    if (currPos < questions.length && currPos >= 0) {
      setCurrentQuestion(questions[currPos].title);
      setCurrentOptions(questions[currPos].options);
      setTime(questions[currPos].time);
      setPoints(questions[currPos].points);
      setLink(questions[currPos].link);
      setImage(questions[currPos].image);
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
    } else {
      // Switch Routes
      navigate(`/admin/game/${quizId}/results`, {
        state: {
          token,
          quizId
        }
      });
    }
  }

  return (
    <>
      <Centre color="#39548D">
        {position === -1
          ? <>
              <Title/>
              <Subtitle> Quiz </Subtitle>
              <br/>
              <FormContainer color="#AAB8D4">
                <SubmitButton color="#475A81" onClick={nextQuestion}>Start Game</SubmitButton>
              </FormContainer>
            </>
          : <QuestionForAdmin title={currentQuestion} options={currentOptions} time={time} points={points} link={link} image={image} nextQuestion={nextQuestion} endQuiz={endQuiz} isLastQ={isLastQ}/>
        }
      </Centre>
    </>
  );
}
