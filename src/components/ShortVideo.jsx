import React, { useEffect, useRef, useState } from 'react'
import {FiHeadphones, FiMessageCircle, FiMessageSquare, FiMusic, FiPause, FiPauseCircle, FiPlay, FiPlayCircle, FiShare2, FiThumbsDown, FiThumbsUp} from 'react-icons/fi'
import { TbDotsVertical } from "react-icons/tb";

const ShortVideo = ({url}) => {
  const vidRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [playPause, setPlayPause] = useState(null)

  const handlePlayPause = () => {
    console.log('enterred here')
    const video = vidRef.current
    console.log(video)
    if(video){
      console.log('there is a video')
      if(isPlaying){
        video.pause()
        setPlayPause('paused')
        console.log('video is paused')
      } else {
        video.play()
        setPlayPause('playing')
        console.log('video is playing')
        
      }

      setTimeout(() => {
        setPlayPause(null);
      }, 500);
      
      setIsPlaying(!isPlaying)
    }
  }

  const updateProgress = () => {
    const video = vidRef.current;

    if (video) {
      const progressPercent = (video.currentTime / video.duration) * 100;
      setProgress(progressPercent);
    }
  };

  useEffect(() => {
    const video = vidRef.current;

    if (video) {
      video.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);


  return (
    <div className='short-video-wrapper'>
        <div className='short-video'>
            <video src={url} className='vid' ref={vidRef} loop={true} onClick={handlePlayPause}></video>

            <div className='progress-bar'>
            <div className='progress' style={{ width: `${progress}%` }}></div>
            </div>
            <div className={`play-icon-outer ${playPause ? 'hidden' : ''}`}>
          {playPause === 'paused' && (
            <FiPlay className='play-icon' onClick={handlePlayPause} />
          )}
          {playPause === 'playing' && (
            <FiPause className='play-icon' onClick={handlePlayPause} />
          )}
        </div>


            <div className='short-video-links'>
            <div className='link-icon-outer'>
            <FiThumbsUp className='link-icon'/>
            </div>
            <div className='link-icon-outer'>
            <FiThumbsDown className='link-icon'/>
            </div>
            <div className='link-icon-outer'>
            <FiMessageSquare className='link-icon'/>
            </div>
            <div className='link-icon-outer'>
            <FiShare2 className='link-icon'/>
            </div>
            <div className='link-icon-outer'>
            <TbDotsVertical className='link-icon'/>
            </div>
            <div className='link-icon-outer'>
            <FiHeadphones className='link-icon' style={{animation : `${isPlaying ? "spin 4s linear infinite" : ""}`, transform: "rotate(360deg)", transformOrigin: "center center" }}/>
            </div>
            </div>
        </div>

    </div>
  )
}

export default ShortVideo