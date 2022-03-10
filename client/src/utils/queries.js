import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me {
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