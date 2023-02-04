import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLink } from 'react-icons/ai'

export const Navigation = () => {
  return (
    <nav class="nav">
      <ol>
        <li><Link to="/">HomePage</Link></li>
        <li className='rightArrow'><AiOutlineLink /></li>
        <li><Link to="/create-exercise">Create Exercise</Link></li>
      </ol>
    </nav>
  );
};

export default Navigation;
