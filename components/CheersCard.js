import React from 'react';
import styles from '../styles/CheersCard.module.css';

const CheersCard = ({ cheersText }) => {
  if (!cheersText) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.cheersCard}>
      <p>{cheersText}</p>
    </div>
  );
};

export default CheersCard;