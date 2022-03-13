import React, { useState, useEffect } from "react";
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
      // I had to undeconstruct the items because if not i was getting undefinded
      const items = await response.json();
      console.log(items);
      const gameData = items.map((game) => ({
        id: game.id,
        sport_title: game.sport_title || ["No title to display"],
        bookmakers: [game.bookmakers.map((bookmakers) => bookmakers.title)],
        markets: [
          game.bookmakers.map((bookmakers) =>
            bookmakers.markets.map((markets) =>
              markets.outcomes.map((outcomes) => outcomes.price)
            )
          ),
        ],
        home_team: game.home_team,
        away_team: game.away_team,
      }));
      setSearchedGames(gameData);
      console.log(gameData);
      setValues("");
    } catch (err) {
      console.error(err);
    }
  };
  // needs to be in use effect or else it will not work properly
  useEffect(() => {
    // function for the dropdown animation
    document.addEventListener("click", (e) => {
      const isDropDownButton = e.target.matches("[data-dropdown-btn]");
      // if you click the dropdown button and are in a dropdown menu do nothing
      if (!isDropDownButton && e.target.closest("[data-dropdown]") != null)
        return;
      // if you are in a dropdown menu leave the menu up
      let currentDropdown;
      if (isDropDownButton) {
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.classList.toggle("active");
      }
      // close any other dropdown if they are open
      document
        .querySelectorAll("[data-dropdown].active")
        .forEach((dropdown) => {
          if (dropdown === currentDropdown) return;
          dropdown.classList.remove("active");
        });
    });
  }, []);
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
  // console.log(searchedGames);
  return (
    <>
      {/* <h1>Search for Games!</h1> */}
      {/* cool trick with html and for javascript you can give data attributes to html tags and select them by that instead of using id or their class */}
      <div className="dropdown" data-dropdown>
        <button className="dropdown-btn" data-dropdown-btn>
          Choose A Game
        </button>
        <div className="dropdown-content">
          <nav className="sports-games-list-container">
            <ul className="sports-game-list">
              <li
                className="sports-game-list-items"
                onClick={handleClick}
                id="upcoming"
              >
                Get Upcoming Games
              </li>
              <li
                className="sports-game-list-items"
                onClick={handleClick}
                id="americanfootball_nfl"
              >
                NFL
              </li>
              <li
                className="sports-game-list-items"
                onClick={handleClick}
                id="americanfootball_ncaaf"
              >
                College Football
              </li>
              <li
                className="sports-game-list-items"
                onClick={handleClick}
                id="basketball_nba"
              >
                NBA
              </li>
              <li
                className="sports-game-list-items"
                onClick={handleClick}
                id="baseball_mlb"
              >
                MLB
              </li>
              <li
                className="sports-game-list-items"
                onClick={handleClick}
                id="icehockey_nhl"
              >
                NHL
              </li>
              <li
                className="sports-game-list-items"
                onClick={handleClick}
                id="mma_mixed_martial_arts "
              >
                MMA
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div>
        <h2 className="game-text">
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
                    alt={`The cover for ${game.sport_title}`}
                    variant="top"
                  />
                ) : null}
                <div className="card-body">
                  <div className="card-title">{game.sport_title}</div>
                  <p className="small">
                    Bookmakers: {game.bookmakers[0][0]}, {game.bookmakers[0][1]}
                  </p>
                  <p>{game.description}</p>
                  <p>
                    Home Team: {game.home_team} VS Away Team: {game.away_team}
                  </p>
                  <p key={game}>Odds: {game.markets[0][0]}</p>
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
