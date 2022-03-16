import React, { useState } from "react";
import { get } from "../utils/API";
import styles from "../singleresult.module.css";

const YelpSearch = () => {
  // create state for holding returned yelp api data
  const [searchedBusinesses, setSearchedBusinesses] = useState([]);
  //   const [searchYelp, setSearchYelp] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const submitForm = async (event) => {
    // console.log(searchYelp, searchLocation);
    event.preventDefault();

    if (!searchLocation) {
      return false;
    }

    try {
      const response = await get(searchLocation);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const data = await response.json();
      console.log(data);

      const yelpData = data.businesses.map((businesses) => ({
        yelpId: businesses.id,
        yelpImg: businesses.image_url,
        yelpName: businesses.name,
        yelpRating: businesses.rating,
        yelpPrice: businesses.price,
        yelpCategory: businesses.categories[0].alias,
        yelpAddress: businesses.location.address1,
        yelpCity: businesses.location.city,
        yelpUrl: businesses.url,
      }));

      console.log(yelpData);
      setSearchedBusinesses(yelpData);
      //   setSearchYelp("");
      setSearchLocation("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="yelp-search-form">
        <p className="sports-bars-text">Search Sports Bars</p>
        <form className="field">
          {/* <p className="control">
              <button className="button is-static">Search</button>
            </p>
            <p className="control">
              <input
                name="yelpSearch"
                value={searchYelp}
                onChange={(e) => setSearchYelp(e.target.value)}
                className="input"
                type="text"
                placeholder="Sports Bars, Restaurants"
              />
            </p> */}
          <input
            name="searchLocation"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="input"
            type="text"
            placeholder="Enter City"
          />
          <button onClick={submitForm}>
            <span className="icon is small">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </button>
        </form>
      </div>
      <div>
        {searchedBusinesses.slice(0, 10).map((businesses) => {
          return (
            <div className={styles.searchresult} key={businesses.yelpId}>
              <img
                alt="business"
                className={styles.searchresultimg}
                src={businesses.yelpImg}
              />
              <div className={styles.businessdetails}>
                <a
                  className={styles.businessname}
                  href={businesses.yelpUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {businesses.yelpName}
                </a>
                <p className={styles.businessrating}>
                  Rating: {businesses.yelpRating}{" "}
                </p>
                <p className={styles.businessprice}>
                  {businesses.yelpPrice}{" "}
                  <span className="tag">{businesses.yelpCategory}</span>
                </p>
              </div>
              <div className={styles.businessdetails}>
                <p className={styles.businessaddress}>
                  {businesses.yelpAddress}{" "}
                </p>
                <p className={styles.businesscity}>{businesses.yelpCity} </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default YelpSearch;
