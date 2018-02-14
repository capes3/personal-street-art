import React, { Component } from 'react';
import Gallery from './components/Gallery'
import routes from './routes'
import {Link} from 'react-router-dom'
import './App.css'

class App extends Component {
  constructor(){
    super()

  //   this.state={
  //  photos:[  
  //   { id:1, src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 },
  //   { id:2, src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 4, height: 3 },
  //   { id:3, src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 4, height: 3 },
  //   { id:4, src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 4, height: 3 },
  //   { id:5, src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 4, height: 3 },
  //   { id:6, src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 4, height: 3 },
  //   { id:7, src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 4, height: 3 },
  //   { id:8, src: 'https://source.unsplash.com/PpOHJezOalU/800x599', width: 4, height: 3 },
  //   { id:9, src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', width: 4, height: 3 }
  // ]
  //   }

  }
  render() {
    return (
      <div className="App">
      <nav className="Nav">
      
          <ul>
            {/* <Link to="/" className='links'>Gallery</Link> */}
            <Link to="/Admin" className='links'>Admin</Link>
            <Link to="/Featured"className='links'>Featured</Link> 
            <Link to="/Explore"className='links'>Explore</Link> 
            <Link to="/Saved"className='links'>Saved</Link> 
           </ul> 

          
      
      </nav>
      {routes}
      
      </div>
    );
  }
}

export default App;
