import React from 'react';
import Centre from '../General/Centre';
import Title from '../General/Title';
import FormContainer from '../General/FormContainer';
import SubmitButton from '../General/SubmitButton';
import Subtitle from '../General/Subtitle';
import FloatingInput from '../General/FloatingInput';
import { Link } from 'react-router-dom';

export default function Review () {
  return (

    <Centre color="#c9a0dc">
      <Title/>
      <Subtitle> Rate your experience out of 10 </Subtitle>
      <FormContainer color="#d8bfd8">
        <FloatingInput type='number'></FloatingInput>
        <SubmitButton color="#800080">
          Submit
          <Link to={'../'}>*</Link>
        </SubmitButton>
      </FormContainer>
    </Centre>
  );
}
