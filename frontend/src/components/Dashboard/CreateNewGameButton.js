import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import HeaderButton from '../General/HeaderButton';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import data from '../../config.json';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function CreateNewGameButton (props) {
  const [showToast, setShowToast] = useState(false);
  const handleShowToast = () => setShowToast(true);
  const handleCloseToast = () => setShowToast(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [quizName, setQuizName] = useState('');
  const [validated, setValidated] = useState(false);
  const quizNameChange = (event) => {
    setQuizName(event.target.value);
  }

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    // if no errors:
    handleClose();
    setValidated(false);

    // Fetch request
    const response = await fetch(url + '/admin/quiz/new', {
      method: 'POST',
      headers: { accept: 'application/json', Authorization: `Bearer ${props.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: quizName })
    })

    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    } else {
      handleShowToast();
      // Reload the dashboard to show new job
      props.update();
    }
  }

  return (
    <>
    <HeaderButton name='CreateNewGameButton' onClick={handleShow}>
      Create New Quiz
    </HeaderButton>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new quiz</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={submit}>
      <Modal.Body>
          <Form.Group className="mb-3" controlId="formQuizName">
            <Form.Label>Quiz Name</Form.Label>
            <Form.Control name='NewQuizNameInput' type="text" placeholder="Enter quiz name" required onChange={quizNameChange} />
            <Form.Control.Feedback type="invalid"> Please choose a valid quiz name. </Form.Control.Feedback>
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button name='CancelCreateNewQuiz' variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button name='ConfirmCreateNewQuiz' type="submit" variant="primary">
            Create Quiz
          </Button>
        </Modal.Footer>
      </Form>
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
