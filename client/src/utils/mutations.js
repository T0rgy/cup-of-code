import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation LOGIN_USER($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`

export const ADD_USER = gql`
mutation ADD_USER($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`

export const UPDATE_USER = gql`
mutation UPDATE_USER($_id: ID, $email: String, $password: String, $username: String) {
    updateUser(_id: $_id, email: $email, password: $password, username: $username) {
      _id
      username
      email
    }
  }
`

export const DELETE_USER = gql`
mutation DELETE_USER($_id: ID) {
    deleteUser(_id: $_id) {
      _id
      username
      email
    }
  }
`

export const ADD_ORDER = gql`
  mutation addOrder($menuItems: [ID]!) {
    addOrder(menuItems: $menuItems) {
      _id
      purchaseDate
      menuItems {
        name
        _id
        description
        image
        price
        category {
          name
        }
      }
    }
  }
`

