import React from 'react';
import Button from 'react-bootstrap/Button';

export default function CreateNewGameButton (props) {
  const createNewGame = () => {
    console.log('Create new game: Fetch request here');
  };
  return (
    <Button type="button" style={{ backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', color: 'black', fontWeight: 'bolder', width: '50px' }} onClick={createNewGame}>
      +
    </Button>
  );
}
