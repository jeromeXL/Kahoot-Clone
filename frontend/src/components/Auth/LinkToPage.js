import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkToPage (props) {
  return (<div style={{ color: 'white', padding: '5px' }}>{props.text} <Link to={props.page}> {props.linkText} </Link></div>);
}
