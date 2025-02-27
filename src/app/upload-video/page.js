

"use client"
import React, { useEffect, useState } from 'react';
import UploadingVideo from './UploadingVideo'; 

const Page = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        }
        clearInterval(interval);
        return 100;
      });
    }, 500);
    return () => clearInterval(interval); 
  }, []);

  return (
    <div>
      <UploadingVideo progress={progress} />
    </div>
  );
};

export default Page;
