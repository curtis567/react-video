import React from "react";
import { youTubeSearch } from "../api/youTubeSearch";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getVideoList, getVideoPageToken } from "../core/actions/videosActions";
import { Pagination } from "react-bootstrap";

interface VideoPaginationState {
  paginationNumber: number;
}

interface VideoPaginationStateProps {
  videos: Array<any>;
  searchItem: any;
  pageToken: any;
}

interface VideoPaginationDispatchProps {
  getVideoList: (video: any) => void;
  getVideoPageToken: (pageToken: any) => void;
}

function mapStateToProps(state: any): VideoPaginationStateProps {
  return {
    videos: state.videosCalculator,
    searchItem: state.searchItemCalculator,
    pageToken: state.pageTokenCalculator
  };
}

function mapDispatchToProps(dispatch: Dispatch): VideoPaginationDispatchProps {
  return {
    getVideoList: videos => dispatch(getVideoList(videos)),
    getVideoPageToken: pageToken => dispatch(getVideoPageToken(pageToken))
  };
}

const PaginationList = [
  "CAAQAA",
  "CAwQAA",
  "CBgQAA",
  "CCQQAA",
  "CDAQAA",
  "CDwQAA",
  "CEgQAA",
  "CFQQAA",
  "CGAQAA"
];

type BaseComponentProps = VideoPaginationStateProps &
  VideoPaginationDispatchProps;

class VideoPagination extends React.Component<
  BaseComponentProps,
  VideoPaginationState
> {
  state = {
    paginationNumber: 1
  };

  handleFirst = () => {
    const { searchItem, getVideoList, getVideoPageToken } = this.props;
    youTubeSearch(searchItem, getVideoList, getVideoPageToken, "CAAQAA", "");
    this.setState({
      paginationNumber: 1
    });
  };

  handlePrev = () => {
    const {
      searchItem,
      getVideoList,
      getVideoPageToken,
      pageToken
    } = this.props;

    youTubeSearch(
      searchItem,
      getVideoList,
      getVideoPageToken,
      pageToken.prevPageToken,
      ""
    );

    this.setState({
      paginationNumber:
        this.state.paginationNumber > 1
          ? this.state.paginationNumber - 1
          : this.state.paginationNumber
    });
  };

  handleNext = () => {
    const {
      searchItem,
      getVideoList,
      getVideoPageToken,
      pageToken
    } = this.props;

    if (this.state.paginationNumber < 9) {
      youTubeSearch(
        searchItem,
        getVideoList,
        getVideoPageToken,
        "",
        pageToken.nextPageToken
      );
    }

    this.setState({
      paginationNumber:
        this.state.paginationNumber < 9
          ? this.state.paginationNumber + 1
          : this.state.paginationNumber
    });
  };

  handleLast = () => {
    const { searchItem, getVideoList, getVideoPageToken } = this.props;

    youTubeSearch(searchItem, getVideoList, getVideoPageToken, "", "CGAQAA");

    this.setState({
      paginationNumber: 9
    });
  };

  handlePagination = (Token: string, page: number) => {
    const { searchItem, getVideoList, getVideoPageToken } = this.props;

    this.setState({
      paginationNumber: page
    });

    youTubeSearch(searchItem, getVideoList, getVideoPageToken, "", Token);
  };

  PaginationActive = (itemNumber: number) => {
    const { paginationNumber } = this.state;
    return itemNumber === paginationNumber ? true : false;
  };

  render() {
    return (
      <Pagination>
        <Pagination.First onClick={this.handleFirst} />
        <Pagination.Prev onClick={this.handlePrev} />
        {PaginationList.map((item, number) => {
          return (
            <Pagination.Item
              key={number}
              active={this.PaginationActive(number + 1)}
              onClick={() => {
                this.handlePagination(item, number + 1);
              }}
            >
              {number + 1}
            </Pagination.Item>
          );
        })}
        <Pagination.Next onClick={this.handleNext} />
        <Pagination.Last onClick={this.handleLast} />
      </Pagination>
    );
  }
}

export default connect<VideoPaginationStateProps, VideoPaginationDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(VideoPagination);
