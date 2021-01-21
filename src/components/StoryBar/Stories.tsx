import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Avatar, Paper } from "@material-ui/core";
import { useStyles } from "./Stories.styles";
import { images } from "./data";

const Stories = () => {
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };
  return (
    <div className={classes.root}>
      <Paper>
        <Slider {...settings} className={classes.stories}>
          {images.map((image) => (
            <Avatar src={image} />
          ))}
        </Slider>
      </Paper>
    </div>
  );
};

export default Stories;
