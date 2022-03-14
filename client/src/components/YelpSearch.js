import React, { useState } from 'react';

const YelpSearch = () => {
    
     const [searchYelp, setSearchYelp] = useState('')
     const [searchLocation, setSearchLocation] = useState('')
    
    const submitForm = async(event) => {
        console.log(searchYelp,searchLocation)
        event.preventDefault();

        
    }


    return(
        <form className="field has-addons">
            <p className="control">
                <button className="button is-static">Search</button>
            </p>
            <p className="control">
                <input onChange = {(e) => setSearchYelp(e.target.value)} className="input" type="text" placeholder="Sports Bars, Restaurants"/>
            </p>
            <p className="control">
                <button className="button is-static">Near</button>
            </p>    
            <p className="control"> 
                <input onChange = {(e) => setSearchLocation(e.target.value)}  className="input" type="text" placeholder="Me"/>
            </p>
            <div className="button" onClick={submitForm}>
                <span className="icon is small"><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
         </form> 
    )
} 

export default YelpSearch;