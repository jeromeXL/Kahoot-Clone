import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import data from '../../config.json';
import { fileToDataUrl } from '../helper';
import EditPointsInput from './EditPointsInput';
import EditTimeInput from './EditTimeInput';
import AttachmentDropDown from '../EditGame/AttachmentDropDown';
import YoutubeInput from '../EditGame/YoutubeInput';
import ImageInput from '../EditGame/ImageInput';
import ExistingImage from './ExistingImage';
import MultiChoiceToggle from '../EditGame/MultiChoiceToggle';
import AddOptionButton from '../EditGame/AddOptionButton';
import DeleteOptionButton from '../EditGame/DeleteOptionButton';
import SmallSubmitButton from '../General/SmallSubmitButton'
import QuestionContainer from '../Question/QuestionContainer';
import QuestionHeaderContainer from '../Question/QuestionHeaderContainer';
import TitleContainer from '../Question/TitleContainer';
import PointTimeContainer from '../Question/PointTimeContainer';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function EditableQuestion (props) {
  const navigate = useNavigate();
  const token = props.token;
  const [options, setOptions] = useState([]);
  const changeOption = (event, index) => {
    const tmpOptions = options;
    tmpOptions[index] = `${event.target.value}`;
    setOptions(tmpOptions);
  }

  const [correct, setCorrect] = useState([]);
  const changeCorrect = (index, checkbox) => {
    const tmpCorrect = correct;
    if (!checkbox) {
      for (let i = 0; i < correct.length; i++) {
        tmpCorrect[i] = false;
      }
      console.log('after loop: ', tmpCorrect);
    }
    tmpCorrect[index] = !correct[index];
    setCorrect(tmpCorrect);
  }
  const [numOptions, setNumOptions] = useState(props.options.length);
  const [multi, setMulti] = useState(props.multi);
  const [title, setTitle] = useState(props.title);
  const changeTitle = (event) => {
    setTitle(event.target.value);
  }
  const [points, setPoints] = useState(props.points);
  const changePoints = (event) => {
    setPoints(event.target.value);
  }
  const [time, setTime] = useState(props.time);
  const changeTime = (event) => {
    setTime(event.target.value);
  }
  const populateCorrect = () => {
    for (const opt of props.options) {
      setOptions(oldArray => [...oldArray, Object.keys(opt)[0]]);
      setCorrect(oldArray => [...oldArray, opt[Object.keys(opt)[0]]]);
    }
  }

  useEffect(() => {
    populateCorrect();
  }, []);

  const addOption = () => {
    if (numOptions >= 6) {
      return;
    }
    setNumOptions(numOptions + 1);
    setOptions(oldArray => [...oldArray, '']);
    setCorrect(oldArray => [...oldArray, false]);
  }

  const deleteOption = () => {
    if (numOptions <= 2) {
      return;
    }
    setNumOptions(numOptions - 1);
    const tmpOptions = options;
    tmpOptions.pop();
    const tmpCorrect = correct;
    tmpCorrect.pop();
    setOptions(tmpOptions);
    setCorrect(tmpCorrect);
  }

  const switchChange = () => {
    if (multi) {
      const tmpCorrect = correct;
      for (let i = 0; i < correct.length; i++) {
        tmpCorrect[i] = false;
      }
      setCorrect(tmpCorrect);
    }
    setMulti(!multi);
  }

  const [isImg, setIsImg] = useState(props.image !== null);
  const [isLink, setIsLink] = useState(props.link !== null);

  const changeAttachment = (event) => {
    console.log(event.target.value);
    if (event.target.value === 'img') {
      setIsImg(true);
      setIsLink(false);
    } else if (event.target.value === 'link') {
      setIsImg(false);
      setIsLink(true);
    } else {
      setIsImg(false);
      setIsLink(false);
    }
  }

  const [img, setImg] = useState(props.image);
  const imageChange = async (event) => {
    const files = Array.from(event.target.files);
    const data = await fileToDataUrl(files[0]);
    setImg(data);
  }

  const [link, setLink] = useState(props.link);
  const linkChange = (event) => {
    setLink(event.target.value);
  }

  const back = () => {
    navigate(-1, {
      state: {
        token,
      }
    });
  }

  const submit = () => {
    // Check all inputs are not empty
    for (let i = 0; i < options.length; i++) {
      if (options[i] === '') {
        alert('Options cannot be empty');
        return;
      }
    }

    // Check title is not empty
    if (title === '') {
      alert('Title cannot be empty');
      return;
    }

    // Check there is at least one right answer
    const atLeastOne = correct.reduce(
      (accumulator, currentValue) => accumulator || currentValue,
      false
    );
    if (!atLeastOne) {
      alert('There must be at least one right answer');
      return;
    }

    // Check points and time are positive integers
    const pointsNumber = Number(points);
    if (!Number.isInteger(pointsNumber) || Math.sign(pointsNumber) !== 1) {
      alert('Points for a question must be a positive integer')
      return;
    }
    const timeNumber = Number(time);
    if (!Number.isInteger(timeNumber) || Math.sign(timeNumber) !== 1) {
      alert('Time for a question must be a positive integer')
      return
    }
    const allQuestions = props.allQuestions;
    const indexToChange = props.index;
    const optionsToSubmit = [];
    for (let i = 0; i < options.length; i++) {
      const obj = {}
      obj[options[i]] = correct[i];
      optionsToSubmit.push(obj);
    }
    console.log('options to submit: ', optionsToSubmit);
    const editedQuestion = { title, multi, options: optionsToSubmit, points: pointsNumber, time: timeNumber, link: isLink ? link : null, image: isImg ? img : null };
    allQuestions[indexToChange] = editedQuestion;
    console.log('after: ', allQuestions);
    const gameData = props.data;
    gameData.questions = allQuestions;
    console.log('after', gameData);
    updateAndReturn(gameData);
  }

  const updateAndReturn = async (payload) => {
    const response = await fetch(url + '/admin/quiz/' + props.id, {
      method: 'PUT',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log('data is : ', data);
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    } else {
      navigate(-1, {
        state: {
          token,
        }
      });
    }
  }

  return (
    <QuestionContainer>
      <QuestionHeaderContainer>
        <TitleContainer>
          <Form.Control defaultValue={title} onChange={changeTitle}/>
        </TitleContainer>
        <PointTimeContainer>
          <EditPointsInput defaultValue={points} onChange={changePoints}/>
          <EditTimeInput defaultValue={time} onChange={changeTime}/>
        </PointTimeContainer>
      </QuestionHeaderContainer>
      <hr/>
      <div className='p-2'>
        <h3>Links/Images</h3>
        <AttachmentDropDown onChange={changeAttachment} defaultValue={props.link ? 'link' : (props.image ? 'img' : 'none')} />
        {isLink && <>
          <YoutubeInput onChange={linkChange} {...(props.link) ? { defaultValue: props.link } : { }}/>
        </>}
        {isImg && <>
          <ImageInput onChange={imageChange}/>
          {props.image &&
            <ExistingImage image={props.image} id={props.id}/>
          }
        </>}
      </div>
      <hr/>
      <div>
        <MultiChoiceToggle {...(multi === true) ? { checked: 'success' } : { }} onChange={switchChange} />
      </div>
      <div className='d-flex justify-content-between align-items-center p-2'>
        <DeleteOptionButton onClick={deleteOption} {...(numOptions <= 2) ? { disabled: 'success' } : { }}/>
        <AddOptionButton onClick={addOption} {...(numOptions >= 6) ? { disabled: 'success' } : { }}/>
      </div>
      <div>
        <Form>
        {options.map((option, index) => (
          <div className='d-flex justify-content-start align-items-center p-2' key={index}>
            <Form.Check
              type={multi === true ? 'checkbox' : 'radio'}
              {...(correct[index] === true) ? { defaultChecked: 'success' } : { }} inline aria-label={`${multi === true ? 'checkbox' : 'radio'} for ${option}`} name='options' onChange={() => changeCorrect(index, multi === true)}
            />
            <Form.Control onChange={(e) => changeOption(e, index)}
              defaultValue={option} aria-label={option}
            />
          </div>
        ))}
        </Form>
      </div>
      <div className='d-flex justify-content-between align-items-center p-2'>
        <SmallSubmitButton onClick={back} color='#AC0000'> Cancel </SmallSubmitButton>
        <SmallSubmitButton onClick={submit} color='#017BFE'> Save Changes </SmallSubmitButton>
      </div>
    </QuestionContainer>
  );
}
