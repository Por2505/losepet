  
import React from 'react';
import './app.css';
import { useSelector, useDispatch } from 'react-redux';
import {storage} from '../App'
export default () => {
  const dispatch = useDispatch();
  const photo = useSelector(state => state.photo);
  const handleUploadButton = (e) => {
    e.preventDefault()
    const uploadTask = storage.ref(`/images/${photo.raw.name}`).put(photo.raw)
    uploadTask.on('state_changed', 
    (snapShot) => {
      console.log(snapShot)
    }, (err) => {
      console.log(err)
    }, () => {
      storage.ref('images').child(photo.raw.name).getDownloadURL()
     .then(imageURL => {
      dispatch({type:'PHOTOURL_SET',photoURL:imageURL})
     })
    })
  }
    return (
      <div>

            <form>
                <br/>
    <div className="row">
    <div className="col-25">
     
        <label htmlFor="name">Name</label>
        
    </div>
    <div className="col-50">
       <input type="text" id="name" name="name" placeholder="Pet name.." onChange={(e)=>{dispatch({type:'NAME_SET',name:e.target.value})}}/>
    </div>
    </div>
    <div className="row">
    <div className="col-25">
        <label htmlFor="name">Pet</label>
    </div>
    <div className="col-50">
       <input type="text" id="pet" name="pet" placeholder="Pet type.." onChange={(e)=>{dispatch({type:'PET_SET',pet:e.target.value})}}/>
    </div>
    </div>
    
    <div className="row">
    <div className="col-25">
      <label htmlFor="name">Photo</label>
    </div>
    <div className="col-50">
     <label htmlFor="upload-button">
        {
          photo.preview ? <img src={ photo.preview } width="300" height="300" alt='new'/> :<h5 className="text-center">Upload your photo</h5>
        }
      </label>
      <input type="file" id="upload-button" style={{ display: 'none' }} 
      onChange={(e)=>dispatch({type:'PHOTO_SET',preview: URL.createObjectURL(e.target.files[0]),raw: e.target.files[0]})}/>
      <br />
      <button onClick={handleUploadButton}>Upload</button>
      </div>
 </div>
 <div className="row">
   <div className="col-25">
    <label htmlFor="grnder">Gender</label>
   </div>
   <div className="col-50">
   <input type="text" id="gender" name="gender" placeholder="Gender" onChange={(e)=>{dispatch({type:'GENDER_SET',gender:e.target.value})}}/>
  </div>
</div>
 <div className="row">
    <div className="col-25">
      <label htmlFor="area">Location</label>
    </div>
    <div className="col-50">
      <input type="text" id="area" name="area" placeholder="location" onChange={(e)=>{dispatch({type:'LOCATION_SET',location:e.target.value})}}/>
    </div>
    </div>
 <div className="row">
    <div className="col-25">
      <label htmlFor="phone">Phone</label>
    </div>
    <div className="col-50">
      <input type="text" id="phone" name="phone" placeholder="Your Phone" onChange={(e)=>{dispatch({type:'PHONE_SET',phone:e.target.value})}}/>
    </div>
    </div>
    <div className="row">
    <div className="col-25">
      <label htmlFor="email">Email</label>
    </div>
    <div className="col-50">
      <input type="text" id="email" name="email" placeholder="Your Email" onChange={(e)=>{dispatch({type:'EMAIL_SET',email:e.target.value})}}/>
    </div>
    </div>
  </form>

</div>
    )
    }
