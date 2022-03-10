import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_GAME } from "../utils/mutations";
import Auth from "../utils/auth";
import { searchOddsApi } from "../utils/API";
import { getSavedGameIds } from "../utils/localStorage";
// import css
import "./search-games.css";

const SearchGames = () => {
  // create state for holding returned google api data
  const [searchedGames, setSearchedGames] = useState([]);
  // create state for holding our search field data
  const [values, setValues] = useState({
    id: "",
  });

  // create state to hold saved GameId values
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());
  const [saveGame] = useMutation(SAVE_GAME);

  // create method to search for Games and set state on form submit
  const handleClick = async (event) => {
    event.preventDefault();
    const { id } = event.target;
    setValues({
      ...values,
      id,
    });
    console.log(id);
    if (!id) {
      return false;
    }

    try {
      const response = await searchOddsApi(id);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const gameData = items.map((game) => ({
        gameId: game.id,
        SportTitle: game.volumeInfo.SportTitle || ["No title to display"],
        description: game.volumeInfo.description,
        home_team: game.volumeInfo.home_team,
        away_team: game.volumeInfo.away_team,
      }));

      setSearchedGames(gameData);
      setValues("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a game to our database
  const handleSaveGame = async (gameId) => {
    // find the game in `searchedGames` state by the matching id
    const gameToSave = searchedGames.find((game) => game.gameId === gameId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveGame({
        variables: gameToSave,
      });
      // if game successfully saves to user's account, save game id to state
      setSavedGameIds([...savedGameIds, gameToSave.gameId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <nav className="sports-games-list">
        <div>
          <h1>Search for Games!</h1>
          <ul>
            <li onClick={handleClick} id="upcoming">
              Get Upcoming Games
            </li>
            <li onClick={handleClick} id="americanfootball_nfl">
              NFL
            </li>
            <li onClick={handleClick} id="americanfootball_ncaaf">
              College Football
            </li>
            <li onClick={handleClick} id="basketball_nba">
              NBA
            </li>
            <li onClick={handleClick} id="baseball_mlb">
              MLB
            </li>
            <li onClick={handleClick} id="icehockey_nhl">
              NHL
            </li>
            <li onClick={handleClick} id="mma_mixed_martial_arts ">
              MMA
            </li>
          </ul>
        </div>
      </nav>

      <div>
        <h2>
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : "Please search for a game"}
        </h2>
        <div>
          {searchedGames.map((game) => {
            return (
              <div className="card" key={game.gameId} border="dark">
                {game.image ? (
                  <img
                    src={game.image}
                    alt={`The cover for ${game.title}`}
                    variant="top"
                  />
                ) : null}
                <div className="card-body">
                  <div className="card-title">{game.title}</div>
                  <p className="small">Authors: {game.authors}</p>
                  <p>{game.description}</p>
                  {Auth.loggedIn() && (
                    <button
                      disabled={savedGameIds?.some(
                        (savedGameId) => savedGameId === game.gameId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveGame(game.gameId)}
                    >
                      {savedGameIds?.some(
                        (savedGameId) => savedGameId === game.gameId
                      )
                        ? "This game has already been saved!"
                        : "Save this Game!"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchGames;
