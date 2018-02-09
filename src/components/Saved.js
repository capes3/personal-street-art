import React, { Component } from 'react';

import axios from 'axios'

class Saved extends Component {
constructor(){
    super()
    this.state={
        photos:[]
    }
        }



componentWillMount(){
           axios.get('/api/saved').then(response=>{
              console.log(response.data)
               this.setState(
                   
                {photos:response.data}
            
            )
               
               
           }).catch(err=>{console.log(err)})
           
        }




  render() {
      return(
          <div>

            {console.log(this.state.photos)}
           {this.state.photos.map((photos,index)=>(
               <img key = {index}src={photos.img_url}/>
           ))}

          </div>
      )
  }
}

export default Saved;