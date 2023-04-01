import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkToPlayerJoin () {
  return (
    <div style={{ color: 'white', padding: '15px', fontSize: '15pt' }}>Want to join as a player? <Link to="../join"> Click here! </Link></div>
  );
}
