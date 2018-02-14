import React, { Component } from 'react';
import axios from 'axios';
import { error } from 'util';


class Admin extends Component {
  constructor(){
    super();

      this.state = {
        message:""
      }
}

handleChange(value){
  this.setState({message:value})
}

handleClick = () => {
    console.log(this.state)
    const newDescription = this.state.message
    axios.put('/api/featured', {newDescription}).then(results=>{
        alert('description was updated')
    }).catch(()=>alert('update failed'))
}

  render() {
    return (
      
        <div className="App-intro">
          <input onChange={ (e)=> this.handleChange( e.target.value )} type="text"/>
          <button onClick={this.handleClick}>Update Description</button>
        </div>
    
    );
  }
}

export default Admin;