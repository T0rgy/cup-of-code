const mongoose = require('mongoose');

const { Schema }  = mongoose;

const menuItemSchema = new Schema ({
    name: { 
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.50
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    ingredients: [{
        type: String,
    }],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema)

module.exports = MenuItem;