import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { youTubeSearch } from "../api/youTubeSearch";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  getVideoList,
  getVideoSearchItem,
  getVideoPageToken
} from "../core/actions/videosActions";
import { VideoDetail } from "../core/types/Video";

interface SearchBarStateProps {
  searchItem: string;
}

interface SearchBarDispatchProps {
  getVideoList: (video: VideoDetail) => void;
  searchItemCalculator: (item: string) => void;
  getVideoPageToken: (pageToken: any) => void;
}

function mapStateToProps(state: any): SearchBarStateProps {
  return {
    searchItem: state.searchItemCalculator
  };
}

function mapDispatchToProps(dispatch: Dispatch): SearchBarDispatchProps {
  return {
    getVideoList: videos => dispatch(getVideoList(videos)),
    searchItemCalculator: item => dispatch(getVideoSearchItem(item)),
    getVideoPageToken: pageToken => dispatch(getVideoPageToken(pageToken))
  };
}

type BaseComponentProps = SearchBarStateProps & SearchBarDispatchProps;

class SearchBar extends React.Component<BaseComponentProps> {
  handleChange = (event: any) => {
    this.props.searchItemCalculator(event.target.value);
  };

  onPress = (event: any) => {
    const { searchItem, getVideoList, getVideoPageToken } = this.props;
    if (event.key === "Enter") {
      youTubeSearch(searchItem, getVideoList, getVideoPageToken);
    }
  };

  handleSubmit = (event: any) => {
    const { searchItem, getVideoList, getVideoPageToken } = this.props;
    youTubeSearch(searchItem, getVideoList, getVideoPageToken);
    event.preventDefault();
  };

  render() {
    return (
      <SearchBarWrapper>
        <SearchBarInput
          placeholder="Search.."
          onChange={this.handleChange}
          onKeyPress={this.onPress}
        ></SearchBarInput>
        <SearchBarButton onClick={this.handleSubmit}>
          <FaSearch />
        </SearchBarButton>
      </SearchBarWrapper>
    );
  }
}
export default connect<SearchBarStateProps, SearchBarDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

const SearchBarWrapper = styled.div``;

const SearchBarInput = styled.input`
  padding: 6px;
  font-size: 16px;
  border-color: rgb(0, 0, 0, 0.1);
  border-style: solid;
  max-height: 34px;
  border-radius: 5px 0px 0px 5px;
`;

const SearchBarButton = styled.button`
  padding: 6px;
  background: rgb(229, 229, 229);
  font-size: 17px;
  cursor: pointer;
  border-color: rgb(229, 229, 229);
  border-style: solid;
  outline-color: transparent;
  color: rgb(0, 0, 0, 0.4);
  max-height: 34px;
  border-radius: 0px 5px 5px 0px;
  &:hover {
    background: #ccc;
    border-color: #ccc;
    color: rgb(0, 0, 0, 0.6);
  }
  &:active {
    outline-color: rgb(255, 255, 255, 0);
    background: rgb(0, 0, 0, 0.3);
    border-color: rgb(0, 0, 0, 0.05);
    color: rgb(0, 0, 0, 1);
  }
`;
