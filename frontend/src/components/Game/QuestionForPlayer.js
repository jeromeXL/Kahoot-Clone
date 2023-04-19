import { React, useState, useEffect } from 'react';
import QuestionContainer from '../Question/QuestionContainer';
import QuestionHeaderContainer from '../Question/QuestionHeaderContainer';
import TitleContainer from '../Question/TitleContainer';
import QuestionImage from '../Question/QuestionImage';
import Ratio from 'react-bootstrap/Ratio';
import ReactPlayer from 'react-player/youtube';
import Form from 'react-bootstrap/Form';
import PointTimeContainer from '../Question/PointTimeContainer';
import data from '../../config.json';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function QuestionForPlayer (props) {
  // Array of answers [true, false, true] => {ans 1. checked, ans 2. not checked, ans 3. checked}
  const [answers, setAnswers] = useState([]);
  const tickUntick = async (index) => {
    const tmpAnswers = answers;
    tmpAnswers[index] = !answers[index];
    setAnswers(tmpAnswers);
    // Send the PUT requests
    const answerIds = [];
    if (tmpAnswers && tmpAnswers.length !== undefined) {
      for (let i = 0; i < tmpAnswers.length; i++) {
        if (tmpAnswers[i] === true) {
          answerIds.push(i);
        }
      }
    }
    const response = await fetch(url + `/play/${props.playerId}/answer`, {
      method: 'PUT',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ answerIds })
    });
    const data = await response.json();
    console.log('data is : ', data);
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
      alert(`ERROR: ${data.error}`);
    }
  }

  // All answers are initially false, as they are not selected.
  const populateAnswers = () => {
    if (props.options && props.options.length !== undefined) {
      for (let i = 0; i < props.options.length; i++) {
        setAnswers(oldArray => [...oldArray, false]);
      }
    }
  }

  useEffect(() => {
    populateAnswers();
  }, []);

  console.log('options is : ', props.options);

  return (
    <QuestionContainer>
      <QuestionHeaderContainer>
        <TitleContainer>
          {props.title}
        </TitleContainer>
        <PointTimeContainer>
          {props.points} points - {props.time}(s)
        </PointTimeContainer>
      </QuestionHeaderContainer>
      <hr/>
      <div className='p-2'>
        {props.image && props.image !== null
          ? <>
              <QuestionImage image={props.image} id={props.id}/>
              <hr/>
            </>
          : <></>
        }
        {props.link && props.link !== null
          ? <>
              <Ratio aspectRatio={'16x9'}>
              <ReactPlayer url={props.link} controls playing={true}/>
              </Ratio>
              <hr/>
            </>
          : <></>
        }
      </div>
      <div>
        {props.options
          ? props.options.map((option, index) => (
          <div className='d-flex justify-content-start align-items-center p-2' key={index}>
            <Form.Check type='checkbox' inline aria-label={option} name='player-option' onChange={() => tickUntick(index)}/>
            <Form.Control defaultValue={option} disabled readOnly/>
          </div>
          ))
          : <></>
        }
      </div>
    </QuestionContainer>
  );
}
