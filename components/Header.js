import React from 'react';
import styles from '../styles/Header.module.css'; // Import the correct CSS module

const Header = () => {
  const reloadPage = () => {
    window.location.reload(); // Reloads the current page
  };

  return (
    <header className={styles.headerContainer}>
      <h1 onClick={reloadPage} className={styles.clickableText}>Cocktail Database</h1>
      <img src="/logo.png" alt="Logo" className={styles.logo} onClick={reloadPage} />
    </header>
  );
};

export default Header;
