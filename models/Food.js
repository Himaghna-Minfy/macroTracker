const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    calories_per_100g: {
        type: Number,
        required: true
    },
    protein_per_100g: {
        type: Number,
        required: true
    },
    carbs_per_100g: {
        type: Number,
        required: true
    },
    fat_per_100g: {
        type: Number,
        required: true
    },
    is_veg: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: ['grains', 'vegetables', 'fruits', 'dairy', 'meat', 'legumes', 'nuts', 'beverages', 'other'],
        default: 'other'
    }
}, { timestamps: true });

module.exports = mongoose.model('Food', FoodSchema);