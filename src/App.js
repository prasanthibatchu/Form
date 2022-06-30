import React, { Component, useState } from 'react';
import './App.css';
import {Signup,GetUsers} from './components/signup'
import {Signin} from './components/signin'
import { Header } from './components/header';
import {GetImage,Upload} from './components/upload'
import {Edit} from './components/edit'
import {Chatpage} from './components/chat'
import { Signout } from './components/signout';
import { UserContext } from './components/context';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'

function App() {
    const [userP,setUserP]=useState(null) 
    return (
      <div className="App">
        <UserContext.Provider value={{userP,setUserP}}>
       <Router>
        <Header />
        <h1>Hello Ganishka</h1>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/data" element={<GetUsers />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/getimg" element={<GetImage />} />
          <Route path="/msg" element={<Chatpage />} />
          <Route path="/logout" element={<Signout />} />
        </Routes>
       </Router>
       </UserContext.Provider>
      </div>
    );
  
}

export default App;