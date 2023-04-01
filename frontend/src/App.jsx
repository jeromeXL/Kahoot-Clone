import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Login from './components/Login.js';
import Signup from './components/Signup.js';

function Hello () {
  return (<div>Hello</div>);
}

function App () {
  return (
    <>
      <>Let&apos;s go!</>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hello/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
