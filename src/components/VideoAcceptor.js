import React from "react";

import styles from "../my-style.module.css"

export class VideoAcceptor extends React.Component {
    render() {
      return (
        <div>
          <div className={styles.video2} id={"videoStream"}></div>
        </div>
      );
    }
  }