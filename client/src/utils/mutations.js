import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation saveGame($gameId: String!, $SportsTitle: [String], $description: String!, $home_team: String!, $away_team: String) {
    saveGame(gameId: $gameId, SportsTitle: $SportsTitle, description: $description, home_team: $home_team, away_team: $away_team) {
      _id
      username
      gameCount
      savedGames {
        gameId
        SportTitle
        description
        home_team
        away_team
      }
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($gameId: String!) {
    removeGame(gameId: $gameId) {
        _id
        gameCount
        savedGames {
            gameId
            SportTitle
            description
            home_team
            away_team
        }
    }
  }
`;