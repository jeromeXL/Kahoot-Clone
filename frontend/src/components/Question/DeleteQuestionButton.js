import { React, useContext, useState } from 'react';
import SmallSubmitButton from '../General/SmallSubmitButton';
import { QuestionsContext } from '../EditGame/EditGame';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import data from '../../config.json';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function DeleteQuestionButton (props) {
  const payload = useContext(QuestionsContext);
  const gameId = payload.id;
  const allQuestions = payload.questions;
  const allData = payload.data;
  const updateQuestionFeed = payload.update;
  const questionId = props.id;
  const token = props.token;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteQuestion = async () => {
    // remove the desired question using splice
    allQuestions.splice(questionId, 1);
    // replace questions with the updated questions
    allData.questions = allQuestions;
    // fetch req
    const response = await fetch(url + '/admin/quiz/' + gameId, {
      method: 'PUT',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(allData)
    });
    const data = await response.json();
    console.log('data is : ', data);
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
      alert(`There was an error when deleting the question : ${data.error}`);
    } else {
      alert('Successfully deleted question');
      updateQuestionFeed();
      handleClose();
    }
  }
  return (
    <>
      <SmallSubmitButton aria-label='Delete Question Button' color='#AC0000' onClick={handleShow}> Delete question </SmallSubmitButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete this question</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteQuestion}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
