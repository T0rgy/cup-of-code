const connection = require('../config/connection');
const { User, Category, MenuItem } = require('../models');


connection.on('open', async () => {
    // delete all categories
    await Category.deleteMany();

    // create categories
    const categories = await Category.insertMany([
        { name: 'Breakfast' },
        { name: 'Sandwiches' },
        { name: 'Drinks' },
        { name: 'Pastries/Desserts' }
    ]);

    console.log('categories seeded');

    await MenuItem.deleteMany();

    const menuItems = await MenuItem.insertMany([
        {
            name: 'Crepe Supreme',
            category: categories[0]._id,
            description: 'A savory stuffed crepe.',
            image: 'crepe-supreme.jpg',
            price: '10',
            ingredients: 'Scrambled Egg, Chorizo, Avacado, Tortilla Crips'
        },
        {
            name: 'Nutella Crepe',
            category: categories[3]._id,
            description: 'A sweet stuffed crepe.',
            image: 'nutella-crepe.jpg',
            price: '10',
            ingredients: 'Crepe, Nutella, Strawberries'
        },
        {
            name: 'Basic Breakfast',
            category: categories[0]._id,
            description: "You're run of the mill breakfast Mom would always make.",
            image: 'basic-breakfast.jpg',
            price: '10.50',
            ingredients: 'Two Eggs, Bacon/Sausage, Potatoes, Sourdough Toast'
        },
        {
            name: 'Biscuits and Sausage Gravy',
            category: categories[0]._id,
            description: 'Two crispy handmade biscuits slathered in a delicious sausage Gravy.',
            image: 'biscuits-sausage-gravy.webp',
            price: '15.50',
            ingredients: 'Biscuits, Sausage, Sausage Gravy Mix, Green Onion'
        },
        {
            name: 'Egg Scramble (vg)',
            category: categories[0]._id,
            description: 'Vegitarian egg scramble',
            image: 'egg-scramble.jpg',
            price: '12',
            ingredients: 'Kale, Bell Peppers, Broccoli, Mushrooms, Potatoes'
        },
        {
            name: 'Avocado Toast (v)',
            category: categories[0]._id,
            description: 'Toast topped with a hefty amount of Guacomole.',
            image: 'avocado-toast.jpeg',
            price: '8',
            ingredients: 'Wheat Toast, Avacado, Red Onion, Lime Marmalade, Piquillo Peppers'
        },
        {
            name: 'Ham & Swiss',
            category: categories[1]._id,
            description: 'Traditional Ham and Swiss sandwhich.',
            image: 'ham-swiss.jpg',
            price: '10',
            ingredients: 'Toasted Sourdough Toast, Ham, Swiss Cheese'
        },
        {
            name: 'BLT',
            category: categories[1]._id,
            description: 'The most famous sandwich on the market.',
            image: 'blt.jpg',
            price: '10',
            ingredients: 'Bacon, Lettuce, and Tomato duhhh...'
        },
        {
            name: 'Pork Belly',
            category: categories[1]._id,
            description: 'Spicy tender pork belly sandwhich.',
            image: 'pork-belly.jpg',
            price: '14',
            ingredients: 'Pork Belly, Kimchi, Spicy Mayo, Roll'
        },
        {
            name: 'Grilled Cheese (vg)',
            category: categories[1]._id,
            description: 'Sourdough bread loaded with the best cheese in Wisconsin.',
            image: 'grilled-cheese.jpg',
            price: '9',
            ingredients: 'Sourdough toast, Cheddar, Swiss, Gouda'
        },
        {
            name: 'Drip Coffee',
            category: categories[2]._id,
            description: 'House Blend Coffee',
            image: 'drip-coffee.jpg',
            price: '3',
            ingredients: ''
        },
        {
            name: 'Cold Brew',
            category: categories[2]._id,
            description: 'House Blend Cold Brew',
            image: 'cold-brew.jpg',
            price: '4',
            ingredients: ''
        },
        {
            name: 'Latte',
            category: categories[2]._id,
            description: 'Latte with choice of milk.',
            image: 'latte.jpeg',
            price: '4.5',
            ingredients: 'Soy Milk, Almond Milk, Oat Milk, Coconut Milk'
        },
        {
            name: 'Double espresso',
            category: categories[2]._id,
            description: 'This will wake you up.',
            image: 'double-espresso.jpg',
            price: '2.5',
            ingredients: ''
        },
        {
            name: 'Macchiato',
            category: categories[2]._id,
            description: 'Macchiato with choice of milk.',
            image: 'macchiato.jpg',
            price: '3.25',
            ingredients: 'Soy Milk, Almond Milk, Oat Milk, Coconut Milk'
        },
        {
            name: 'Chai Tea',
            category: categories[2]._id,
            description: 'Chia Tea with choice of milk.',
            image: 'chai-tea.jpg',
            price: '4.5',
            ingredients: 'Soy Milk, Almond Milk, Oat Milk, Coconut Milk'
        },
        {
            name: 'Green Juice',
            category: categories[2]._id,
            description: 'Fresh Blend of fruits/veggies.',
            image: 'green-juice.jpg',
            price: '7',
            ingredients: 'Apple, Celery, Cucumber, Kale, Pear'
        },
        {
            name: 'Orange Booster',
            category: categories[2]._id,
            description: 'Fresh Blend of fruits/veggies.',
            image: 'orange-juice.jpg',
            price: '7',
            ingredients: 'Apple, Carrot, Orange, Ginger'
        },
        {
            name: 'Bloody Mary',
            category: categories[2]._id,
            description: 'The kick you need in the morning.',
            image: 'bloody-mary.jpg',
            price: '9',
            ingredients: 'Tomato Juice, Vodka, Whatever is Laying Around in the Kitchen'
        },
        {
            name: 'Mimosa',
            category: categories[2]._id,
            description: 'The kick you need in the morning.',
            image: 'mimosa.jpg',
            price: '7',
            ingredients: 'Orange Juice, Champagne'
        },
        {
            name: 'Doughnut',
            category: categories[3]._id,
            description: 'Tastey chocolate covered doughtnut.',
            image: 'doughnut.jpg',
            price: '2',
            ingredients: ''
        },
        {
            name: 'Croissant',
            category: categories[3]._id,
            description: 'Flakey crossant',
            image: 'croissant.jpg',
            price: '3',
            ingredients: ''
        },
        {
            name: 'Apple Danish',
            category: categories[3]._id,
            description: 'Danish Pastry filled with apple filling.',
            image: 'apple-danish.jpg',
            price: '3',
            ingredients: ''
        },
        {
            name: 'New York Cheesecake',
            category: categories[3]._id,
            description: 'Rich New York style cheesecake.',
            image: 'cheesecake.jpg',
            price: '5',
            ingredients: ''
        },
        
    ]);

    console.log('menuItems seeded');
    

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