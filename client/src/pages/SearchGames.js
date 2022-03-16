import React, { useState } from "react";
import Auth from "../utils/auth";
import { searchOddsApi } from "../utils/API";
import YelpSearch from "../components/YelpSearch";
import { FaDollarSign } from "react-icons/fa";
const SearchGames = () => {
  // create state for holding returned google api data
  const [searchedGames, setSearchedGames] = useState([]);
  // create state for holding our search field data
  const [values, setValues] = useState({
    id: "",
  });

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
      const gameData = items.map((game) => ({
        gameId: game.id,
        title: game.sport_title || ["No title to display"],
        time: game.commence_time,
        homeTeam: game.home_team,
        awayTeam: game.away_team,
        bookmakers: game.bookmakers[0].title,
        marketAwayOdds: game.bookmakers[0].markets[0].outcomes[0].price,
        marketHomeOdds: game.bookmakers[0].markets[0].outcomes[1].price,
      }));
      setSearchedGames(gameData);
      console.log(gameData);
      setValues("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {/* <h1>Search for Games!</h1> */}
      {Auth.loggedIn() ? (
        <>
          <div className={"donation-container"}>
            <a className={"donation-button"} href="/payment">
              <FaDollarSign size="40px" />
            </a>
          </div>
        </>
      ) : null}
      <div className="m-3">
        <div className="dropdown">
          <button className="dropdown-btn">Search Leagues</button>
          <div className="dropdown-content">
            <nav className="sports-games-list-container">
              <ul className="sports-game-list">
                <li
                  className="sports-game-list-items"
                  onClick={handleClick}
                  id="upcoming"
                >
                  All
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
        <span className="game-text ml-3">
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : "Choose a league to view games"}
        </span>
        <div>
          <div className=" flexbox">
            <div className="max-width">
              <div>
                <div className="card-container">
                  {searchedGames.map((game) => {
                    return (
                      <div className="center" key={game.gameId}>
                        <h3 className="game-title">
                          {game.title} <br />{" "}
                          <span className="bookmaker">{game.bookmakers}</span>
                        </h3>
                        {/* <h3 className="small game-title">{game.bookmakers}</h3> */}
                        <br />
                        <p>
                          <span className="small">Home Team: </span>
                          {game.homeTeam}
                        </p>
                        <p>
                          <span className="small">Odds:</span>
                          {game.marketHomeOdds}
                        </p>
                        <p>
                          <span className="small">Away Team: </span>
                          {game.awayTeam}
                        </p>
                        <p>
                          <span className="small">Odds: </span>
                          {game.marketAwayOdds}
                        </p>
                        <p>
                          <span className="small">Game Time: </span>
                          {game.time}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="ml-5 spacing">
              <YelpSearch />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchGames;
