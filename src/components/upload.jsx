import React, { useState, useEffect } from "react";
import { Container, Box, Button, Avatar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
const axios = require("axios");
export const GetImage = () => {
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  useEffect(() => {
    getdata();
  }, []);
  // let history=useNavigate();
  const getdata = () => {
    const formdata = new FormData();
    formdata.append("id", id);
    axios.get("/select_image", formdata).then(function (res) {
    // axios.get("/getimage", formdata).then(function (res) {
      if (res.data.status === true) {
        setImg(res.data.data);
        console.log(res.data)
        setLoading(false);
      } else {
        this.setUsers({
          data: [],
          noData: false,
        });
      }
      console.log("hello");
    });
  };
  return (
    <div>
      

      {loading ? (
        <h3>Fetching Please wait....</h3>
      ) : (
        <div>
          {img.length === 0 ? (
            <p>no images available here...</p>
          ) : (
            <div>
              <h1>Image details</h1>

              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>IMAGE</th>
                    <th>TIME</th>,
                  </tr>
                </thead>
                <tbody>
                  {img.map((img) => {
                    return (
                      <tr>
                        {/* {JSON.stringify(img[3])} */}

                        <td>{img.id}</td>
                        {/* <td>{img.file_name}</td> */}

                        <td>
                          <img
                            src={`http://192.168.1.51:5555/static/uploads/${img.file_name}`}
                            // src={`http://192.168.1.241:5001/static/uploads/${img.upload}`}
                            alt="IMAGE"
                            width="100"
                            height="150"
                          />
                        </td>
                        <td>{img.uploaded_on}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Upload = () => {
  const [img, setImg] = useState("");
  const [pic, setPic] = useState("");

  let history = useNavigate();
  const uploadFile = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    // formdata.append("image",img)
    // console.log(img)
    formdata.append("file_name", img);
    formdata.append("dpic", pic.raw);
    console.log(formdata);
    axios.post("/test", formdata).then(function (res) {
      if (res.data.status === true) {
        // console.log(res.data)
      }
      history("/getimg");
    });
  };

  return (
    <div>
      <Avatar
        alt="profile pic"
        src={pic.preview}
        style={{ height: "150px", width: "150px", margin: "10px" }}
      />
      <div>
        <Container maxWidth="sm">
          <Box m={10} p={8} sx={{ backgroundColor: "aliceblue" }}>
            <h1>Upload Form</h1>
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
            &nbsp;&nbsp;&nbsp;
            <br />
            <br />
            <br />
            <Button variant="contained" onClick={(e) => uploadFile(e)}>
              Upload
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};