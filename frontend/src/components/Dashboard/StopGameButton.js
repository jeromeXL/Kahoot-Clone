import { React } from 'react';
import Button from 'react-bootstrap/Button';
import data from '../../config.json';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function StopGameButton (props) {
  const token = props.token;
  const quizId = props.quizId;
  const handleRShow = props.handleRShow;
  const setOnBefore = props.setOnBefore;

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
      handleRShow();
    } else {
      setOnBefore(true);
      localStorage.setItem(`onBefore_${quizId}`, true);
      handleRShow();
    }
  }

  return (
    <Button type="button" aria-label='Stop Game Button' name='StopGameButton' style={{ backgroundColor: '#d9534f', borderColor: '#d9534f', color: 'white', width: '125px', }}
            onClick={stopGame} className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-stop-fill" viewBox="0 0 16 16"
              style={{ margin: '-5px' }}>
              <path d="M5 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3z" />
            </svg>
    </Button>
  );
}
