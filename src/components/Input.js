  
import React from 'react';
import './app.css';


export default (props) => {
  const {image,handlePhotoChange,handleNameChange,handleEmailChange,handleLocationChange,handlePhoneChange} = props
    return (
      <div>
      <header id="header">

        <div className="logo">
        LosePet 
        
        
        </div>
        <div className="login">
        <input type="submit" value="Login"/>
        </div>
        
				
			</header>

		
      <div className="head">
        <div className="container">
            <form>
            <div className="row">
              <div className="col-50">
                <input
                type="radio"
                name="lost"/>Lose Pet
                </div>
              <div className="col-50">
               <input
                type="radio"
                name="lost"/>Found Pet
                </div>
      
           </div>
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
</div>
</div>
    )
    }
