import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiIconButton-root": {
      padding: theme.spacing(2),
    },
  },
}));
