import React from 'react';
import { Bebas_Neue } from 'next/font/google';
import styles from '../styles/Header.module.css'; // Import the correct CSS module

// Downloaded at build time and served from the site itself (no Google request on page load).
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], display: 'swap' });

const Header = () => {
  const reloadPage = () => {
    window.location.reload(); // Reloads the current page
  };

  return (
    <header className={styles.headerContainer}>
      <h1 onClick={reloadPage} className={`${styles.clickableText} ${styles.wordmark} ${bebasNeue.className}`}>Cocktail Database</h1>
      <img src="/logo.png" alt="Logo" className={styles.logo} onClick={reloadPage} />
    </header>
  );
};

export default Header;
