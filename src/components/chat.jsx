import React, { useState } from "react";
import { Container, Box, Grid, TextField, Button } from "@mui/material";

export const Chatpage = () => {
  const [msg,setMsg]=useState("")
  const onSendMsg=(e)=>{
    e.preventDefault()
    setMsg({...msg,[e.target.name]:e.target.value})
  }
  return (
    <div>
      
      <Container maxWidth="sm">
        <Box m={10} p={8} sx={{ backgroundColor: "aliceblue" }}>
        <h1>Chat Page</h1>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
                <TextField multiline
        rows={4} label="enter message" />
            </Grid>
            <Grid item>
            <Button variant="contained" onClick={onSendMsg}>send</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};