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

export const SAVE_BAR = gql`
  mutation saveBar($businessId: String!, $name: [String], $alias: String!, $rating: String!, $url: String) {
    saveBar(businessId: $businessId, name: $name, alias: $alias, rating: $rating, url: $url) {
      _id
      username
      barCount
      savedBars {
        businessId
        name
        alias
        rating
        url
      }
    }
  }
`;

export const REMOVE_BAR = gql`
  mutation removeBar($businessId: String!) {
    removeBar(businessId: $businessId) {
        _id
        barCount
        savedBars {
          businessId
          name
          alias
          rating
          url
        }
    }
  }
`;