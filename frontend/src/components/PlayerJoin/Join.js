import { React, useState } from 'react';
import Centre from '../General/Centre';
import FormContainer from '../General/FormContainer';
import SubmitButton from '../General/SubmitButton';
import LinkToPage from '../General/LinkToPage';
import Subtitle from '../General/Subtitle';
import FloatingInput from '../General/FloatingInput';
import Title from '../General/Title';
import Form from 'react-bootstrap/Form';
import data from '../../config.json';
const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;
let playerId;

export default function Join () {
  const [name, setName] = useState('');
  const nameChange = (event) => {
    setName(event.target.value);
  }

  const [sessionID, setSessionID] = useState('');
  const sessionChange = (event) => {
    setSessionID(event.target.value);
  }

  const joinGame = () => {
    console.log(`Joining game: ${sessionID}. Name: ${name}`);
    // Fetch request
    fetch(url + `/play/join/${sessionID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    }).then((response) => {
      if (!response.ok) {
        console.log('response error!!!!');
      }
      return response.json();
    }).then((data) => {
      console.log('Log in data ', data);
      playerId = data.playerId;
    }).catch((err) => {
      console.log(`ERROR: ${err}`);
    });
  }

  return (
    <>
        <Centre color="#136A6A">
          <Title/>
          <Subtitle> Player Join </Subtitle>
          <FormContainer color="#9FCBCB">
            <Form>
              <FloatingInput type="text" controlId="formName" labelControlId="floatingInput" label="Name" placeholder="Enter Name" onChange={nameChange}/>
              <FloatingInput type="text" controlId="formSessionID" labelControlId="floatingInput" label="Session ID" placeholder="Enter Session ID" onChange={sessionChange}/>
              <SubmitButton onClick={joinGame} color="#005050">
                Join Game
              </SubmitButton>
            </Form>
          </FormContainer>
          <LinkToPage text="Want to start or create your own game? " page="../login" linkText="Click here!" color='white'/>
        </Centre>
      </>
  );
}

export { playerId };
