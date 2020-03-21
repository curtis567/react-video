import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { convertToSeconds } from "../common";
import { Dispatch } from "redux";
import {
  clearVideoContentDetail,
  updateLocalStorageId,
  deleteLocalStorageId
} from "../core/actions/videosActions";
import { FaServer, FaCheck } from "react-icons/fa";
import { VideoPlayer } from "../components";
import { Modal } from "react-bootstrap";
import { VideoDetail } from "../core/types/Video";

interface VideoItemProps {
  video: VideoDetail;
  TimeIndex: number;
}

interface VideoItemState {
  IsJoined: boolean;
  modalShow: boolean;
}

interface VideoItemStateProps {
  videosDetail: Array<VideoDetail>;
}

interface VideoItemDispatchProps {
  clearVideoDetail: () => void;
  updateLocalStorageId: (id: string) => void;
  deleteLocalStorageId: (id: string) => void;
}

function mapStateToProps(state: any): VideoItemStateProps {
  return {
    videosDetail: state.videosContentDetailsCalculator
  };
}

function mapDispatchToProps(dispatch: Dispatch): VideoItemDispatchProps {
  return {
    clearVideoDetail: () => dispatch(clearVideoContentDetail()),
    updateLocalStorageId: id => dispatch(updateLocalStorageId(id)),
    deleteLocalStorageId: id => dispatch(deleteLocalStorageId(id))
  };
}

function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.videoTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VideoPlayer videoid={props.videoid} />
      </Modal.Body>
    </Modal>
  );
}

type BaseComponentProps = VideoItemProps &
  VideoItemStateProps &
  VideoItemDispatchProps;

class VideoItem extends React.Component<BaseComponentProps, VideoItemState> {
  state = {
    IsJoined: false,
    modalShow: false
  };
  public element: any;

  TextFit = () => {
    if (!this.element) return false;
    if (!this.element.current) return false;
    return this.element.current.scrollWidth <= this.element.current.offsetWidth;
  };

  SaveVideo = (video: VideoDetail) => {
    const { updateLocalStorageId, deleteLocalStorageId } = this.props;
    const result = JSON.parse(localStorage.getItem(video.id.videoId) || "{}");
    if (JSON.stringify(result) === JSON.stringify({})) {
      localStorage.setItem(
        video.id.videoId,
        JSON.stringify({ video, IsJoined: true })
      );
      this.setState({ IsJoined: true });
      updateLocalStorageId(video.id.videoId);
    } else {
      localStorage.removeItem(video.id.videoId);
      this.setState({ IsJoined: false });
      deleteLocalStorageId(video.id.videoId);
    }
  };

  public componentDidMount() {
    const { video } = this.props;
    const result = JSON.parse(
      localStorage.getItem(video ? video.id.videoId : "") || "{}"
    );
    if (JSON.stringify(result) !== JSON.stringify({})) {
      this.setState({ IsJoined: result.IsJoined });
    }
  }

  public componentDidUpdate(prevProps: any) {
    const { video, clearVideoDetail } = this.props;
    if (prevProps.video !== video) {
      clearVideoDetail();
      const result = JSON.parse(localStorage.getItem(video.id.videoId) || "{}");
      if (result !== "{}") {
        this.setState({ IsJoined: result.IsJoined });
      }
    }
  }

  render() {
    const { video, TimeIndex, videosDetail } = this.props;
    return video ? (
      <VideoItemWrapper>
        <VideoItemTop>
          <FavoriteIcon onClick={() => this.SaveVideo(video)}>
            {this.state.IsJoined ? <FaCheck /> : <FaServer />}
          </FavoriteIcon>
          <VideoItemImage
            src={video.snippet.thumbnails.medium.url}
            onClick={() => this.setState({ modalShow: true })}
          ></VideoItemImage>
          <VideoTime>{convertToSeconds(videosDetail[TimeIndex])}</VideoTime>
        </VideoItemTop>
        <VideoItemContent>
          <h3
            ref={this.element}
            title={this.TextFit() ? "" : video.snippet.title}
          >
            {video.snippet.title}
          </h3>
          <p
            ref={this.element}
            title={this.TextFit() ? "" : video.snippet.description}
          >
            {video.snippet.description}
          </p>
        </VideoItemContent>
        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          videoTitle={video.snippet.title}
          videoid={video.id.videoId}
        ></MyVerticallyCenteredModal>
      </VideoItemWrapper>
    ) : (
      <div />
    );
  }
}

export default connect<VideoItemStateProps, VideoItemDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(VideoItem);

const VideoItemWrapper = styled.div`
  margin: 10px 20px 30px;
`;

const VideoItemContent = styled.div`
  margin: 10px 20px 20px;
  > h3 {
    text-align: center;
    font-size: 1.4rem;
    margin-bottom: 10px;
  }
  > p {
    text-align: center;
    font-size: 1.2rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const FavoriteIcon = styled.div`
  position: absolute;
  display: none;
  top: 5px;
  right: 5px;
  font-size: 1.2rem;
  padding: 4px 8px;
  background: #000;
  color: #ddd;
`;

const VideoTime = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 1.2rem;
  padding: 2px 8px;
  background: #000;
  color: #ddd;
`;

const VideoItemImage = styled.img`
  width: 100%;
`;

const VideoItemTop = styled.div`
  position: relative;
  &:hover {
    & > ${FavoriteIcon} {
      display: block;
    }
  }
`;
