import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import EditGameHeader from './EditGameHeader';

export default function EditGame () {
  const location = useLocation();
  const token = location.state.token;
  const params = useParams();
  console.log(params);
  return (
    <>
    <EditGameHeader token={token}/>
    <div>
      Edit Game for {params.id}
    </div>
    </>
  );
}
