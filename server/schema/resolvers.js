const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async (parent, args, context, info) => {
            return await User.find();
        },
        user: async (parent, args, context, info) => {
            // check that at least one arg is provided
            if (!args._id && !args.username && !args.email) {
                throw new AuthenticationError('Must enter a username, password, or user ID');
            }
            
            const where = {};
            if (args._id) {
                where._id = args._id
            }
            if (args.email) {
                where.email = args.email
            }
            if (args.username) {
                where.username = args.username
            }

            return await User.findOne(where)
        },
    },
    Mutation: {
        login: async (parent, args, context, info) => {
            // find the requested user by username
            const user = await User.findOne({ username: args.username})
            // throw an auth error if the user is not found
            if (!user) {
                throw new AuthenticationError('No user found with that username.')
            }

            // if user found, validate the password
            const isCorrectPw = await user.isCorrectPassword(args.password);
            if (!isCorrectPw) {
                throw new AuthenticationError('Invalid password')
            }

            // sign a token with the found user object
            const token = signToken(user);
            // return the token and the user
            return {
                token,
                user,
            }
        },
        addUser: async (parent, args, context, info) => {
            // await creation of new user with the username, password, and email in the args
            const newUser = await User.create(args);
            // sign a token using the new user object
            const token = signToken(newUser)
            // return the user and token
            return {
                user: newUser,
                token
            }
        },
        updateUser: async (parent, args, context, info) => {
            return await User.findByIdAndUpdate(args._id, args, { new: true });
        },
        deleteUser: async (parent, args, context, info) => {
            return await User.findByIdAndDelete(args._id);
        },
    },
}


module.exports = resolvers;