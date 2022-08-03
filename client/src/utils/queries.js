import { gql } from '@apollo/client';

export const ALL_USERS = gql`
    query ALL_USERS {
        users {
            _id
            username
            email
            orders {
                _id
                purchaseDate
                menuItems {
                    _id
                    name
                    description
                    image
                    price
                    category {
                    _id
                    name
                    }
                }
            }
        }
    }
`

export const GET_USER = gql`
    query GET_USER($_id: ID, $username: String, $email: String) {
        user(_id: $_id, username: $username, email: $email) {
            _id
            username
            email
            orders {
                _id
                purchaseDate
                menuItems {
                    _id
                    name
                    description
                    image
                    price
                    category {
                    _id
                    name
                    }
                }
            }
        }
    }
`

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`

export const GET_MENUITEM = gql`
    query MenuItem($_id: ID!) {
        menuItem(_id: $_id) {
            _id
            name
            description
            image
            price
            ingredients
            category {
                _id
                name
            }
        }
    }
`

export const GETMANY_MENUITEMS = gql`
    query MenuItem($category: ID, $name: String) {
        menuItems(category: $category, name: $name) {
            _id
            name
            description
            image
            price
            ingredients
            category {
                _id
                name
            }
        }
    }
`

export const GET_ORDER = gql`
    query Order($_id: ID!) {
        order(_id: $_id) {
            _id
            purchaseDate
            menuItems {
                _id
                name
                description
                image
                price
                category {
                _id
                name
                }
            }
        }
    }
`

export const QUERY_CHECKOUT = gql`
    query getCheckout($menuItems: [ID]!) {
        checkout(menuItems: $menuItems) {
            session
        }
    }
`;