import React from 'react'
import './Task.css'
import {firestore} from '../App'
import { useSelector} from 'react-redux';
export default (props) => {
    const isSignedIn = useSelector(state => state.signin);
    const {task} = props
    const {id,name,pet,photo,location,gender,phone,email} = task
    const deleteTask = (id) => {
        firestore.collection("tasks").doc(id+'').delete()
    }
    return (
        <li className="li"> 
            <div>
            <div className="col50">
                {name}
            </div>
            <div className="col25">
               <div className="type"> {pet}</div>
            </div>
            </div>
            <div>
                <img src={photo} width="80%"  alt='new'/>
            </div>
            <div>
            <div className="content">
                Gender:{gender}
            </div>
            </div>
            <div>
            <div className="content">
                Location:{location}
            </div>
            </div>
            <div>
            <div className="content">
                Phone:{phone}
            </div>
            </div>
            <div className="cont">
            <div className="content">
               Email: {email}
            </div>
            </div>

            {isSignedIn?
                <div className="del">
                <button  className="red" onClick={() => deleteTask(id)}>Delete</button>
                </div>:null

            }
            
        </li>
    )
}