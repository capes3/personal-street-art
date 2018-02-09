import React, { Component } from 'react';

import axios from 'axios'

class Explore extends Component {
constructor(){
    super()
    this.state={
        photos:""
         }
        }


componentWillMount(){
            axios.get('https://api.unsplash.com//photos/random?client_id=c7aba0db74e8fd5c2f6a521fd342505841804e687fe49c7583ea3636917eab77&collections=862246')
            .then((response)=>{
                console.log(response.data)
                this.setState({photos:response.data.urls.thumb})
            }
            )
            .catch(function(error){
                console.log(error);
            })
        }

handleClick = () =>{
    console.log(this.state)
    var savedImg = this.state.photos
    axios.post('/api/saved', {savedImg} ).then(results => {
        alert("image was saved")
    }).catch(()=>alert('failed at saving an image'))
}


  render() {
      return(
          <div>
              
              <img src={this.state.photos}/>
              <button onClick={this.handleClick}>Save Image</button>
              
          </div>
      )
  }
}

export default Explore;