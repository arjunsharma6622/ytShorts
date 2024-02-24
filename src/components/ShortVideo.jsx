import React, { useEffect, useRef, useState } from "react";
import {
  FiPause,
  FiPlay,
} from "react-icons/fi";
import { TbDotsVertical } from "react-icons/tb";
import {
  BiSolidDislike,
  BiSolidLike,
  BiSolidMessage,
  BiSolidMusic,
  BiSolidShare,
  BiSolidVolumeFull,
  BiSolidVolumeMute,
} from "react-icons/bi";

const ShortVideo = ({ url }) => {
  const vidRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playPause, setPlayPause] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [muted, setMuted] = useState(true);

  const handlePlayPause = () => {
    console.log("enterred here");
    const video = vidRef.current;
    console.log(video);
    if (video) {
      console.log("there is a video");
      if (isPlaying) {
        video.pause();
        setPlayPause("paused");
        console.log("video is paused");
      } else {
        video.play();
        setPlayPause("playing");
        console.log("video is playing");
      }

      setTimeout(() => {
        setPlayPause(null);
      }, 500);

      setIsPlaying(!isPlaying);
    }
  };

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
      video.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

// play video when in view, using intersection observer
  useEffect(() => {
    const video = vidRef.current;
    if (video) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      });
      observer.observe(video);
    }

  }, []);

  const handleMute = () => {
    const video = vidRef.current;
    if (video) {
      if (video.muted) {
        video.muted = false;
        setMuted(false);
      } else {
        video.muted = true;
        setMuted(true);
      }
    }
  };

  return (
    <div className="short-video-wrapper">
      <div className="short-video">
        <video
          src={url}
          className="vid"
          ref={vidRef}
          loop={true}
          onClick={handlePlayPause}
          preload="auto"
          muted={true}
        ></video>

        <div className="gradient-top"></div>

        <div className="gradient-bottom"></div>

        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className={`play-icon-outer ${playPause ? "hidden" : ""}`}>
          {playPause === "paused" && (
            <FiPlay className="play-icon" onClick={handlePlayPause} />
          )}
          {playPause === "playing" && (
            <FiPause className="play-icon" onClick={handlePlayPause} />
          )}
        </div>

        <div className="controls">
          <div className="controls-1">
            {!isPlaying ? (
              <FiPlay className="" onClick={handlePlayPause} />
            ) : (
              <FiPause className="" onClick={handlePlayPause} />
            )}
          </div>
          <div className="controls-2">
            {!muted ? (
              <BiSolidVolumeFull onClick={handleMute} />
            ) : (
              <BiSolidVolumeMute onClick={handleMute} />
            )}
          </div>
        </div>

        <div className="short-video-links">
          <div className="link-wrapper">
            <div
              className="link-icon-outer"
              onClick={() => {
                setLiked(!liked);
                setDisliked(false);
              }}
              style={{ backgroundColor: liked ? "white" : "" }}
            >
              <BiSolidLike
                className="link-icon"
                style={{ color: liked ? "black" : "white" }}
              />
            </div>
            <span>{!liked ? "Like" : "1 Like"}</span>
          </div>

          <div className="link-wrapper">
            <div
              className="link-icon-outer"
              onClick={() => {
                setDisliked(!disliked);
                setLiked(false);
              }}
              style={{ backgroundColor: !disliked ? "" : "white" }}
            >
              <BiSolidDislike
                className="link-icon"
                style={{ color: !disliked ? "white" : "black" }}
              />
            </div>
            <span>Dislike</span>
          </div>

          <div className="link-wrapper">
            <div className="link-icon-outer">
              <BiSolidMessage className="link-icon" />
            </div>
            <span>2,400</span>
          </div>

          <div className="link-wrapper">
            <div className="link-icon-outer">
              <BiSolidShare className="link-icon" />
            </div>
            <span>Share</span>
          </div>

          <div className="link-icon-outer">
            <TbDotsVertical className="link-icon" />
          </div>

          <div className="link-icon-outer">
            <BiSolidMusic
              className="link-icon"
              style={{
                animation: `${isPlaying ? "spin 4s linear infinite" : ""}`,
                transform: "rotate(360deg)",
                transformOrigin: "center center",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortVideo;
