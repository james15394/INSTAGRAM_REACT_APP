import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fff",
    top: 0,
    left: 0,
    boxShadow: "none",
    borderBottom: "1px solid rgba(var(--b6a,219,219,219),1)",
  },
  container: { width: "975px", margin: "auto" },
  logo: { flex: 1, justifyContent: "flex-start" },
  search: {
    background: "rgba(var(--b3f,250,250,250),1)",
    border: "0.5px solid rgba(var(--b6a,219,219,219),1)",
    borderRadius: "3px",
    height: "28px",
    width: "200px",
    marginRight: theme.spacing(2),
    display: "flex",
    position: "relative",
  },

  inputRoot: { color: "rgba(var(--b6a,219,219,219),1)" },
  inputInput: {
    position: "relative",
    paddingLeft: "80px",
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: "0.9rem",
    transition: "all 0.3s ease",
    background:
      "url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-256.png)",
    backgroundSize: "16px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "62px 9px",
    "&::placeholder": {
      color: "rgba(var(--i1d,38,38,38),1)",
    },
    "&:focus": {
      paddingLeft: "25px",
      backgroundPosition: "5px",
    },
  },
  trash: { display: "none" },
  rightHeader: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    "& .MuiSvgIcon-root": { color: "#000" },
    "& .MuiIconButton-root": { backgroundColor: "transparent" },
  },
}));
