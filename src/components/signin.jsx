import { Container, Box, Grid, Button } from "@mui/material";
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReusableTextField } from "./reusabletext";
import "../App.css";
const axios = require("axios");
export const Signin = () => {
    const [user, setUsers] = useState({
     
      email: "",
      pass: "",
     
    });
    const [err, setErr] = useState(0);
   
  
    let history = useNavigate();
  
    const validataion = () => {
      setErr(0);
     if (!user.email.includes("@")) {
        setErr(1);
        alert("please enter email");
      }  else if (user.pass < 6) {
        setErr(2);
        alert("please enter password");
      } else {
        const formdata = new FormData();
       
        formdata.append("email", user.email);
        
        formdata.append("password", user.pass);
        
        console.log(formdata);
        axios.post("/signin", formdata).then(function (res) {
          if (res.data.status === true) {
           
           history('/msg')
          } else {
            console.log(res.status);
            alert(res.data.msg);
          }
          console.log(res.data);
        });
      }
    };
   
    const onChangeValue = (e) => {
      setUsers({ ...user, [e.target.name]: e.target.value });
    };
  
    return (
      <div>
        <Container maxWidth="sm">
          <Box m={10} p={8} sx={{ backgroundColor: "aliceblue" }}>
            <h1>Signup Form</h1>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
            >
             
              <Grid item>
                <ReusableTextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  val={user.email}
                  change={onChangeValue}
                  error={err === 1 && true}
                />
              </Grid>
           
              <Grid item>
                <ReusableTextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="pass"
                  val={user.pass}
                  change={onChangeValue}
                  error={err === 2 && true}
                />
              </Grid>
       
              <Grid item>
                <Button variant="contained" onClick={validataion}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    );
  };
  