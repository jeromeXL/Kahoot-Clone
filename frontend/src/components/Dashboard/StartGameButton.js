import React from 'react';
import Button from 'react-bootstrap/Button';

export default function StartGameButton (props) {
  const startGame = () => {
    console.log('Start Game: Fetch request here');
  };
  return (
    <Button type="button" style={{ backgroundColor: '#139860', borderColor: '#139860', color: 'white', width: '125px' }} onClick={startGame} className='p-2'>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
      </svg>
    </Button>
  );
}
