// page.js

"use client"
import React, { useEffect, useState } from 'react';
import UploadingVideo from './UploadingVideo'; // Adjust path as necessary

const Page = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        }
        clearInterval(interval);
        return 100; // Stop the progress at 100%
      });
    }, 500); // Progress increases by 10% every 500ms

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div>
      <UploadingVideo progress={progress} />
    </div>
  );
};

export default Page;
