import { React, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { QuestionsContext } from '../EditGame/EditGame.js'
import data from '../../config.json';
import { fileToDataUrl } from '../helper.js';
import AttachmentDropDown from './AttachmentDropDown.js';
import QuestionInput from './QuestionInput.js';
import PointInput from './PointInput.js';
import TimeInput from './TimeInput.js';
import YoutubeInput from './YoutubeInput.js';
import ImageInput from './ImageInput.js';
import MultiChoiceToggle from './MultiChoiceToggle.js';
import DeleteOptionButton from './DeleteOptionButton.js';
import AddOptionButton from './AddOptionButton.js';
import ToastSuccessText from './ToastSuccessText.js';
import SmallSubmitButton from '../General/SmallSubmitButton.js';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function AddQuestionButton (props) {
  const payload = useContext(QuestionsContext);
  const allQuestions = payload.questions;
  const allGameData = payload.data;
  const gameId = payload.id;
  const token = payload.token;

  const [showToast, setShowToast] = useState(false);
  const handleShowToast = () => setShowToast(true);
  const handleCloseToast = () => setShowToast(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const changeQuestion = (event) => {
    setTitle(event.target.value);
  }
  const [multi, setMulti] = useState(false);
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

  const [correct, setCorrect] = useState([false, false]);
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

  const [options, setOptions] = useState(['', '']);
  const changeOption = (event, index) => {
    const tmpOptions = options;
    tmpOptions[index] = `${event.target.value}`;
    setOptions(tmpOptions);
  }

  const [points, setPoints] = useState(0);
  const changePoints = (event) => {
    setPoints(event.target.value);
  }

  const [time, setTime] = useState(0);
  const changeTime = (event) => {
    setTime(event.target.value);
  }

  const [numOptions, setNumOptions] = useState(2);

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

  const [isImg, setIsImg] = useState(false);
  const [isLink, setIsLink] = useState(false);

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

  const submit = async () => {
    if (title === '') {
      alert('Question cannot be empty');
      return;
    }

    // Check all inputs are not empty
    for (let i = 0; i < options.length; i++) {
      if (options[i] === '') {
        alert('Options cannot be empty');
        return;
      }
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

    // Create the question object
    const optionsToSubmit = [];
    for (let i = 0; i < options.length; i++) {
      const obj = {}
      obj[options[i]] = correct[i];
      optionsToSubmit.push(obj);
    }
    const newQuestion = { title, multi, options: optionsToSubmit, points: pointsNumber, time: timeNumber, link: isLink ? link : null, image: isImg ? img : null };
    console.log('New question: ', newQuestion);
    allQuestions.push(newQuestion);
    allGameData.questions = allQuestions;

    // Fetch request
    console.log('fetching')
    const response = await fetch(url + '/admin/quiz/' + gameId, {
      method: 'PUT',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(allGameData)
    });
    const data = await response.json();
    console.log('data is : ', data);
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
      alert('Error when adding new question');
    } else {
      // If there are no errors
      handleClose();
      handleShowToast();
      // Reset form.
      resetForm();
      // Reload to show new question
      props.update();
    }
  }

  const resetForm = () => {
    setCorrect([false, false]);
    setOptions(['', '']);
    setMulti(false);
  }

  return (
    <>
    <Button aria-label='Add Question Button' data-cy='AddQuestionButton' onClick={handleShow}>
      Add new Question
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group className="mb-3" controlId="formQuizName">
            <QuestionInput onChange={changeQuestion}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPoints">
            <PointInput onChange={changePoints}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTime">
            <TimeInput onChange={changeTime}/>
          </Form.Group>
          <hr/>
          <div className='p-2'>
            <h3>Links/Images</h3>
            <AttachmentDropDown onChange={changeAttachment}/>
            {isLink && <>
              <YoutubeInput onChange={linkChange}/>
            </>}
            {isImg && <>
              <ImageInput onChange={imageChange}/>
            </>}
          </div>
          <hr/>
          <div>
            <MultiChoiceToggle {...(multi === true) ? { checked: 'success' } : { }} onChange={switchChange} />
          </div>
          <div>
            <Form data-cy='NewQuestionOptionsForm'>
            {options.map((option, index) => (
              <div className='d-flex justify-content-start align-items-center p-2' key={index}>
                <Form.Check
                  type={multi === true ? 'checkbox' : 'radio'}
                  {...(correct[index] === true) ? { defaultChecked: 'success' } : { }} inline aria-label={`${multi === true ? 'checkbox' : 'radio'} for ${option}`} name='options' onChange={() => changeCorrect(index, multi === true)}
                />
                <Form.Control type='text' onChange={(e) => changeOption(e, index)}
                  defaultValue={option} required aria-label={option}
                />
              </div>
            ))}
            </Form>
          </div>
          <div className='d-flex justify-content-between align-items-center p-2'>
            <DeleteOptionButton onClick={deleteOption} {...(numOptions <= 2) ? { disabled: 'success' } : { }}/>
            <AddOptionButton onClick={addOption} {...(numOptions >= 6) ? { disabled: 'success' } : { }}/>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <SmallSubmitButton onClick={handleClose} color='#AC0000'> Cancel </SmallSubmitButton>
        <SmallSubmitButton data-cy='ConfirmCreateQuestion' onClick={submit} color='#017BFE'> Create question </SmallSubmitButton>
      </Modal.Footer>
    </Modal>
    <ToastContainer className="p-3" position='top-end'>
      <Toast show={showToast} onClose={handleCloseToast} bg='success' delay={3000} autohide>
        <Toast.Header closeButton={false}>
              <ToastSuccessText/>
        </Toast.Header>
        <Toast.Body>Sucessfully created a new quiz!</Toast.Body>
      </Toast>
    </ToastContainer>
    </>
  );
}
