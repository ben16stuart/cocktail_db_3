// components/Header.js
import React from 'react';
import styles from '../styles/Header.module.css'; // Import the correct CSS module

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <h1>Cocktail Database</h1>
      <img src="/logo.jpeg" alt="Logo" className={styles.logo} />
    </header>
  );
};

export default Header;
