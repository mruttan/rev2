import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>We're unable to find that page.</p>
      <Link to="/">Home</Link>
    </div>
  );
};