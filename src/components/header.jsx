import React from "react";
import { AppBar, Toolbar, Grid, Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import logo from './prasanthi.jpeg'
export const Header = () => {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
        <a href="/">
            <img
              src={logo}
              height="50"
              width="50"
              style={{ borderRadius: "50%" }}
            />
          </a>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <ButtonGroup>
              <Button variant="contained" component={Link} to="/">
                Signup
              </Button>&nbsp;&nbsp;
              <Button variant="contained" component={Link} to="/signin">
                Signin
              </Button>&nbsp;&nbsp;
              <Button variant="contained" component={Link} to="/upload">
                Upload
              </Button>&nbsp;&nbsp;
              <Button variant="contained" component={Link} to="/logout">
                Signout
              </Button>&nbsp;&nbsp;
            </ButtonGroup>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};