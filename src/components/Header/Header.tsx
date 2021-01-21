import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonBase,
  IconButton,
  InputBase,
  Popover,
  Toolbar,
} from "@material-ui/core";
import React from "react";
import LogoSmall from "../../assets/images/logo.png";
import { useStyles } from "./Header.styles";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";
import ExploreIcon from "@material-ui/icons/Explore";
import DeleteIcon from "@material-ui/icons/Delete";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const logOut = () => {
    auth.signOut();

    history.push("/login");
  };

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.container}>
        <ButtonBase className={classes.logo}>
          <img src={LogoSmall} alt="instagramLogo" />
        </ButtonBase>

        <div className={classes.search}>
          <InputBase
            placeholder="Search"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />

          <IconButton className={classes.trash}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={classes.rightHeader}>
          <IconButton disableRipple>
            <HomeIcon />
          </IconButton>
          <IconButton disableRipple>
            <SendIcon />
          </IconButton>
          <IconButton disableRipple>
            <ExploreIcon />
          </IconButton>
          <PopupState variant="popover" popupId="avatar-popup-popover">
            {(popupState) => (
              <div>
                <IconButton
                  {...bindTrigger(popupState)}
                  disableRipple
                  style={{ paddingRight: 0 }}
                >
                  <Avatar />
                </IconButton>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box>
                    <Button onClick={logOut}>Log out</Button>
                  </Box>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
