import { gql } from '@apollo/client';

export const ALL_USERS = gql`
    query ALL_USERS {
        users {
            _id
            username
            email
        }
    }
`

export const GET_USER = gql`
    query GET_USER($_id: ID, $username: String, $email: String) {
        user(_id: $_id, username: $username, email: $email) {
            _id
            username
            email
        }
    }
`