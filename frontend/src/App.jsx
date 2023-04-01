import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Login from './components/Auth/Login.js';
import Signup from './components/Auth/Signup.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function Hello () {
  return (<div>Hello</div>);
}

function App () {
  return (
    <>
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
