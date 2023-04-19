import { React, useState } from 'react';
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import data from '../../config.json';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import StopGameButton from './StopGameButton';
import { useMediaQuery } from 'react-responsive'

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function StartGameButton (props) {
  const navigate = useNavigate();

  const token = props.token;
  const quizId = props.quizId;

  const [showToast, setShowToast] = useState(false);
  const handleShowToast = () => setShowToast(true);
  const handleCloseToast = () => setShowToast(false);

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Results modal
  const [RShow, setRShow] = useState(false);
  const handleRClose = () => setRShow(false);
  const handleRShow = () => setRShow(true);

  const [onBefore, setOnBefore] = useState(false);

  const [sessionId, setSessionId] = useState(null);
  const [link, setLink] = useState('');

  /* Not Working
  useEffect(() => {
    const checkOnBefore = async () => {
      const response = await fetch(url + `/admin/quiz/?quizId=${quizId}`, {
        method: 'GET',
        headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.active !== null || data.oldSessions.length !== 0) {
        setOnBefore(true);
      } else {
        setOnBefore(false);
      }
    };
    checkOnBefore();
  }, []);
  */

  const startGame = async () => {
    console.log('Start Game Button Pressed');

    // Fetch request
    const response = await fetch(url + `/admin/quiz/${quizId}/start`, {
      method: 'POST',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizid: quizId })
    })

    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    } else {
      // Fetch Request to get SessionID
      console.log('Fetching Session ID');
      const response = await fetch(url + `/admin/quiz/${quizId}`, {
        method: 'GET',
        headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      })
      const data = await response.json();
      if (data.error) {
        console.log(`ERROR: ${data.error}`);
      }
      console.log(data);
      setSessionId(data.active);
      setLink(`http://localhost:3000/join/game/${data.active}`);
      handleShow();
      setOnBefore(true);
    }
  };

  const stopGame = async () => {
    console.log('Stop Game Button Pressed');

    // Fetch request
    const response = await fetch(url + `/admin/quiz/${quizId}/end`, {
      method: 'POST',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizid: quizId })
    })

    const data = await response.json();
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    } else {
      setOnBefore(false);
      handleRShow();
    }
  }

  const toAdminGame = async () => {
    // Switch Routes
    navigate(`/admin/game/${quizId}`, {
      state: {
        token,
        quizId,
        sessionId
      }
    });
  }

  const toAdminResults = async () => {
    // Switch Routes
    navigate(`/admin/game/${quizId}/results`, {
      state: {
        token,
        quizId
      }
    });
  }
  console.log(stopGame);
  let width;
  let iconSquare;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 800px)' });
  if (isSmallScreen) {
    width = '70px';
    iconSquare = '17';
  } else if (isMediumScreen) {
    width = '100px';
    iconSquare = '20';
  } else {
    width = '125px';
    iconSquare = '25';
  }

  return (
    <>
    <Modal name='StartGameModal' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Session ID: {sessionId} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5> {link} </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => toAdminGame()}>
            Take me to Game Screen
          </Button>
          <CopyToClipboard text={link}>
            <Button variant="primary" onClick={() => handleShowToast()}>Copy Link</Button>
          </CopyToClipboard>
        </Modal.Footer>
    </Modal>
    <Modal name='StopGameModal' show={RShow} onHide={handleRClose}>
      <Modal.Header closeButton>
        <Modal.Title>Game Stopped!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Would you like to view results?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" aria-label='Back to Dashboard Button' onClick={handleRClose}>No</Button>
        <Button variant="primary" aria-label='View Results Button' name='ToResultsPage' onClick={() => toAdminResults()}>Yes</Button>
        </Modal.Footer>
    </Modal>
    <div>
      { onBefore
        ? <StopGameButton token={token} quizId={quizId} handleRShow={handleRShow} setOnBefore={setOnBefore}></StopGameButton>
        : <Button
            type="button" aria-label='Start Game Button' name='StartGameButton' style={{ backgroundColor: '#139860', borderColor: '#139860', color: 'white', width, }}
            onClick={startGame} className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg" width={iconSquare} height={iconSquare} fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16"
              style={{ margin: '-5px' }}
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          </Button>
      }
    </div>
    <ToastContainer className="p-3" position='top-end'>
      <Toast show={showToast} onClose={handleCloseToast} bg='success' delay={3000} autohide>
        <Toast.Header closeButton={false}>
              <strong className="me-auto">BigBrain</strong>
              <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>Sucessfully copied link to clipboard!</Toast.Body>
      </Toast>
    </ToastContainer>
    </>
  );
}
