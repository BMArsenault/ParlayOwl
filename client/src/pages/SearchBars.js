import React, { useState } from 'react';
import { Jumbotron, Container, Form, Button, Card, CardColumns, } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { SAVE_BAR } from '../utils/mutations';
import Auth from '../utils/auth';
import { searchOddsApi } from '../utils/API';
import { getSavedBarIds } from '../utils/localStorage';

const SearchBars = () => {
  // create state for holding returned google api data
  const [searchedBars, setSearchedBars] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved BarId values
  const [savedBarIds, setSavedBarIds] = useState(getSavedBarIds());
  const [saveBar] = useMutation(SAVE_BAR);

  // create method to search for Bars and set state on form submit
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

      const { items } = await response.json();

      const barData = items.map((bar) => ({
        businessId: bar.businessId,
        name: bar.volumeInfo.name || ['No title to display'],
        alias: bar.volumeInfo.alias,
        rating: bar.volumeInfo.rating,
        url: bar.volumeInfo.url,
      }));

      setSearchedBars(barData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a bar to our database
  const handleSaveBar = async (barId) => {
    // find the bar in `searchedBars` state by the matching id
    const barToSave = searchedBars.find((bar) => bar.barId === barId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveBar({
        variables: barToSave
      })
      // if bar successfully saves to user's account, save bar id to state
      setSavedBarIds([...savedBarIds, barToSave.barId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='search'>
        <div class="container">
            <div>
              <div>
                <h1>Choose a sport</h1>
              </div>
              <div>
                <h1>
                  Betting Odds
                </h1>
                {/* <div class="card">
                    <div class="container">
                      <h4><b>{match.description}</b></h4>
                      <div>Architect & Engineer</div>
                      <div></div>
                    </div>
                  </div>   */}
              </div>
                <div>
                  <h1>Search for Bars!</h1>
                </div> 
                <form onSubmit={handleFormSubmit}>
                  <div class="wrap context-box">
                    <div class="search" xs={12} md={3}>
                      <Form.Control
                        name='searchInput'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type='text'
                        placeholder='Please enter city'
                      />
                    </div>
                    <div xs={8} md={2}>
                      <Button type='submit' variant='success' size='lg'>
                        Submit Search
                      </Button>
                    </div>
                  </div>
                </form>
                    </div>
                  </div>
              </Jumbotron>

      <Container>
        <h2>
          {searchedBars.length
            ? `Viewing ${searchedBars.length} results:`
            : 'Please search for a bar'}
        </h2>
        <CardColumns>
          {searchedBars.map((bar) => {
            return (
              <Card key={bar.barId} border='dark'>
                {bar.image ? (
                  <Card.Img src={bar.image} alt={`The cover for ${bar.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{bar.title}</Card.Title>
                  <p className='small'>Authors: {bar.authors}</p>
                  <Card.Text>{bar.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBarIds?.some((savedBarId) => savedBarId === bar.businessId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBar(bar.businessId)}>
                      {savedBarIds?.some((savedBarId) => savedBarId === bar.businessId)
                        ? 'This bar has already been saved!'
                        : 'Save this Bar!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBars;