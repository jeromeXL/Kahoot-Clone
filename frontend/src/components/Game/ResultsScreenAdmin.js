import React from 'react'
import data from '../../config.json';
import Centre from '../General/Centre';
import Title from '../General/Title';
import Subtitle from '../General/Subtitle';
import FormContainer from '../General/FormContainer';
import SubmitButton from '../General/SubmitButton';
import { useNavigate } from 'react-router-dom';
const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function ResultsScreenAdmin (props) {
  const navigate = useNavigate();
  const token = props.token;
  const quizId = props.quizId;
  console.log(token, quizId, url);
  const backToDashboard = () => {
    navigate('/dashboard', {
      state: {
        token,
      }
    });
  }
  return (
    <>
      <Centre color="#39548D">
        <Title/>
        <Subtitle> Results </Subtitle>
        <FormContainer color="#AAB8D4">
          <SubmitButton color="#475A81" onClick={backToDashboard}>Return to Dashboard</SubmitButton>
        </FormContainer>
      </Centre>
    </>
  );
}
