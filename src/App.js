import React, { Component } from 'react';
import './App.css';
import {Signup,GetUsers} from './components/signup'
import {Signin} from './components/signin'
import { Header } from './components/header';
import {GetImage,Upload} from './components/upload'
import {Edit} from './components/edit'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
       <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/data" element={<GetUsers />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/getimg" element={<GetImage />} />
        </Routes>
       </Router>
      </div>
    );
  }
}

export default App;
