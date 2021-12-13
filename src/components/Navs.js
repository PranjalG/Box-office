import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  {
    to: '/',
    text: 'Home page',
  },
  {
    to: '/starred',
    text: 'Starred page',
  },
];

function Navs() {
  return (
    <div>
      <ul>
        {LINKS.map(item => (
          <li key={item.to}>
            <Link to={item.to}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navs;
