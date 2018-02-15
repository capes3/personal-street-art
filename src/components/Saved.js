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

delete=(id)=>{
    console.log(id)
    axios.delete('/api/saved', {id} ).then(results =>{
        alert("image was deleted")
    }).catch(()=>alert('delete failed'))
} 


render(){
    const imageCard = this.state.photos.map((photos, index)=>(
        
            <div key={index}>
                <img  src={photos.img_url}/>
                <button className="deleteButton" onClick = {this.delete.bind(this, photos.save_id)}>DELETE</button>
            </div>
    ))

    return <div>
        {imageCard}
    </div>
}
}

export default Saved;