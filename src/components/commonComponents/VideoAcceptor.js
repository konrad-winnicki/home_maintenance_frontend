import React from "react";

import "./VideoAcceptor.css";

export class VideoAcceptor extends React.Component {
    render() {
      return (
          <div className={'video_container'} id={"videoStream"}></div>
      );
    }
  }