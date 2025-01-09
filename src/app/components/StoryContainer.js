'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../feed/stylesfeed.module.css';

const stories = [
    {
        username: "Arcane by Mayuri Isame",
        profile: [{ type: "image", url: "/images/product1.webp" }],
        media: [
            { type: "image", url: "/images/spotlight1.webp" },
            { type: "video", url: "/images/playback.mp4" }
        ]
    },
    {
        username: "Loca Slopa",
        profile: [{ type: "image", url: "/images/product2.webp" }],
        media: [
            { type: "image", url: "/images/spotlight2.webp" },
            { type: "image", url: "/images/main.mp4" }
        ]
    },
    {
        username: "Starchild by Krissann Barretto",
        profile: [{ type: "image", url: "/images/product3.webp" }],
        media: [
            { type: "image", url: "https://via.placeholder.com/1080x1920" },
            { type: "image", url: "https://via.placeholder.com/1080x1920" }
        ]
    },
    {
        username: "Vaishnavi",
        profile: [{ type: "image", url: "/images/product4.webp" }],
        media: [
            { type: "image", url: "https://via.placeholder.com/1080x1920" }
        ]
    }
];

const StoryViewer = () => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [progress, setProgress] = useState([]);

    const videoRef = useRef(null);
    const progressIntervalRef = useRef(null);

    useEffect(() => {
        if (isViewerOpen) {
            resetProgress();
        } else {
            clearInterval(progressIntervalRef.current);
        }
    }, [isViewerOpen, currentStoryIndex]);

    useEffect(() => {
        if (isViewerOpen) {
            if (stories[currentStoryIndex].media[currentMediaIndex].type === 'video') {
                videoRef.current.play();
            } else {
                startProgressBar(5000);
            }
        }
        return () => clearInterval(progressIntervalRef.current);
    }, [isViewerOpen, currentStoryIndex, currentMediaIndex]);

    const resetProgress = () => {
        setProgress(stories[currentStoryIndex].media.map(() => 0));
    };

    const startProgressBar = (duration) => {
        clearInterval(progressIntervalRef.current);
        const startTime = Date.now();
        progressIntervalRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = [...progress];
            newProgress[currentMediaIndex] = Math.min((elapsedTime / duration) * 100, 100);
            setProgress(newProgress);
            if (elapsedTime >= duration) {
                clearInterval(progressIntervalRef.current);
                nextMedia();
            }
        }, 10);
    };

    const openStory = (index) => {
        setCurrentStoryIndex(index);
        setCurrentMediaIndex(0);
        setIsViewerOpen(true);
    };

    const closeStory = () => {
        setIsViewerOpen(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const nextMedia = () => {
        const story = stories[currentStoryIndex];
        if (currentMediaIndex < story.media.length - 1) {
            setCurrentMediaIndex(currentMediaIndex + 1);
        } else {
            setCurrentStoryIndex((currentStoryIndex + 1) % stories.length);
            setCurrentMediaIndex(0);
        }
    };

    const prevMedia = () => {
        if (currentMediaIndex > 0) {
            setCurrentMediaIndex(currentMediaIndex - 1);
        } else {
            setCurrentStoryIndex((currentStoryIndex - 1 + stories.length) % stories.length);
            setCurrentMediaIndex(stories[currentStoryIndex].media.length - 1);
        }
    };

    const handleKeyDown = (e) => {
        if (isViewerOpen) {
            if (e.key === 'ArrowRight') nextMedia();
            if (e.key === 'ArrowLeft') prevMedia();
            if (e.key === 'Escape') closeStory();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isViewerOpen, currentStoryIndex, currentMediaIndex]);

    return (
        <div>
            <div className={styles.storyContainer}>
                {stories.map((story, index) => (
                    <div key={index} className={styles.storyItem} onClick={() => openStory(index)}>
                        <div 
                            className={styles.storyCover} 
                            style={{backgroundImage: `url(${story.profile[0].url})`}}
                        ></div>
                        <div className={styles.storyUsername}>{story.username}</div>
                    </div>
                ))}
            </div>

            {isViewerOpen && (
                <div className={styles.storyViewer} style={{display: 'block'}}>
                    <div className={styles.storyHeader}>
                        <div className={styles.profileInfo}>
                            <img 
                                className={styles.profilePic} 
                                src={stories[currentStoryIndex].profile[0].url} 
                                alt="Profile Picture"
                            />
                            <div className={styles.profileText}>
                                <div className={styles.profileUsername}>{stories[currentStoryIndex].username}</div>
                                <div className={styles.profileTime}>over 1 year ago</div>
                            </div>
                        </div>
                        <div className={styles.closeBtn} onClick={closeStory}>&times;</div>
                    </div>
                    <div className={styles.progressContainer}>
                        {progress.map((p, index) => (
                            <div key={index} className={styles.progressBar}>
                                <div className={styles.progress} style={{ width: `${p}%` }}></div>
                            </div>
                        ))}
                    </div>
                    {stories[currentStoryIndex].media[currentMediaIndex].type === 'image' ? (
                        <img 
                            className={styles.storyMedia} 
                            src={stories[currentStoryIndex].media[currentMediaIndex].url} 
                            alt="Story Image"
                        />
                    ) : (
                        <video 
                            className={styles.storyMedia} 
                            ref={videoRef}
                            src={stories[currentStoryIndex].media[currentMediaIndex].url}
                            onEnded={nextMedia}
                            onLoadedMetadata={() => startProgressBar(videoRef.current.duration * 1000)}
                        />
                    )}
                    <div className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevMedia}>&#10094;</div>
                    <div className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextMedia}>&#10095;</div>
                    <div className={styles.viewProduct}>View Product</div>
                </div>
            )}
        </div>
    );
};

export default StoryViewer;

