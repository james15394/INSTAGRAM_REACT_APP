import React from "react";
import Post from "../../components/Posts/Post";
import Stories from "../../components/StoryBar/Stories";
import SideBar from "../../components/SiderBar/SideBar";

import { useStyles } from "./NewFeed.styles";

const NewFeed = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Stories />
        <Post />
      </div>
      <SideBar />
    </div>
  );
};

export default NewFeed;
