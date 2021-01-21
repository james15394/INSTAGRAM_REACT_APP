import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "84px",
      width: "100%",
      padding: theme.spacing(2, 0),
    },
    stories: {
      padding: theme.spacing(2),
      width: "100%",
      "& .slick-prev": {
        left: "5px",
        zIndex: "10",
        "&::before": {
          filter: "drop-shadow(-1px 2px 4px black)",
          fontSize: "25px",
        },
      },
      "& .slick-next": {
        right: "5px",
        "&::before": {
          filter: "drop-shadow(-1px 5px 6px black)",
          fontSize: "25px",
        },
      },
      "& .slick-slide": {
        width: "56px !important",
        height: "56px",
        margin: "0 3px",
        "& .MuiAvatar-root": {
          height: "100%",
        },
        "& img": {
          width: "56px",
          height: "56px",
        },
      },
    },
  })
);
