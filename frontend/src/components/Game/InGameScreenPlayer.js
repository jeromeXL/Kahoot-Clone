import React from 'react'
import data from '../../config.json';
import { useParams, useLocation } from 'react-router-dom';

const BACKEND_PORT = data.BACKEND_PORT;
const url = `http://localhost:${BACKEND_PORT}`;

export default function InGameScreenPlayer () {
  return(
    <h1>In Game Screen for players Here</h1>
  );
}
