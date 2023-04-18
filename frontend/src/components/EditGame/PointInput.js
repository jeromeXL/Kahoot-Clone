import React from 'react';
import Form from 'react-bootstrap/Form';

export default function PointInput (props) {
  return (
    <>
      <Form.Label>Maximum Points</Form.Label>
      <Form.Control aria-label='Points input' data-cy='NewPointsInput' type="number" placeholder="Enter the max points" required onChange={props.onChange} />
    </>
  );
}
