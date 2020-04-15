import React,{useEffect,useState} from 'react';
import './App.css';
import Input from './components/Input';
import Task from './components/Task';
import {firestore} from './index'

function App() {
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState({preview: '', raw: ''})
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect( () =>{
    retriveData ()
  },[])

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePhotoChange = (e) => {
    setPhoto({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    })
  }
  const retriveData = () => {
    firestore.collection('tasks').onSnapshot(snapshot => {
        let mytask = snapshot.docs.map(d => {
          const {id,name,photo,location,phone,email} = d.data()
          return {id,name,photo,location,phone,email}
        })
        setTasks(mytask)
    })
  }

  const deleteTask = (id) => {
    firestore.collection("tasks").doc(id+'').delete()
  }
  const editTask = (id) => {
    firestore.collection("tasks").doc(id+'').set({id,name,photo:photo.preview,location,phone,email})
  }

  const addTask = () => {
    let id =  (tasks.length === 0)? 1 : tasks[tasks.length-1].id +1
    console.log(tasks)
    firestore.collection("tasks").doc(id+ '').set({id,name,photo:photo.preview,location,phone,email})
  }

  const renderTask= () => {
    if (tasks && tasks.length)
    return tasks.map( (task,index) => {
        return (
       <Task key={index} task={task} deleteTask={deleteTask} editTask={editTask} />
        
        )}
    )
    else 
        return (<li>No Pet</li>)
    
  }
  return (
    <div className="App">
        <center><Input image={photo} handlePhotoChange={handlePhotoChange} handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange} handlePhoneChange={handlePhoneChange} handleLocationChange={handleLocationChange}
        />
        <input type="submit" value="submit" onClick={addTask}/>
        </center>
        <ul style={{display: 'flex', listStyle: 'none'}}>{renderTask()}</ul><br/>
    </div>
  );
}

export default App;
