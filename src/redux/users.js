import axios from 'axios';



const initialState = {
    userData: {}
}
const GET_USER = 'GET_USER';


export function getUser(){
    console.log('action creator')
    const userInfo = axios.get('/auth/me')
    .then( res =>{
        console.log('res', res.data)
        return res.data
    }); //always use the axios call when doing this don't only time yoou use full URL is login and logout
    return {
        type: GET_USER,
        payload: userInfo
    }
}

export default function reducer(state = initialState, action){
   switch(action.type){
       case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {userData: action.payload})
       default:
            return state;
   }
}