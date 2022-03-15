import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, CardColumns } from 'react-bootstrap';

// import Auth from '../utils/auth';
import { searchOddsApi } from '../utils/API';

import { FaDollarSign } from 'react-icons/fa';

const SearchGames = () => {
  // create state for holding returned google api data
  const [searchedGames, setSearchedGames] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create method to search for Games and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchOddsApi(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const items = await response.json();

      const gameData = items.map((game) => ({
        gameId: game.id,
        title: game.sport_title || ['No title to display'],
        time: game.commence_time,
        homeTeam: game.home_team,
        awayTeam: game.away_team,
        bookmakers: game.bookmakers[0].title,
        marketAwayOdds: game.bookmakers[0].markets[0].outcomes[0].price,
        marketHomeOdds: game.bookmakers[0].markets[0].outcomes[1].price,
      }));

console.log(gameData);
      setSearchedGames(gameData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='search'>
        <Container>
          <h1>Search leagues</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <div className="container card-main jumbotron-fluid">
          <h2>
            {searchedGames.length
              ? `Viewing ${searchedGames.length} results:`
              : 'Please choose a league to view games'}
          </h2>
          <CardColumns>
            {searchedGames.map((game) => {
              return (
                <div className="card center" key={game.gameId}>
                  <div className="card-header"><h3>{game.title}</h3></div>
                    <div className="card-container">
                      <p className='small bookmaker'>{game.bookmakers}</p>
                      <p className='small'>Home Team: {game.homeTeam}</p>
                      <p className='small'>Odds: {game.marketHomeOdds}</p>
                      <p className='small'>Away Team: {game.awayTeam}</p>
                      <p className='small'>Odds: {game.marketAwayOdds}</p>
                      <p className='small'>Game Time: {game.time}</p>
                    </div>
                </div>
              );
            })}
          </CardColumns>
        </div> 
      </Container>
      <div className={"donation-conteiner"}>
        <a className={"donation-button"} href='/payment'><FaDollarSign size="40px"/></a>
      </div>
    </>
  );
};

export default SearchGames;