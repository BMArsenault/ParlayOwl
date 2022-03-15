import React, { useState } from 'react';
import { get } from '../utils/API';
import { useBusinessSearch } from '../hooks/useBusiness';

const YelpSearch = () => {
    // create state for holding returned yelp api data
     const [searchBusinesses, setSearchBusinesses] = useState ([]);
     const [searchYelp, setSearchYelp] = useState('')
     const [searchLocation, setSearchLocation] = useState('')
    //  const [searchBusinesses, searchParams, setSearchParams] = useBusinessSearch(searchYelp, searchLocation)

    
    const submitForm = async(event) => {
        console.log(searchYelp,searchLocation)
        event.preventDefault();

        if (!searchYelp) {
            return false;
          }
      
          try {
            const response = await get(searchYelp, searchLocation);
      
            if (response.ok) {
                console.log(response.json())
            //   throw new Error('something went wrong!');
                const items = await response.json();
    
            } 
        } catch (err){
            console.error(err)
        }
      
 
      
        //     const gameData = items.map((game) => ({
        //       gameId: game.id,
        //       SportTitle: game.volumeInfo.SportTitle || ['No title to display'],
        //       description: game.volumeInfo.description,
        //       home_team: game.volumeInfo.home_team,
        //       away_team: game.volumeInfo.away_team,
        //     }));
      
        //     setSearchedGames(gameData);
        //     setSearchInput('');
        //   } catch (err) {
        //     console.error(err);
        //   }
    };


    return(
        <form className="field has-addons">
            <p className="control">
                <button className="button is-static">Search</button>
            </p>
            <p className="control">
                <input name = 'yelpSearch' value={searchYelp} onChange = {(e) => setSearchYelp(e.target.value)} className="input" type="text" placeholder="Sports Bars, Restaurants"/>
            </p>
            <p className="control">
                <button className="button is-static">Near</button>
            </p>    
            <p className="control"> 
                <input name = 'searchLocation' value={searchLocation} onChange = {(e) => setSearchLocation(e.target.value)}  className="input" type="text" placeholder="Me"/>
            </p>
            <button className="button" onClick={submitForm}>
                <span className="icon is small"><i className="fa-solid fa-magnifying-glass"></i></span>
            </button>
         </form> 
    )
} 

export default YelpSearch;