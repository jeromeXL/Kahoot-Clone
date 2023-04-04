import { React } from 'react';
import DashboardHeader from './DashboardHeader';
import '@fontsource/inter';
import GamesContainer from './GamesContainer';
import GameInDashBoard from './GameInDashboard';
// import { token as loginToken} from '../Auth/Login';
// import Container from 'react-bootstrap/Container';

export default function Dashboard () {
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
