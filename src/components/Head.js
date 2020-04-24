
import React from 'react';
import './head.css';

export default (props) => {
    
    return(
 <header id="header">

 <div className="logo">
 LosePet 
 </div>
 <div className="search">
 <input type="text" id="search" name="search" placeholder="Search" onChange={props.handleSearchChange}></input>
 </div>
 <div className="login">
 <input type="submit" value="Login"/>
 </div>
     </header>
    )
}