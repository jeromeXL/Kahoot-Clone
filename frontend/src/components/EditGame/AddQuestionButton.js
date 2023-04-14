import { React, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { QuestionsContext } from '../EditGame/EditGame.js'
import data from '../../config.json';
import { fileToDataUrl } from '../helper.js';

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

  const submit = async (event) => {
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
      // Reload the dashboard to show new job
      props.update();
    }
  }

  return (
    <>
    <Button onClick={handleShow}>
      Add new Question
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group className="mb-3" controlId="formQuizName">
            <Form.Label>Question</Form.Label>
            <Form.Control type="text" placeholder="Enter a question" required onChange={changeQuestion} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPoints">
            <Form.Label>Maximum Points</Form.Label>
            <Form.Control type="number" placeholder="Enter the max points" required onChange={changePoints} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTime">
            <Form.Label>Time Limit</Form.Label>
            <Form.Control type="number" placeholder="Enter question time limit" required onChange={changeTime} />
          </Form.Group>
          <hr/>
          <div className='p-2'>
            <h3>Links/Images</h3>
            <Form.Select aria-label="select attachment type" onChange={changeAttachment} style={{ marginBottom: '20px' }}>
              <option value="none">No attachment</option>
              <option value="img">Image</option>
              <option value="link">Youtube Link</option>
            </Form.Select>
            {isLink && <>
              <Form.Label>Enter Youtube URL</Form.Label>
              <Form.Control onChange={linkChange}/>
            </>}
            {isImg && <>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={imageChange}/>
            </>}
          </div>
          <hr/>
          <div>
            <Form.Check
              type="switch"
              label="multiple correct answers"
              className="mb-3"
              {...(multi === true) ? { checked: 'success' } : { }}
              onChange={switchChange}
            />
          </div>
          <div>
            <Form>
            {options.map((option, index) => (
              <div className='d-flex justify-content-start align-items-center p-2' key={index}>
                <Form.Check
                  type={multi === true ? 'checkbox' : 'radio'}
                  {...(correct[index] === true) ? { defaultChecked: 'success' } : { }} inline aria-label={option} name='options' onChange={() => changeCorrect(index, multi === true)}
                />
                <Form.Control onChange={(e) => changeOption(e, index)}
                  defaultValue={option} required
                />
              </div>
            ))}
            </Form>
          </div>
          <div className='d-flex justify-content-between align-items-center p-2'>
            <Button onClick={deleteOption} {...(numOptions <= 2) ? { disabled: 'success' } : { }}> Delete Option </Button>
            <Button onClick={addOption} {...(numOptions >= 6) ? { disabled: 'success' } : { }}> Add Option </Button>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submit}>
            Create question
          </Button>
      </Modal.Footer>
    </Modal>
    <ToastContainer className="p-3" position='top-end'>
      <Toast show={showToast} onClose={handleCloseToast} bg='success' delay={3000} autohide>
        <Toast.Header closeButton={false}>
              <strong className="me-auto">BigBrain</strong>
              <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>Sucessfully created a new quiz!</Toast.Body>
      </Toast>
    </ToastContainer>
    </>
  );
}
