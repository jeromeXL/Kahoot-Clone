import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Centre from '../General/Centre';
import FormContainer from '../General/FormContainer';
import SubmitButton from '../General/SubmitButton';
import LinkToPage from '../General/LinkToPage';
import Subtitle from '../General/Subtitle';
import FloatingInput from '../General/FloatingInput';
import Title from '../General/Title';
import Form from 'react-bootstrap/Form';
import data from '../../config.json';
import ErrorPopup from '../General/ErrorPopup';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function Join () {
  const [name, setName] = useState('');
  const nameChange = (event) => {
    setName(event.target.value);
  }

  const [sessionId, setSessionID] = useState('');
  const sessionChange = (event) => {
    setSessionID(event.target.value);
  }

  const [joinError, setJoinError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const joinGame = async () => {
    console.log(`Joining game: ${sessionId}. Name: ${name}`);
    setJoinError(false);

    if (name === '') {
      setJoinError(true);
      setErrorMessage('Name cannot be empty');
      console.log('Name empty, returned')
      return;
    }

    // Fetch request
    const response = await fetch(url + `/play/join/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })

    const respData = await response.json();
    if (respData.error) {
      console.log(`ERROR: ${respData.error}`);
      setJoinError(true);
      setErrorMessage('Invalid Session ID');
    } else {
      console.log('Joining data ', respData);
      navigate(`/join/lobby/${sessionId}`, {
        state: {
          playerId: respData.playerId,
          sessionId,
        }
      });
    }
  }

  return (
    <>
        <Centre color="#136A6A">
          <Title/>
          <Subtitle> Player Join </Subtitle>
          {joinError && <ErrorPopup message={errorMessage} />}
          <FormContainer color="#9FCBCB">
            <Form>
              <FloatingInput type="text" controlId="formName" labelControlId="floatingInput" label="Name" placeholder="Enter Name" onChange={nameChange}/>
              <FloatingInput type="text" controlId="formSessionID" labelControlId="floatingInput" label="Session ID" placeholder="Enter Session ID" onChange={sessionChange}/>
              <SubmitButton aria-label='Join Game Button' onClick={joinGame} color="#005050">
                Join Game
              </SubmitButton>
            </Form>
          </FormContainer>
          <LinkToPage text="Want to start or create your own game? " page="../login" linkText="Click here!" color='white'/>
        </Centre>
      </>
  );
}
