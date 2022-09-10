import React from 'react';
import { SessionForm } from '../components/SessionForm';

export const CreateSession = () => {
  return (
    <SessionForm method="POST" isModal={false}/>
  )
}
