  
import React, { useState } from 'react';
import './app.css';

export default () => {
    const [image, setImage] = useState({preview: '', raw: ''})
  
    const handleChange = (e) => {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      })
    }
    
    const handleUpload = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('image', image.raw)
      const config = { headers: { 'content-type': 'multipart/form-data' } }		
  
      //await uploadToBackend('endpoint', {image: image.raw}, config)
    }
    return (
        <div class="container">
  <form>
  <input
                type="radio"
                name="lost"/>Lose Pet
            <input
                type="radio"
                name="lost"/>Found Pet
                <br/>
    <div class="row">
    <div class="col-25">
      <label for="name">Name</label>
    </div>
    <div class="col-75">
      <input type="text" id="name" name="name" placeholder="Pet name.."/>
    </div>
    </div>
    <div class="row">
    <div class="col-25">
      <label for="name">Photo</label>
    </div>
    <div class="col-75">
     <label htmlFor="upload-button">
        {
          image.preview ? <img src={ image.preview } width="300" height="300" /> : (
            <>
              
              <h5 className="text-center">Upload your photo</h5>
            </>
          )
        }
      </label>
      <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleChange}/>
      <br />
      <button onClick={handleUpload}>Upload</button><br/>
      </div>
 </div>
 <div class="row">
    <div class="col-25">
      <label for="phone">Phone</label>
    </div>
    <div class="col-75">
      <input type="text" id="phone" name="phone" placeholder="Your Phone"/>
    </div>
    </div>
  <div class="row">
    <input type="submit" value="Submit"/>
  </div>
  </form>
</div>
    )
    }
