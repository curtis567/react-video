import React from "react";
import VideoItem from "./VideoItem";
import { youtubeContentDetails } from "../api/youtubeContentDetails";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getVideoContentDetail } from "../core/actions/videosActions";

interface VideoListProps {
  videos: Array<any>;
}

interface VideoListDispatchProps {
  getVideoContentDetail: (detail: any) => void;
}

function mapDispatchToProps(dispatch: Dispatch): VideoListDispatchProps {
  return {
    getVideoContentDetail: detail => dispatch(getVideoContentDetail(detail))
  };
}

type BaseComponentProps = VideoListProps & VideoListDispatchProps;

class VideoList extends React.Component<BaseComponentProps> {
  render() {
    const listOfVideos = this.props.videos.map((video, id) => {
      youtubeContentDetails(video.id.videoId, this.props.getVideoContentDetail);
      return <VideoItem key={id} video={video} TimeIndex={id} />;
    });
    return listOfVideos;
  }
}

export default connect<{}, VideoListDispatchProps>(
  null,
  mapDispatchToProps
)(VideoList);
