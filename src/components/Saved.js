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

delete=(photos)=>{
    console.log(photos)
    axios.delete('/api/saved/:id', {params : photos} ).then(results =>{
        alert('delete was successful')
    }).catch(()=>alert('delete failed'))
} 


render(){
    const imageCard = this.state.photos.map((photos, index)=>(
        
            <div key={index}>
                <img className="unsplash"  src={photos.img_url}/>
                <button className="deleteButton" onClick = {this.delete.bind(this, photos.save_id)}>DELETE</button>
            </div>
    ))

    return <div>
        {imageCard}
    </div>
}
}

export default Saved;