import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import data from '../../config.json';
import { useNavigate } from 'react-router-dom';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function SaveGameChanges (props) {
  const navigate = useNavigate();
  const token = props.token;
  const update = async () => {
    const response = await fetch(url + '/admin/quiz/' + props.id, {
      method: 'PUT',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: props.name, questions: props.questions, thumbnail: props.thumbnail })
    });
    const data = await response.json();
    console.log('data is : ', data);
    if (data.error) {
      console.log(`ERROR: ${data.error}`);
    } else {
      navigate('../../dashboard', {
        state: {
          token,
        }
      });
    }
  }
  return (
    <Button {...props} onClick={update}> Save Changes </Button>
  );
}
