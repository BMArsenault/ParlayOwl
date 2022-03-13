import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

// import Auth from '../utils/auth';
import { searchOddsApi } from '../utils/API';

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
        price: game.bookmakers[3].markets[''],
      }));

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
          <h1>Search for Games!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a game'
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
        <h2>
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : 'Please search for a game'}
        </h2>
        <CardColumns>
          {searchedGames.map((game) => {
            return (
              <Card key={game.gameId} border='dark'>
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  <p className='small'>Game Time: {game.time}</p>
                  <p className='small'>Home Team: {game.homeTeam}</p>
                  <p className='small'>Away Team: {game.awayTeam}</p>
                  <p className='small'>Bookmaker: {game.bookmakers}</p>
                  <p className='small'>Best Odds: {game.price}</p>
                  <Card.Text>{game.description}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchGames;