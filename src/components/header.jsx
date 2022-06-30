import React from "react";
import { AppBar, Toolbar, Grid, Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
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