import React from 'react'
// import data from '../../config.json';
// import { useParams, useLocation } from 'react-router-dom';
import Centre from '../General/Centre';
import Title from '../General/Title';
import Subtitle from '../General/Subtitle';
import FormContainer from '../General/FormContainer';
import SubmitButton from '../General/SubmitButton';

// const BACKEND_PORT = data.BACKEND_PORT;
// const url = `http://localhost:${BACKEND_PORT}`;

export default function InGameScreenAdmin (props) {
  // const token = props.token;
  // const quizId = props.quizId;

  const nextQuestion = async () => {
    // Fetch Question ID 


    navigate(`/admin/game/${quizId}/${questionId}`, {
      token: token,
      quizId: quizId
    });

  }

  return (
    <>
      <Centre color="#39548D">
        <Title/>
        <Subtitle> Quiz </Subtitle>
        <FormContainer color="#AAB8D4">
          <h2>Question Here</h2>
          <SubmitButton color="#475A81" onClick={() => nextQuestion()}>Next Question</SubmitButton>
        </FormContainer>
      </Centre>
    </>
  );
}
