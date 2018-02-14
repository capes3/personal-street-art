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
              
               this.setState(
                   
                {photos:response.data}
            
            )
               
               
           }).catch(err=>{console.log(err)})
           
        }

delete=(save_id)=>{
    console.log(this.state.save_id)
}


render(){
    const imageCard = this.state.photos.map((photos, save_id)=>(
        
            <div key={photos.save_id}>
                <img key={photos.save_id} src={photos.img_url}/>
                <button key={photos.save_id} className="deleteButton" onClick = {this.delete.bind(this, save_id)}>DELETE</button>
            </div>
    ))

    return <div>
        {imageCard}
    </div>
}
}

export default Saved;