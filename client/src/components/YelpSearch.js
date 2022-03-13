import React from 'react';

const YelpSearch = () => {
    
    
    
    return(
        <div class="field has-addons">
            <p class="control">
                <button className="button is-static">Search</button>
            </p>
            <p class="control">
                <input className="input" type="text" placeholder="Sports Bars, Restaurants"/>
            </p>
            <p class="control">
                <button className="button is-static">Near</button>
            </p>    
            <p class="control"> 
                <input className="input" type="text" placeholder="Me"/>
            </p>
            <div className="button is-static">
                <span className="icon is small"><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
         </div>
    )
} 

export default YelpSearch;