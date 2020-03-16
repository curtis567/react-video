import React from "react";
import styled from "styled-components";
// import { SearchBar } from "../components";

class VideoHeader extends React.Component {
  render() {
    return (
      <VideoHeaderWrapper>
        <VideoSearchWrapper>
          {/* TODO　SearchBar */}
          {/* <SearchBar /> */}
        </VideoSearchWrapper>
      </VideoHeaderWrapper>
    );
  }
}

export default VideoHeader;

const VideoHeaderWrapper = styled.div`
  margin-left: 10px;
  padding-top: 7px;
  @media (min-width: 768px) {
    width: 100%;
    padding-top: 0;
    margin-left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const VideoSearchWrapper = styled.div``;
