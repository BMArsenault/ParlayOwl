import React, { useState, useEffect } from "react";
// import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { searchOddsApi } from "../utils/API";
import { CardColumns } from "react-bootstrap";
import YelpSearch from "../components/YelpSearch";
import YelpResults from "../components/YelpResults";

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
  // needs to be in use effect or else it will not work properly
  useEffect(() => {
    // function for the dropdown animation
    document.addEventListener("click", (e) => {
      // for the list item data attribute
      const listItem = document.querySelectorAll("data-list-item");
      // dropdown button data attribute
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
      listItem.onClick((list) => {
        if (list) {
          document
            .querySelectorAll("[data-dropdown].active")
            .forEach((dropdown) => {
              if (dropdown === currentDropdown)
                return dropdown.classList.remove("active");
            });
        }
      });
    });
  }, []);

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
                data-list-item
                className="sports-game-list-items"
                onClick={handleClick}
                id="upcoming"
              >
                All
              </li>
              <li
                data-list-item
                className="sports-game-list-items"
                onClick={handleClick}
                id="americanfootball_nfl"
              >
                NFL
              </li>
              <li
                data-list-item
                className="sports-game-list-items"
                onClick={handleClick}
                id="americanfootball_ncaaf"
              >
                College Football
              </li>
              <li
                data-list-item
                className="sports-game-list-items"
                onClick={handleClick}
                id="basketball_nba"
              >
                NBA
              </li>
              <li
                data-list-item
                className="sports-game-list-items"
                onClick={handleClick}
                id="baseball_mlb"
              >
                MLB
              </li>
              <li
                data-list-item
                className="sports-game-list-items"
                onClick={handleClick}
                id="icehockey_nhl"
              >
                NHL
              </li>
              <li
                data-list-item
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
        <div className="container card-main jumbotron-fluid">
          <h2 className="game-text">
            {searchedGames.length
              ? `Viewing ${searchedGames.length} results:`
              : "Please choose a league to view games"}
          </h2>
          <CardColumns>
            {searchedGames.map((game) => {
              return (
                <div className="card center" key={game.gameId}>
                  <div className="card-header">
                    <h3>{game.title}</h3>
                  </div>
                  <div className="card-container">
                    <p className="small bookmaker">{game.bookmakers}</p>
                    <p className="small">Home Team: {game.homeTeam}</p>
                    <p className="small">Odds: {game.marketHomeOdds}</p>
                    <p className="small">Away Team: {game.awayTeam}</p>
                    <p className="small">Odds: {game.marketAwayOdds}</p>
                    <p className="small">Game Time: {game.time}</p>
                  </div>
                </div>
              );
            })}
          </CardColumns>
        </div>
      </div>
      {Auth.loggedIn() ? (
        <>
          <div className={"donation-conteiner"}>
            <a className={"donation-button"} href="/payment">
              <FaDollarSign size="40px" />
            </a>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchGames;
