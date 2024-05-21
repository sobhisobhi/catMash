import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Cutest Cat Voting</h1>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Vote Cats
        </Link>
        <Link to="/allCats" className="nav-link">
          Scores Cats
        </Link>
      </nav>
    </header>
  );
};

export default Header;
