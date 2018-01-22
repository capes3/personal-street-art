import React, { Component } from 'react';
import Photo from './Photo'

class NYC extends Component {
constructor(){
    super()
    this.state={
        photos:[  
        
         { id:4, src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 4, height: 3 },
         { id:5, src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 4, height: 3 },
         { id:6, src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 4, height: 3 },
      
       ]
         }
        }

  render() {

    let photos;
    if(this.state.photos){
        photos = this.state.photos.map(photo =>{
            console.log(photo)
            return (
                <Photo key={photo.id} photo={photo}/>
            )
        })
    }
      
    return (
      <div className="Gallery">
          {photos}  
      </div>
    );
  }
}

export default NYC;