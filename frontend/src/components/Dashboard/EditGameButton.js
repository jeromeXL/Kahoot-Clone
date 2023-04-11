import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function EditGameButton (props) {
  const navigate = useNavigate();
  const id = props.id;
  const editGame = () => {
    console.log(`Go to new route: /edit/quiz/${id}`);
    navigate(`../edit/game/${id}`, {
      state: {
        token: props.token,
      }
    });
  };
  return (
    <Button type="button" style={{ backgroundColor: '#6178A8', borderColor: '#6178A8', color: 'white', width: '125px' }} onClick={editGame} className='p-2'>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
      </svg>
    </Button>
  );
}
