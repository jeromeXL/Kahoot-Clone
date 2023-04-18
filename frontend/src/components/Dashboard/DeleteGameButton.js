import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import data from '../../config.json';
import { useMediaQuery } from 'react-responsive'

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function DeleteGameButton (props) {
  const token = props.token;
  const quizId = props.quizId;
  const [showToast, setShowToast] = useState(false);
  const handleShowToast = () => setShowToast(true);
  const handleCloseToast = () => setShowToast(false);
  const deleteGame = async () => {
    console.log('Deleting Game');

    // Fetch request
    const response = await fetch(url + `/admin/quiz/${quizId}`, {
      method: 'DELETE',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizid: quizId })
    })

    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    } else {
      handleShowToast();
      // Reload the dashboard to show deleted job
      props.update();
    }
  };
  let width;
  let iconSquare;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen) {
    width = '70px';
    iconSquare = '13';
  } else if (isMediumScreen) {
    width = '100px';
    iconSquare = '15';
  } else {
    width = '125px';
    iconSquare = '20';
  }
  return (
    <>
    <Button aria-label='DeleteGameButton' name='DeleteGameButton' type="button" style={{ backgroundColor: '#AC0000', borderColor: '#AC0000', color: 'white', width }} onClick={deleteGame} className='p-2'>
      <svg xmlns="http://www.w3.org/2000/svg" width={iconSquare} height={iconSquare} fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
      </svg>
    </Button>
    <ToastContainer className="p-3" position='top-end'>
      <Toast show={showToast} onClose={handleCloseToast} bg='danger' delay={3000} autohide>
        <Toast.Header closeButton={false}>
              <strong className="me-auto">BigBrain</strong>
              <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>Quiz has been deleted!</Toast.Body>
      </Toast>
    </ToastContainer>
    </>
  );
}
