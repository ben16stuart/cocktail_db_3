// components/Header.js
import React from 'react';
import styles from '../styles/Header.module.css'; // Adjust the path if needed

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Cocktail Database</h1>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>
    </header>
  );
};

export default Header;
