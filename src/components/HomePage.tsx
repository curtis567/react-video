import React from "react";
import styled from "styled-components";
import { VideoList, VideoPagination } from "../components";
import { connect } from "react-redux";
import { youTubeSearch } from "../api/youTubeSearch";
import { Dispatch } from "redux";
import { getVideoList, getVideoPageToken } from "../core/actions/videosActions";
import { FlexRow } from "../common";

interface HomePageProps {}

interface HomePageState {
  selectedVideo: any;
}

interface HomePageStateProps {
  videos: Array<any>;
}

interface HomePageDispatchProps {
  getVideoList: (video: any) => void;
  getVideoPageToken: (pageToken: any) => void;
}

function mapStateToProps(state: any): HomePageStateProps {
  return {
    videos: state.videosCalculator
  };
}

function mapDispatchToProps(dispatch: Dispatch): HomePageDispatchProps {
  return {
    getVideoList: videos => dispatch(getVideoList(videos)),
    getVideoPageToken: pageToken => dispatch(getVideoPageToken(pageToken))
  };
}

type BaseComponentProps = HomePageProps &
  HomePageStateProps &
  HomePageDispatchProps;

class HomePage extends React.Component<BaseComponentProps, HomePageState> {
  state = {
    selectedVideo: null
  };

  public async componentDidMount() {
    const { getVideoList, getVideoPageToken } = this.props;
    youTubeSearch(null, getVideoList, getVideoPageToken);
    localStorage.clear();
  }

  render() {
    const { videos } = this.props;
    return (
      <VideosWrapper>
        <VideoContentWrapper>
          <VideoListWrapper>
            <VideoList videos={videos}></VideoList>
          </VideoListWrapper>
        </VideoContentWrapper>
        <VideoPaginationWrapper>
          {videos.length > 0 ? <VideoPagination /> : null}
        </VideoPaginationWrapper>
        <VideoFooterWrapper>&copy; copyright 2020 by curtis</VideoFooterWrapper>
      </VideosWrapper>
    );
  }
}

export default connect<HomePageStateProps, HomePageDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

const VideosWrapper = styled.div`
  position: relative;
  * > img {
    vertical-align: bottom;
  }
`;

const VideoContentWrapper = styled.div``;

const VideoPaginationWrapper = styled(FlexRow)`
  justify-content: center;
  margin-bottom: 10px;
`;

const VideoFooterWrapper = styled.div`
  background: #333;
  color: #aaa;
  text-align: center;
  padding: 10px 0;
`;

const VideoListWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: auto;
  @media (min-width: 768px) {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    > div {
      max-width: 20%;
      max-height: 20%;
      > div {
        > h3 {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
  @media (min-width: 980px) {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    > div {
      max-width: 20%;
      max-height: 20%;
    }
  }
`;
