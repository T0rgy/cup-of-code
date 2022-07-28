const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        orders: [Order]
    }

    type Auth {
        token: String!
        user: User
    }

    type Category {
        _id: ID
        name: String
    }

    type MenuItem {
        _id: ID
        name: String
        description: String
        image: String
        price: Float
        ingredients: [String]
        category: Category
    }

    type Order {
        _id: ID
        purchaseDate: String
        menuItems: [MenuItem]
    }

    type Checkout {
        session: ID
    }

    type Query {
        users: [User]
        user(_id: ID, username: String, email: String): User
        menuItem(_id: ID!): MenuItem
        menuItems(category: ID, name: String): [MenuItem]
        order(_id: ID!): Order
        checkout(menuItems: [ID]!): Checkout
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(_id: ID, email: String, password: String, username: String): User
        deleteUser(_id: ID): User
        addOrder(menuItems: [ID]!): Order
    }
`;

module.exports = typeDefs;