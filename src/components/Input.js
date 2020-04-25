  
import React from 'react';
import './app.css';

export default (props) => {
  const {image,handleUploadButton,handlePhotoChange,handleNameChange,handleEmailChange,handleLocationChange,handleGenderChange,handlePhoneChange,handlePetChange} = props
    return (
      <div>

            <form>
                <br/>
    <div className="row">
    <div className="col-25">
     
        <label htmlFor="name">Name</label>
        
    </div>
    <div className="col-50">
       <input type="text" id="name" name="name" placeholder="Pet name.." onChange={handleNameChange}/>
    </div>
    </div>
    <div className="row">
    <div className="col-25">
        <label htmlFor="name">Pet</label>
    </div>
    <div className="col-50">
       <input type="text" id="pet" name="pet" placeholder="Pet type.." onChange={handlePetChange}/>
    </div>
    </div>
    
    <div className="row">
    <div className="col-25">
      <label htmlFor="name">Photo</label>
    </div>
    <div className="col-50">
     <label htmlFor="upload-button">
        {
          image.preview ? <img src={ image.preview } width="300" height="300" alt='new'/> :<h5 className="text-center">Upload your photo</h5>
        }
      </label>
      <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handlePhotoChange}/>
      <br />
      <button onClick={handleUploadButton}>Upload</button>
      </div>
 </div>
 <div className="row">
   <div className="col-25">
    <label htmlFor="grnder">Gender</label>
   </div>
   <div className="col-50">
   <input type="text" id="gender" name="gender" placeholder="Gender" onChange={handleGenderChange}/>
  </div>
</div>
 <div className="row">
    <div className="col-25">
      <label htmlFor="area">Location</label>
    </div>
    <div className="col-50">
      <input type="text" id="area" name="area" placeholder="location" onChange={handleLocationChange}/>
    </div>
    </div>
 <div className="row">
    <div className="col-25">
      <label htmlFor="phone">Phone</label>
    </div>
    <div className="col-50">
      <input type="text" id="phone" name="phone" placeholder="Your Phone" onChange={handlePhoneChange}/>
    </div>
    </div>
    <div className="row">
    <div className="col-25">
      <label htmlFor="email">Email</label>
    </div>
    <div className="col-50">
      <input type="text" id="email" name="email" placeholder="Your Email" onChange={handleEmailChange}/>
    </div>
    </div>
  </form>

</div>
    )
    }
