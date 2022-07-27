const { User, MenuItem, Category, Order } = require('../models');
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
        menuItem: async (parent, { _id }) => {
            return await MenuItem.findById(_id).populate('category');
        },
        menuItems: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }
            return await MenuItem.find(params).populate('category');
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.menuItems',
                    populate: 'category'
                });

                return user.orders.id(_id);
            }
        },
        // checkout: async (parent, args, context) => {
        //     const url = new URL(context.headers.referer).origin;
        //     const order = new Order({ menuItems: args.menuItems });
        //     const line_items = [];

        //     const { menuItems } = await order.populate('menuItems');

        //     for (let i=0; i < menuItems.length; i++) {
        //         const menuItem = await stripe.menuItems.create({
        //             name: menuItems[i].name,
        //             description: menuItems[i].description,
        //             images: [`${url}/images/${menuItems[i].image}`]
        //         });
        //         const price = await stripe.prices.create({
        //             product: menuItem.id,
        //             unit_amount: menuItems[i].price * 100,
        //             currency: 'usd'
        //         });

        //         line_items.push({
        //             price: price.id,
        //             quantity: 1
        //         });
        //     }

        //     const session = await stripe.checkout.sessions.create({
        //         payment_method_types: ['card'],
        //         line_items,
        //         mode: 'payment',
        //         success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        //         cancel_url: `${url}/`
        //     });

        //     return { session: session.id };
        // }
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
        addOrder: async (parent, { menuItems }, context) => {
            if (context.user) {
                const order = new Order({ menuItems });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Please login to continue');
        }
    },
}


module.exports = resolvers;