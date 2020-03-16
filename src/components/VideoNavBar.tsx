import React from "react";
import styled from "styled-components";
import { VideoHeader } from "../components";
import { Link } from "react-router-dom";
import { rootPath } from "../routes";

interface VideoNavBarStates {
  IsShowMenu: boolean;
}

class VideoNavBar extends React.Component<{}, VideoNavBarStates> {
  state = {
    IsShowMenu: false
  };

  showMenu = () => {
    const { IsShowMenu } = this.state;
    this.setState({
      IsShowMenu: !IsShowMenu
    });
  };

  render() {
    const { IsShowMenu } = this.state;
    return (
      <VideoNavBarWrapper IsShowMenu={IsShowMenu}>
        <VideoHeader />
        <MenuControl onClick={this.showMenu} />
        <nav>
          <Link to={`${rootPath}/`}>Home</Link>
          <Link to={`${rootPath}/Favorite`}>Favorite</Link>
        </nav>
      </VideoNavBarWrapper>
    );
  }
}

export default VideoNavBar;

const MenuControl = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 5px;
  right: 10px;
  &::before {
    content: "";
    position: absolute;
    height: 3px;
    left: 2px;
    width: 30px;
    background: #404040;
    top: 0;
    bottom: 0;
    margin: auto;
    box-shadow: 0 8px 0 #404040, 0 -8px 0 #404040;
  }
`;

const VideoNavBarWrapper = styled.div`
  height: 50px;
  position: relative;
  z-index: 10;
  & > nav {
    width: 50%;
    height: calc(100vh - 50px);
    background: #fff;
    position: absolute;
    top: 50px;
    left: ${(props: VideoNavBarStates) => (props.IsShowMenu ? "0" : "-100%")};
    transition: 0.5s;
    & > a {
      display: block;
      color: #000;
      text-decoration: none;
      padding: 10px 20px;
      &:hover {
        border-bottom: 1px solid #000;
        background: rgb(51, 51, 51, 0.6);
      }
    }
  }
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > nav {
      display: flex;
      position: relative;
      left: 0;
      top: 0;
      width: auto;
      height: auto;
      background: transparent;
      transition: none;
    }
    & > ${MenuControl} {
      display: none;
    }
  }
`;
