import React from 'react';
import {Link} from 'react-router-dom'

export default function NotFound(){
    return (
        
        <div id="error">
        <h2><strong>Oops...something went wrong!</strong></h2>
        <h5>The information you requested doesn't seem to be available.</h5>
        <br></br>
        <img id="error-img" src="https://cdn3.iconfinder.com/data/icons/bio-medical-icons/467/Germ-512.png" alt="covid virus"></img>
        <br></br>
        <br></br>
        <Link id="homeBtn" to="/"><i id="homeBtn" className="fas fa-home"/></Link>
        </div>

    )
}