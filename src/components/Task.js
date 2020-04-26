import React from 'react'
import './Task.css'
export default (props) => {
    const {task,editTask,deleteTask,isSignedIn} = props
    const {id,name,pet,photo,location,gender,phone,email} = task
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