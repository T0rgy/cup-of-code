const connection = require('../config/connection');
const { User, } = require('../models');

connection.on('open', async () => {
    // delete all users
    await User.deleteMany();

    // create new user
    await User.create({
        username: 'test',
        email: 'test@test.com',
        password: 'test1234'
    });

    process.exit(0);

})