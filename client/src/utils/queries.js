import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      gameCount
      savedGames {
        gameId
        SportsTitle
        description
        home_team
        away_team
      }
    }
  }
`;
