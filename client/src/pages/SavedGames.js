import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import { GET_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';

import { FaDollarSign } from 'react-icons/fa';

const SavedGames = () => {
  const [removeGame] = useMutation(REMOVE_GAME);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  // create function that accepts the game's mongo _id value as param and deletes the game from the database
  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeGame({
        variables: {gameId: gameId}
      });
      // upon success, remove game's id from localStorage
      removeGameId(gameId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className=''>
        <Container>
          <h1>Viewing saved games!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedGames.length
            ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
            : 'You have no saved games!'}
        </h2>
        <CardColumns>
          {userData.savedGames.map((game) => {
            return (
              <Card key={game.gameId} border=''>
                {/* {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null} */}
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  <p className='small'>Home Team: {game.home_team}</p>
                  <br />
                  <p className='small'>Away Team: {game.away_team}</p>
                  <Card.Text>{game.description}</Card.Text>
                  <Button className='' onClick={() => handleDeleteGame(game.gameId)}>
                    Delete this Game!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      <div className={"donation-conteiner"}>
        <a className={"donation-button"} href='/payment'><FaDollarSign size="40px"/></a>
      </div>
    </>
  );
};

export default SavedGames;