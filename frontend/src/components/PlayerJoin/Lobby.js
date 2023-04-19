import { React, useEffect } from 'react';
import FunFacts from '../FunFacts/FunFacts';
import { useLocation, useNavigate } from 'react-router-dom';
import Centre from '../General/Centre';
import Title from '../General/Title';
import Subtitle from '../General/Subtitle';
import FormContainer from '../General/FormContainer';
import LinkToPage from '../General/LinkToPage';
import data from '../../config.json';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function Lobby () {
  const location = useLocation();
  const playerId = location.state.playerId;
  console.log('PLayerID is : ', playerId);
  const sessionId = location.state.sessionId
  const navigate = useNavigate();

  // Fetch request to check if the game has started.
  const getStatus = async () => {
    console.log('Checking whether game has started...')
    const response = await fetch(url + `/play/${playerId}/status`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (data.started && data.started === true) {
      // Take me to starting screen
      console.log('Game is starting!')
      clearInterval(refresh);
      navigate(`/join/play/${sessionId}`, {
        state: {
          playerId
        },
      });
    } else {
      if (data.error) {
        console.log(`ERROR: ${data.error}`)
        alert(`ERROR: ${data.error}`)
      }
      console.log('Game has not started yet!')
    }
  };
  let refresh;
  // Call the fetch request every 1 second
  useEffect(() => {
    refresh = setInterval(getStatus, 1000);
  }, [])
  return (
    <>
      <Centre color="#136A6A">
        <Title/>
        <Subtitle> Waiting for admin to start game ..... </Subtitle>
        <br/>
        <FormContainer color="#9FCBCB">
          <FunFacts></FunFacts>
        </FormContainer>
        <LinkToPage text="Back to main menu " page="../" linkText="here!" color='white'/>
      </Centre>
    </>
  )
}
