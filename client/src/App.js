import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import SavedGames from './pages/SavedGames';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/NavBar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Navbar />
          <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/saved' component={SavedGames} />
            <Route exact path='/Login' component={LoginForm} />
            <Route exact path='/Signup' component={SignupForm} />
            <Route render={() => <h1 className=''>Wrong page!</h1>} />
          </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
