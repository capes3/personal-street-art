import React, { Component } from 'react';

import axios from 'axios'

class LA extends Component {
constructor(){
    super()
    this.forceUpdateHandler=this.forceUpdateHandler.bind(this);
    this.state={
        photos:""
         }
        }


componentWillMount(){
            axios.get('https://api.unsplash.com//photos/random?client_id=c7aba0db74e8fd5c2f6a521fd342505841804e687fe49c7583ea3636917eab77&collections=862246')
            .then((response)=>{
                console.log(response.data)
                this.setState({photos:response.data.urls.small})
            }
            )
            .catch(function(error){
                console.log(error);
            })
        }

forceUpdateHandler(){
    this.forceUpdate();
};        

  render() {
      return(
          <div>
              <button onClick={this.forceUpdateHandler}>New Image</button>
              <img src={this.state.photos}/>
              
          </div>
      )
  }
}

export default LA;