import React, { useRef, useState, useEffect } from 'react';
import videojs, { VideoJsPlayerOptions, VideoJsPlayer } from 'video.js';

type VideoPlayerProps = VideoJsPlayerOptions;

const VideoPlayer: React.FC<VideoPlayerProps> = (options) => {
  const videoNode = useRef(null);
  const [player, setPlayer] = useState<VideoJsPlayer | undefined>(undefined);

  const handlePlayerReady = () => console.log('Video Player Ready');
  useEffect(() => {
    setPlayer(videojs(videoNode.current, options, handlePlayerReady));
    return () => {
      player?.dispose();
    };
  }, [videoNode.current, options, player?.dispose]);

  return (
    <div className={'video-player'}>
      <div data-vjs-player>
        <video
          ref={videoNode}
          className="video-js vjs-big-play-centered"
        ></video>
      </div>
    </div>
  );
};
export default VideoPlayer;
