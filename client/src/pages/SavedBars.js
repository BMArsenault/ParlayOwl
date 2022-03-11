import React from 'react';
import { Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

import { GET_ME } from '../utils/queries';
import { REMOVE_BAR } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBarId } from '../utils/localStorage';

const SavedBars = () => {
  const [removeBar] = useMutation(REMOVE_BAR);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  // create function that accepts the bar's mongo _id value as param and deletes the bar from the database
  const handleDeleteBar = async (businessId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBar({
        variables: {businessId: businessId}
      });
      // upon success, remove bar's id from localStorage
      removeBarId(businessId);
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
      <div className='container'>
        <div className='jumbotron'>
          <h1>Viewing saved bars!</h1>
        </div>
      </div>
      <Container>
        <h2>
          {userData.savedBars.length
            ? `Viewing ${userData.savedBars.length} saved ${userData.savedBars.length === 1 ? 'bar' : 'bars'}:`
            : 'You have no saved bars!'}
        </h2>
        <CardColumns>
          {userData.savedBars.map((bar) => {
            return (
              <Card key={bar.businessId}>
                {bar.image ? <Card.Img src={bar.image} alt={`The cover for ${bar.name}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{bar.name}</Card.Title>
                  <p className='small'>alias: {bar.alias}</p>
                  <br />
                  <p className='small'>rating: {bar.rating}</p>
                  <Card.Text>{bar.description}</Card.Text>
                  <Link className='text-light' to={bar.url}>
                    <p>Website</p>
                  </Link>
                  <Button className='' onClick={() => handleDeleteBar(bar.businessId)}>
                    Delete this Bar!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBars;