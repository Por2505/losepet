import React,{useEffect,useState} from 'react';
import './App.css';
import Input from './components/Input';
import Task from './components/Task';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Foot from './foot.jpg';
import Foot2 from './foot2.jpg';


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
  const [photoURL, setPhotoURL] = useState('')
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
  const handleUploadButton = (e) => {
    e.preventDefault()
    const uploadTask = firebase.storage().ref(`/images/${photo.raw.name}`).put(photo.raw)
    uploadTask.on('state_changed', 
    (snapShot) => {
      console.log(snapShot)
    }, (err) => {
      console.log(err)
    }, () => {
      firebase.storage().ref('images').child(photo.raw.name).getDownloadURL()
     .then(imageURL => {
      setPhotoURL(imageURL)
     })
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
    firebase.firestore().collection("tasks").doc(id+'').set({id,name,pet,photo:photoURL,location,gender,phone,email})
  }

  const addTask = () => {
    let id =  (tasks.length === 0)? 1 : tasks[tasks.length-1].id +1
    console.log(tasks)
    firebase.firestore().collection("tasks").doc(id+ '').set({id,name,pet,photo:photoURL,location,gender,phone,email})
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
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };
  let login = null;
  if (!isSignedIn) {
    login = <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
  } else {
    login = <input type="submit" value="Sign-out" onClick={() => firebase.auth().signOut()}/>
  } 
 
  return (
    <div className="App">
        <header id="header">
        <div className="logo">
        LosePet 
        </div>
        <div className="search">
        <input type="text" id="search" name="search" placeholder="Search Pet type, Location " onChange={handleSearchChange}></input>
        </div>
        <div className="login"></div>
        {login}
     </header>

        <div className="head">
        <div className="container">
        <div className="formm">
       <Input image={photo} handleUploadButton={handleUploadButton} handlePhotoChange={handlePhotoChange} handleNameChange={handleNameChange} handlePetChange={handlePetChange}
        handleEmailChange={handleEmailChange} handlePhoneChange={handlePhoneChange} handleLocationChange={handleLocationChange} handleGenderChange={handleGenderChange}
        />
            <input type="submit" value="submit" onClick={addTask}/>
         </div>
        </div>
        </div>
        <div className="bar">
        <div className="inbar">
          Featured Post
        </div>
        </div>
        <div>
           <h3>When you report a lost pet your post will appeared here as featured post</h3>
        </div>
        <ul className="ul">{renderTask()}</ul>
        
        <img src={Foot} width="100%"/>
        <div className="foot">
            <div className="footer">
              Losepet is actively helping to search for your lost pets in your local area. Report your lost pets here and send a free alert instantly.
            </div>
        </div>
        <div className="foot2">
        <div className="footer">
          Sarawadee Noktawee 6035512061 | Copyright © 2020  LosePet
          </div>
        </div>
    </div>

  );
}

export default App;
