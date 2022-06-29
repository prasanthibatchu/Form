import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button, TextField } from "@mui/material";
import { useParams } from 'react-router-dom'

import {ReusableTextField} from './reusabletext'

const axios = require('axios');

export const Edit = () => {
  let { id } = useParams();
  const [user, setUsers] = useState({ name: "",  email: "",phno: "", })
 
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(0);
  useEffect(() => {
    getdata();

  }, [])

  const getdata = () => {
    const formdata = new FormData()
    formdata.append('id', id)
    axios.post('/select', formdata)
      .then(function (response) {
        if (response.data.status === true) {
          console.log(response.data)
         
          setUsers({name: response.data.data.name, mobile: response.data.data.mobileno, email: response.data.data.email})
          
          
          setLoading(false)

        }
        console.log(response.data);

      });

  }

  const validateForm = () => {
    setErr(0)
    if (user.name === "") {
      setErr(1)
      alert("Please enter Name")

    } 
    else if (!user.email.includes("@")) {
      setErr(2)
      alert("Please enter a valid email id")
    }
    else if (user.mobile.length !== 10) {
        setErr(3)
        alert("Please enter a valid 10 digit mobilenumber")
      }
    else {

      const formdata = new FormData();
      formdata.append("name", user.name);
      formdata.append("email", user.email);
      formdata.append("mobileno", user.phno);
      formdata.append("id", id);

      axios.post('/update_users', formdata)
        .then(function (response) {
          if (response.data.status === true) {
           
            console.log(response.data);
          } else {
            alert(response.data.msg)
          }
          console.log(response.data);
        });
    }

  }

  const onChangeValue = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
  }


  return (
    <div>

      <Container maxWidth="sm">
      {/* {JSON.stringify(user)}
      <br/> <br/> */}
        {loading ? <p>fetching data</p> :
          <Box>
            
            <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
              <ReusableTextField
                label="Name"
                variant="outlined"
                name="name"
                val={user.name}
                change={onChangeValue}
                error={err === 1 && true}
              />
            </Grid>
            <Grid item>
              <ReusableTextField
                label="Email"
                variant="outlined"
                name="email"
                val={user.email}
                change={onChangeValue}
                error={err === 2 && true}
              />
            </Grid>
            <Grid item>
              <ReusableTextField
                label="Mobile Number"
                variant="outlined"
                name="phno"
                val={user.phno}
                change={onChangeValue}
                error={err === 3 && true}
              />
            </Grid>
              <Grid item >
                <Button variant="contained" color="success" onClick={validateForm} >Edit
                </Button>
              </Grid>
            </Grid>
          </Box>}
      </Container>


    </div>
  );
}
