
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
  // export const saveGame = (gameData, token) => {
  //   return fetch('/api/users', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(gameData),
  //   });
  // };
  
  // remove saved game data for a logged in user
  // export const deleteGame = (gameId, token) => {
  //   return fetch(`/api/users/sports/${gameId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   });
  // };
  
  // make a search to the-odds-api for all sports
  // https://api.the-odds-api.com/v4/sports/?apiKey=
  export const searchOddsApi = (sport) => {
    return fetch(`https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=bd1d99e24f3dbaf4f1d8a259ff04b5e5&regions=us&markets=h2h`);
  };