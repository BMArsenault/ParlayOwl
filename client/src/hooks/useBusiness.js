import React, { useEffect, useState } from "react";
import { get } from "../utils/API";

export const useBusinessSearch = (searchYelp, searchLocation) => {
  const [searchBusinesses, setSearchBusinesses] = useState([]);
  const [searchParams, setSearchParams] = useState(searchYelp, searchLocation);

  useEffect(() => {
    setSearchBusinesses([]);
    const getResults = async () => {
      try {
        const data = await get("/businesses/search", searchParams);
        const response = await data.json();
        setSearchBusinesses(response.businesses);
      } catch (err) {
        console.error(err);
      }
    };
    getResults();
  }, [searchParams]);

  return [searchBusinesses, searchParams, setSearchParams];
};

export default useBusinessSearch;
