import React, { Component } from 'react';
import Photo from './Photo'

class LA extends Component {
constructor(){
    super()
    this.state={
        photos:[  
         { id:1, src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 },
         { id:2, src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 4, height: 3 },
         { id:3, src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 4, height: 3 },
        
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

export default LA;