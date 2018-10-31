import React, { Component } from 'react';
import axios from 'axios'

class Explore extends Component {
constructor(){
    super()
    this.state={
        photos:""
         }
        }


componentDidMount(){
            axios.get('https://api.unsplash.com//photos/random?client_id=c7aba0db74e8fd5c2f6a521fd342505841804e687fe49c7583ea3636917eab77&collections=862246')
            .then((response)=>{
                console.log(response.data)
                this.setState({photos:response.data.urls.regular})
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

handleRefresh = () =>{
    // window.location.reload();
    this.componentDidMount()
}


  render() {
      return(
          <div className="exploreImage">
              <div className="exploreWrapper">
              <p>Click Image to See a New Picture</p>     
              <button className="button" onClick={this.handleClick}>Save Image</button>
              <img alt="random" onClick={this.handleRefresh}className="unsplash" src={this.state.photos}/>
              </div>           
          </div>
      )
  }
}

export default Explore;