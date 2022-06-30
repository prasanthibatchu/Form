import {
  Container,
  Box,
  Grid,
  Button,
  Avatar,
  
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReusableTextField } from "./reusabletext";
import "../App.css";
const axios = require("axios");

export const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getdata();
  }, []);

  let history = useNavigate();

  const getdata = () => {
    const formdata = new FormData();

    axios.get("/select", formdata).then(function (res) {
      if (res.data.status === true) {
        setUsers(res.data.data);
        setImg(res.data.data);
        // console.log(res.data);
        setLoading(false);
      } else {
        this.setUsers({
          data: [],
          noData: false,
        });
      }
      console.log(res.data.data);
    });
  };
  const deleteRow = (id) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("id", id);
    axios.post("/delete", formdata).then(function (response) {
      if (response.data.status === true) {
        getdata();
      }
      console.log(response.data);
    });
  };

  return (
    <div>
           {loading ? (
        <h3>Fetching Please wait....</h3>
      ) : (
        <div>
          {users.length === 0 ? (
            <p> no user's records available.... </p>
          ) : (
            <div>
              <h1>User details</h1>
              <center>
                <table>
                  <thead>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>MOBILE</th>
                    <th>REGDATE</th>
                    <th>EDIT/UPDATE</th>
                    <th>DELETE</th>

                    <th>IMAGE</th>
                    <th>TIME</th>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      return (
                        <tr>
                          {/* 
                          {JSON.stringify(img[17].file_name)} */}

                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.mobileno}</td>
                          <td>{user.regdate}</td>

                          <td>
                            <form>
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => history(`/edit/${user.id}`)}
                              >
                                Edit
                              </Button>
                            </form>
                          </td>
                          <td>
                            <form>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => deleteRow(user.id)}
                              >
                                Delete
                              </Button>
                            </form>
                          </td>

                          <td>
                            <img
                              src={`http://192.168.1.51:5555/static/uploads/${user.file_name}`}
                              alt="IMAGE"
                              width="100"
                              height="150"
                            />
                          </td>
                          <td>{user.upload_on}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </center>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Signup = () => {
  const [user, setUsers] = useState({
    name: "",
    email: "",
    phno: "",
    pass: "",
    conpass: "",
  });
  const [err, setErr] = useState(0);
  const [img, setImg] = useState([]);
  const [pic, setPic] = useState("");

  let history = useNavigate();

  const validataion = () => {
    setErr(0);
    if (user.name === "") {
      setErr(1);
      alert("please enter name");
    } else if (!user.email.includes("@")) {
      setErr(2);
      alert("please enter email");
    } else if (user.phno.length !== 10) {
      setErr(3);
      alert("please enter phno");
    } else if (user.pass < 6) {
      setErr(4);
      alert("please enter password");
    } else if (user.conpass < 6) {
      setErr(5);
      alert("please confirm password");
    } else if (user.pass !== user.conpass) {
      alert("mismatch pass");
    } else {
      const formdata = new FormData();
      formdata.append("name", user.name);
      formdata.append("email", user.email);
      formdata.append("mobileno", user.phno);
      formdata.append("password", user.pass);
      formdata.append("conpassword", user.conpass);
      // formdata.append("file_name", img);
      formdata.append("dpic", pic.raw);
      console.log(formdata);
      axios.post("/signup", formdata).then(function (res) {
        if (res.data.status === true) {
          // console.log(res.data);
          // console.log(res.data.status);
          history("/data");
        } else {
          console.log(res.status);
          alert(res.data.msg);
        }
        console.log(res.data);
      });
    }
  };
  // const uploadFile = (e) => {
  //   e.preventDefault();
  //   const formdata = new FormData();
  //   // formdata.append("image",img)
  //   // console.log(img)
  //   formdata.append("file_name", img);
  //   formdata.append("dpic", pic.raw);
  //   console.log(formdata);
  //   axios.post("/signup", formdata).then(function (res) {
  //     if (res.data.status === true) {
  //       // console.log(res.data)
  //     }
  //     // history("/");
  //   });
  // };
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
            <Grid item>
              <ReusableTextField
                label="Password"
                variant="outlined"
                type="password"
                name="pass"
                val={user.pass}
                change={onChangeValue}
                error={err === 4 && true}
              />
            </Grid>
            <Grid item>
              <ReusableTextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                name="conpass"
                val={user.conpass}
                change={onChangeValue}
                error={err === 5 && true}
              />
            </Grid>
            <Grid item>
              <Button
              size="small" variant="contained" component="label">
                Choose File
                <input
                  hidden
                  type="file"
                  id="contained-button-file1"
                  onChange={(e) => {
                    if (e.target.files.length !== 0) {
                      const image = e.target.files[0];
                      setPic({
                        raw: image,
                        preview: URL.createObjectURL(image),
                      });
                    }
                    e.target.value = "";
                  }}
                />
              </Button>

              <br />
              <br />
              <div>
                <Avatar
                  alt="profile pic"
                  src={pic.preview}
                  style={{ height: "100px", width: "100px", margin: "auto" }}
                />
              </div>
            </Grid>
            <br />
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