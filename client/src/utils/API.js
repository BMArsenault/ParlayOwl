
// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
  // save game data for a logged in user
  export const saveGame = (gameData, token) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(gameData),
    });
  };
  
  // remove saved game data for a logged in user
  export const deleteGame = (gameId, token) => {
    return fetch(`/api/users/sports/${gameId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };
  
  // make a search to the-odds-api for all sports
  // https://api.the-odds-api.com/v4/sports/?apiKey=process.env.API_KEY
  export const searchOddsApi = (sport) => {
    const key = process.env.API_KEY
    return fetch(`https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${key}&regions=us&markets=h2h,spreads,totals,outrights`);
  };

  //YELP API configuration
  export const get = (searchYelp, searchLocation) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchYelp}&location=${searchLocation}` , {
      headers: {
        authorization: `Bearer utKRZpP2d81vSbspms41oMG3hTVQSDc5lmeMKFdVllTskS-tcFZ8xh_n0XYs38-IHEp7kvte9C5P9LszLHG-k-xNJ86U1CxCwSTwDW5F2q4WRq7-eeLxuYc-akwpYnYx`,
       }
    });
  }

   