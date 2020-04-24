import React,{useEffect,useState} from 'react';
import './App.css';
import Input from './components/Input';
import Task from './components/Task';
import Head from './components/Head';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const firebaseConfig = {
  apiKey: "AIzaSyBpgSgZL_aKKjjyUZXQBTspW0j5x-S8bSI",
  authDomain: "losepet-c4a51.firebaseapp.com",
  databaseURL: "https://losepet-c4a51.firebaseio.com",
  projectId: "losepet-c4a51",
  storageBucket: "losepet-c4a51.appspot.com",
  messagingSenderId: "268111742243",
  appId: "1:268111742243:web:399f5eba67c4880d9b3896",
  measurementId: "G-GG12Q19QPY"
};

firebase.initializeApp(firebaseConfig)

function App() {
  
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState('')
  const [pet,setPet] = useState('')
  const [search, setSearch] = useState('')
  const [photo, setPhoto] = useState({preview: '', raw: ''})
  const [gender, setGender] = useState('')
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isSignedIn,setisSignedIn] = useState(false)
  useEffect( () =>{
    retriveData ()
  },[])

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }
  const handlePetChange = (e) => {
    setPet(e.target.value)
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }
  const handleGenderChange = (e) => {
    setGender(e.target.value)
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
    firebase.auth().onAuthStateChanged(
      (user) => {setisSignedIn(!!user)}
    );
    firebase.firestore().collection('tasks').onSnapshot(snapshot => {
        let mytask = snapshot.docs.map(d => {
          const {id,name,pet,photo,location,gender,phone,email} = d.data()
          return {id,name,pet,photo,location,gender, phone,email}
        })
        setTasks(mytask)
    })
  }

  const deleteTask = (id) => {
    firebase.firestore().collection("tasks").doc(id+'').delete()
  }
  const editTask = (id) => {
    firebase.firestore().collection("tasks").doc(id+'').set({id,name,pet,photo:photo.preview,location,gender,phone,email})
  }

  const addTask = () => {
    let id =  (tasks.length === 0)? 1 : tasks[tasks.length-1].id +1
    console.log(tasks)
    firebase.firestore().collection("tasks").doc(id+ '').set({id,name,pet,photo:photo.preview,location,gender,phone,email})
  }

  const renderTask= () => {
    if (tasks && tasks.length)
    return tasks.map( (task,index) => {
      if(task.pet.slice(0,search.length)===search)
        return (
       <Task key={index} task={task} deleteTask={deleteTask} editTask={editTask} isSignedIn={isSignedIn}/>
        
        )
      else return null}
    )
    else 
        return (<li>No Pet</li>)
    
  }

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false
    }
  };

 
  let login = null;
  if (!isSignedIn) {
    login = <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
  } else {
    login = <div>
      <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
          <img id="photo" className="pic" src={firebase.auth().currentUser.photoURL} width='80'/>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
    </div>
  } 
  return (
    <div className="App">
        <Head handleSearchChange={handleSearchChange}/>
        <div className="head">
        <div className="container">
        <div className="formm">
       <Input image={photo} handlePhotoChange={handlePhotoChange} handleNameChange={handleNameChange} handlePetChange={handlePetChange}
        handleEmailChange={handleEmailChange} handlePhoneChange={handlePhoneChange} handleLocationChange={handleLocationChange} handleGenderChange={handleGenderChange}
        />
            <input type="submit" value="submit" onClick={addTask}/>
         </div>
        </div>
        </div>
        <ul style={{display: 'flex', listStyle: 'none'}}>{renderTask()}</ul><br/>
        {login}


        
    </div>
  );
}

export default App;
