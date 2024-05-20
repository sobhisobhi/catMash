import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Cutest Cat Voting</h1>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Vote Page
        </Link>
        <Link to="/allCats" className="nav-link">
          Scores Page
        </Link>
      </nav>
    </header>
  );
};

export default Header;
