import React from 'react'
import data from '../../config.json';
import Centre from '../General/Centre';
import Title from '../General/Title';
import Subtitle from '../General/Subtitle';
import FormContainer from '../General/FormContainer';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function ResultsScreenAdmin (props) {
  const token = props.token;
  const quizId = props.quizId;

  return (
    <>
      <Centre color="#39548D">
        <Title/>
        <Subtitle> Results </Subtitle>
        <FormContainer color="#AAB8D4">
        </FormContainer>
      </Centre>
    </>
  );
}