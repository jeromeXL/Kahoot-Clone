import React from 'react'
import Centre from '../General/Centre';
import Title from '../General/Title';
import Subtitle from '../General/Subtitle';
import FormContainer from '../General/FormContainer';
import SubmitButton from '../General/SubmitButton';
import { useNavigate, useLocation } from 'react-router-dom';
import data from '../../config.json';
const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function ResultsScreenAdmin (props) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(url);
  console.log(location.state.token);
  console.log(location.state.quizId);
  const backToDashboard = () => {
    navigate('/dashboard', {
      state: {
        token: location.state.token
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
