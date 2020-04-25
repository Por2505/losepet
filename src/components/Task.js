import React from 'react'
import './Task.css'
export default (props) => {
    const {task,editTask,deleteTask,isSignedIn} = props
    const {id,name,pet,photo,location,gender,phone,email} = task
    return (
        <li className="li"> 
            <div>
            <div className="col-50">
                {name}
            </div>
            <div className="col-25">
                {pet}
            </div>
            </div>
            <div >
                <img src={photo} width="300" height="300" alt='new'/>
            </div>
            <div>
                Gender:{gender}
            </div>
            <div >
                location:{location}
            </div>
            <div >
                phone:{phone}
            </div>
            <div>
               email: {email}
            </div>
            {isSignedIn?
                <div className="container">
                <button  className="button-red" onClick={() => deleteTask(id)}>Delete</button>
                </div>:null


            }
        
        </li>
    )
}