import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Login from './components/Auth/Login.js';
import Signup from './components/Auth/Signup.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Join from './components/PlayerJoin/Join.js';
import Default from './components/DefaultScreen/Default.js';
import Dashboard from './components/Dashboard/Dashboard.js';

function App () {
  console.log("Let's go!")
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Default/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/join" element={<Join/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
