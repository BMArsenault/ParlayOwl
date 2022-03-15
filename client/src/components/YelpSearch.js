import React, { useState } from 'react';
import { get } from '../utils/API';
import {useBusinessSearch} from '../hooks/useBusiness'
import styles from '../singleresult.module.css'
import { Jumbotron, Container, Col, Form, Button, CardColumns } from 'react-bootstrap';

const YelpSearch = () => {
    // create state for holding returned yelp api data
    const [searchedBusinesses, setSearchedBusinesses] = useState([]);
    const [searchYelp, setSearchYelp] = useState('') ;
    const [searchLocation, setSearchLocation] = useState('');
    


    
    const submitForm = async(event) => {
        console.log(searchYelp,searchLocation)
        event.preventDefault();

        if (!searchYelp) {
            return false;
          }
      
        try {
            const response = await get(searchYelp, searchLocation);
      
            if (!response.ok) {
              throw new Error('something went wrong!');
                }
            
            const { items } = await response.json();
                console.log(items);
        

            const yelpData = items.map((businesses) => ({
              yelpId: businesses[0].id,
              yelpImg: businesses[0].image_url,
              yelpName: businesses[0].name,
              yelpRating: businesses[0].rating,
              yelpPrice: businesses[0].price,
              yelpCategory: businesses[0].categories[0].alias,
              yelpAddress: businesses[0].location.yelpAddress,
              yelpCity: businesses[0].location.city
            }));

            console.log(yelpData);
            setSearchedBusinesses(yelpData);
            setSearchYelp('')
            setSearchLocation('')
        } catch (err){
            console.error(err)
        }
      
    };

    return(
        <>
        <Container>
            <div>
                <Form className="field has-addons">
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
                </Form>
            </div>
        </Container>
        <Container>
            {searchedBusinesses.map((businesses) => {
                return(
                    <div key={businesses.yelpId}>
                    <img className = {styles.searchresultimg} src ={businesses.yelpImg}/>
                        <div className = {styles.businessdetails}>
                        <h4 className = {styles.businessname}>{businesses.yelpName}</h4>
                            <p>Rating: {businesses.yelpRating} </p>
                            <p>{businesses.yelpPrice} <span className = "tag">{businesses.yelpCategory}</span></p>
                        </div>
                        <div>
                            <p>{businesses.yelpAddress} </p>
                            <p>{businesses.yelpCity} </p>
                        </div>
                </div>
                );
            })}
        </Container>
        </>
    );
}; 

export default YelpSearch;