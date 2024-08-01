import React from 'react';
import '../styles/global.css';

const Header = () => {
  return (
    <header>
      <h1>Cocktail Recipe Book</h1>
      <img src="/logo.jpeg" alt="Logo" className="logo" />
    </header>
  );
};

export default Header;
