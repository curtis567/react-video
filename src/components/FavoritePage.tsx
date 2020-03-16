import React from "react";
import styled from "styled-components";
import { VideoItem } from "../components";
import { FlexRow } from "../common";
import { youtubeContentDetails } from "../api/youtubeContentDetails";
import { getVideoContentDetail } from "../core/actions/videosActions";
import { Dispatch } from "redux";
import { connect } from "react-redux";

interface FavoritePageProps {}

interface FavoritePageState {
  localStorageDate: Array<any>;
}

interface FavoritePageDispatchProps {
  getVideoContentDetail: (detail: any) => void;
}

type BaseComponentProps = FavoritePageProps & FavoritePageDispatchProps;

function mapDispatchToProps(dispatch: Dispatch): FavoritePageDispatchProps {
  return {
    getVideoContentDetail: detail => dispatch(getVideoContentDetail(detail))
  };
}

class FavoritePage extends React.Component<
  BaseComponentProps,
  FavoritePageState
> {
  state = {
    localStorageDate: []
  };

  public componentWillMount() {
    if (localStorage.length > 0) {
      const result = JSON.parse(localStorage.getItem("localStorageId") || "{}");
      this.setState({ localStorageDate: result.newItems });
    }
  }

  render() {
    const { localStorageDate } = this.state;
    return (
      <VideosWrapper>
        <VideoContentWrapper>
          <VideoListWrapper>
            {localStorageDate && localStorageDate.length > 0 ? (
              localStorageDate.map((videoID, index) => {
                const localStorageResult = JSON.parse(
                  localStorage.getItem(videoID) || "{}"
                );
                youtubeContentDetails(
                  videoID,
                  this.props.getVideoContentDetail
                );
                return (
                  <VideoItem
                    key={index}
                    video={localStorageResult.video}
                    TimeIndex={index}
                  />
                );
              })
            ) : (
              <NoVideoItem>
                <p>No favorite videos</p>
              </NoVideoItem>
            )}
          </VideoListWrapper>
        </VideoContentWrapper>
      </VideosWrapper>
    );
  }
}

export default connect<{}, FavoritePageDispatchProps>(
  null,
  mapDispatchToProps
)(FavoritePage);

const VideosWrapper = styled.div`
  * > img {
    vertical-align: bottom;
  }
`;

const VideoContentWrapper = styled.div``;

const VideoListWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: auto;
  @media (min-width: 768px) and (max-width: 980px) {
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

const NoVideoItem = styled(FlexRow)`
  height: 90vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  white-space: nowrap;
`;
