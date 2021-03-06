import React, { Component } from 'react';
import routes from './routes'
import {Link} from 'react-router-dom'
import './App.css'
import icon from './images/icon.svg'




class App extends Component {
  
  render() {
    return (
      <div className="App">
      <nav className="nav-wrapper">
      <div className="nav-bar">
            <img alt="logo" src={icon}className="logo"/>
            <div className="nav-bar-links">
            {/* <Link to="/" className='links'>Gallery</Link> */}
              <Link to="/Featured"className='links'>Featured</Link> 
              <Link to="/Explore"className='links'>Explore</Link> 
              <Link to="/Saved"className='links'>Saved</Link> 
              <Link to="/News"className='links'>News</Link> 
            </div>
      </div>
      </nav>
      {routes}
      
      </div>
    );
  }
}

export default App;
