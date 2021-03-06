import React, { Component } from 'react';
import axios from 'axios'
import Admin from './Admin'

class Featured extends Component {
constructor(){
    super()
    this.state={
        photos:"",
        description:"",
        isAdmin:false
    }
        }




componentDidMount(){
        axios.get('/api/featured')
        .then((res)=>{console.log(res.data[0])
            console.log(res.data[0].img_url)
        this.setState({photos:res.data[0].img_url,
                        description:res.data[0].description})
        })
        .catch(function(error){
            console.log(error)
        })}

    render(){
        
        return(
        <div className='featured'>
            <img alt="unsplash" className="unsplash" src={this.state.photos}/>
            <p>{this.state.description}</p>
            <Admin/>
        </div>)
    }

}





export default Featured;