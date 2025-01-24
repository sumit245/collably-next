import React from 'react';
import styles from './UploadingVideo.module.css';

const UploadingVideo = ({ progress }) => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Uploading video...</h1>
        <div className={styles.progressBarWrapper}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={styles.progressText}>{progress}%</p>
      </div>
    </div>
  );
};

export default UploadingVideo;

