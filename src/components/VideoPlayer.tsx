import React from "react";

interface VideoPlayerProps {
  videoid: string;
}

class VideoPlayer extends React.Component<VideoPlayerProps> {
  render() {
    const { videoid } = this.props;
    const videoSrc = `https://www.youtube.com/embed/${videoid}`;
    return (
      <div>
        <iframe
          frameBorder="0"
          height="300"
          width="100%"
          title="Video Player"
          src={videoSrc}
          allowFullScreen
        />
      </div>
    );
  }
}

export default VideoPlayer;
