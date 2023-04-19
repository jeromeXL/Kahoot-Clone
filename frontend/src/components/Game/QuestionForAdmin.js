import React from 'react';
import QuestionContainer from '../Question/QuestionContainer';
import QuestionHeaderContainer from '../Question/QuestionHeaderContainer';
import TitleContainer from '../Question/TitleContainer';
import PointTimeContainer from '../Question/PointTimeContainer';
import QuestionImage from '../Question/QuestionImage';
import Ratio from 'react-bootstrap/Ratio';
import ReactPlayer from 'react-player';
import SubmitButton from '../General/SubmitButton';

export default function QuestionForAdmin (props) {
  return (
    <QuestionContainer>
      <QuestionHeaderContainer>
        <TitleContainer>
          {props.title}
        </TitleContainer>
        <PointTimeContainer>
          {props.points} points - {props.time} (s)
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
                <ReactPlayer url={props.link} controls width='100%' height='100%'/>
              </Ratio>
              <hr/>
            </>
          : <></>
        }
      </div>
      <div>
        {props.options.map((option, index) => (
          <div className='d-flex justify-content-start align-items-center p-2' key={index}>
            <>{index + 1}. {Object.keys(option)[0]}</>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {props.isLastQ === false
          ? <>
              <br></br>
              <SubmitButton color="#475A81" onClick={props.nextQuestion}>Next Question</SubmitButton>
            </>
          : <></>
        }
        <br></br>
        <SubmitButton color="#475A81" onClick={props.endQuiz}>End Quiz</SubmitButton>
      </div>
    </QuestionContainer>
  )
}
