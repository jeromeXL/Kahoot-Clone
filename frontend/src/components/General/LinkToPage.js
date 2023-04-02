import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkToPage (props) {
  return (<div style={{ color: 'white', padding: '10px', fontSize: props.fontSize ? props.fontSize : '12pt', textAlign: 'center' }}>{props.text} <Link to={props.page} style={{ color: props.color }}> {props.linkText} </Link></div>);
}
