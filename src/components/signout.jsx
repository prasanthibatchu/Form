import React from "react";
import {Container,Box, Grid, Button } from "@mui/material";

export const Signout = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Box m={10} p={8} sx={{ backgroundColor: "aliceblue" }}>
          <h1>Signout</h1>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
                <Button variant="contained"><a href="/signin" style={{textDecoration:"none",color:"white"}}>signout</a></Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};