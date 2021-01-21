import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "975px",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "space-between",
  },
  left: {
    maxWidth: "614px",
    marginRight: theme.spacing(3),
  },
}));
