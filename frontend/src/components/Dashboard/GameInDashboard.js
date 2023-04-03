import React from 'react';
import GameTitle from './GameTitle';
import GameText from './GameText';
import StartGameButton from './StartGameButton';
import EditGameButton from './EditGameButton';
import DeleteGameButton from './DeleteGameButton';

export default function GameInDashBoard (props) {
  return (
    <div style={{ backgroundColor: '#D9D9D9', width: '500px', borderRadius: '9px' }}>
      <div className='d-flex justify-content-around align-items-center p-2'>
        <img style={{ width: '135px', height: 'auto', marginLeft: '18px', marginTop: '10px', borderRadius: '9px' }} src={require('./defaultGameImage.png')} className='p-1'/>
        <div className='d-flex flex-column justify-content-around align-items-start flex-grow-1 p-1' >
          <GameTitle>GameTitle</GameTitle>
          <GameText>6 Questions</GameText>
          <GameText>25 minutes</GameText>
        </div>
      </div>
      <div className='d-flex justify-content-around align-items-center p-3' style={{ padding: '10px' }}>
        <StartGameButton/>
        <EditGameButton/>
        <DeleteGameButton/>
      </div>
    </div>
  );
}
