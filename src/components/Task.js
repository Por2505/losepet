import React from 'react'
import './Task.css'
export default (props) => {
    const {task,editTask,deleteTask} = props
    const {id,name,photo,location,phone,email} = task
    return (
        <li> 
            <div className="id">
                {id}
            </div>
            <div className="name">
                {name}
            </div>
            <div >
                <img src={photo} width="300" height="300" alt='new'/>
            </div>
            <div >
                {location}
            </div>
            <div >
                {phone}
            </div>
            <div>
                {email}
            </div>
        <div className="container">
        <button  className="button-red" onClick={() => deleteTask(id)}>Delete</button>
        <button className="button-green" onClick={() => editTask(id)}>Edit</button>
        </div>
        </li>
    )
}