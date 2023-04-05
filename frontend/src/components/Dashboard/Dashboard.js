import { React } from 'react';
import DashboardHeader from './DashboardHeader';
import '@fontsource/inter';
import GamesContainer from './GamesContainer';
import GameInDashBoard from './GameInDashboard';
import { useLocation } from 'react-router-dom';
import data from '../../config.json';

let token;
const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function Dashboard () {
  const location = useLocation();
  token = location.state.token;
  console.log(token);
  fetch(url + '/admin/quiz', {
    method: 'GET',
    headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (!response.ok) {
        console.log('Response error when loading game feed');
        throw new Error('Invalid Token/Access');
      }
      return response.json();
    })
    .then((data) => {
      console.log('games data ', data);
    })
    .catch((err) => {
      console.log('Other error when loading job feed');
      console.log(err);
    });

  return (
    <>
      <DashboardHeader/>
      <GamesContainer>
        <GameInDashBoard/>
        <GameInDashBoard/>
      </GamesContainer>
    </>
  );
}
