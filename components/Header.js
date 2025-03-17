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
      
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">

      //<!-- Apple Touch Icon -->
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

      //<!-- Android/Chrome -->
      <link rel="manifest" href="/site.webmanifest">

  
    </header>
  );
};

export default Header;
