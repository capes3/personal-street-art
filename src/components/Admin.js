import React, { Component } from 'react';
import axios from 'axios';
import { error } from 'util';


class Admin extends Component {
  constructor(){
    super();

      this.state = {
        message:"",
        image:"",
        admin:false
      }
}

handleChange(value){
  this.setState({message:value})
}

handleImageChange(value){
  this.setState({image:value})
}

handleClick = () => {
    console.log(this.state)
    const newDescription = this.state.message
    axios.put('/api/featured', {newDescription}).then(results=>{
        alert('description was updated')
        this.setState({message:''})
        window.location.reload()
    }).catch(()=>alert('update failed'))
}

handleImageClick = () => {
  const newImage=this.state.image
  console.log(this.state.image)
  axios.put('/api/featuredimg', {newImage}).then(results=>{
    alert('image was updated')
    this.setState({image:''})
    window.location.reload()
  }).catch(()=>alert('update failed'))
}

componentDidMount=()=>{
  axios.get('/auth/user')
  .then((res=>{console.log(res)
    if(res.data.user_id===1){this.setState({admin:true})}
  })).catch(console.log('the endpoint sucks'))
}

  
  render() {        
    if(this.state.admin===true){
      return(
        <div className="App-intro">
        <input onChange={ (e)=> this.handleChange( e.target.value )} type="text"/>
        <button onClick={this.handleClick}>Update Description</button>
        <input onChange={ (e)=> this.handleImageChange( e.target.value )} type="text"/>
        <button onClick={this.handleImageClick}>Update Image</button>
      </div>
      )
    }else{
      return null   
    };
  }
}

export default Admin;