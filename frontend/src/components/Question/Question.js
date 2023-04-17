import { React } from 'react';
import Option from '../EditGame/Option';
import ToEditQuestionButton from '../EditGame/ToEditQuestionButton';
import Ratio from 'react-bootstrap/Ratio';
import ReactPlayer from 'react-player/youtube'
import DeleteQuestionButton from './DeleteQuestionButton';
import MultiChoiceToggle from '../EditGame/MultiChoiceToggle';
import QuestionContainer from './QuestionContainer';
import QuestionHeaderContainer from './QuestionHeaderContainer';
import TitleContainer from './TitleContainer';
import PointTimeContainer from './PointTimeContainer';
import QuestionImage from './QuestionImage';

export default function Question (props) {
  return (
    <QuestionContainer>
      <QuestionHeaderContainer>
        <TitleContainer>
          {props.title}
        </TitleContainer>
        <PointTimeContainer>
          {props.points} points ({props.time} seconds)
        </PointTimeContainer>
      </QuestionHeaderContainer>
      <hr/>
      <div className='p-2'>
      <h3>Links/Images</h3>
      {props.image && props.image !== null
        ? <QuestionImage image={props.image} id={props.id}/>
        : <></>
      }
      {props.link && props.link !== null
        ? <Ratio aspectRatio={'16x9'}>
          <ReactPlayer url={props.link} controls width='100%' height='100%'/>
          </Ratio>
        : <></>
      }
      {props.link === null && props.image === null
        ? <>No image / link attached</>
        : <></>
      }
      </div>
      <hr/>
      <div>
        <MultiChoiceToggle disabled {...(props.multi === true) ? { checked: 'success' } : { }}/>
      </div>
      <div>
        {props.options.map((option, index) => (
          <Option key={index} option={Object.keys(option)[0]} correct={option[Object.keys(option)[0]]} multi={props.multi}/>
        ))}
      </div>

      <div className='d-flex justify-content-between align-items-center p-2'>
        <ToEditQuestionButton token={props.token} id={props.id}/>
        <DeleteQuestionButton token={props.token} id={props.id}/>
      </div>
    </QuestionContainer>
  );
}
