import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { data } from "./followData";
import { Wrapper } from "./SideBar.styles";

const SideBar = () => {
  return (
    <Wrapper>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justify="space-between"
        style={{ marginBottom: "20px" }}
      >
        <Grid item>
          <Avatar />
        </Grid>
        <Grid direction="column" item style={{ flex: 1 }}>
          <Grid item>
            <Typography variant="subtitle1">jarahealth</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" style={{ color: "#BDBDBD" }}>
              JaraHealth
            </Typography>
          </Grid>
        </Grid>
        <Grid item style={{ color: "#5a5ed5", fontSize: "12px" }}>
          Switch
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="subtitle1">Suggestions for you</Typography>
        </Grid>
        <Grid item style={{ padding: 0 }}>
          <Button
            disableRipple
            style={{
              background: "transparent",
              fontSize: "12px",
              textTransform: "capitalize",
              padding: 0,
            }}
          >
            See all
          </Button>
        </Grid>
      </Grid>
      <Grid item direction="column" spacing={2}>
        {data.map((x) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Avatar sizes="6px 6px" />
            </Grid>
            <Grid direction="column" item style={{ flex: 1 }}>
              <Grid item>
                <Typography variant="subtitle1">{x.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" style={{ color: "#BDBDBD" }}>
                  Followed by {x.followed}
                </Typography>
              </Grid>
            </Grid>
            <Grid item style={{ color: "#5a5ed5", fontSize: "12px" }}>
              Follow
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default SideBar;
