const mongoose = require('mongoose');
const Food = require('../models/Food');
require('dotenv').config();

const foods = [
    {
        name: 'Chicken Breast',
        calories_per_100g: 165,
        protein_per_100g: 31,
        carbs_per_100g: 0,
        fat_per_100g: 3.6,
        is_veg: false,
        category: 'meat'
    },
    {
        name: 'Brown Rice',
        calories_per_100g: 111,
        protein_per_100g: 2.6,
        carbs_per_100g: 23,
        fat_per_100g: 0.9,
        is_veg: true,
        category: 'grains'
    },
    {
        name: 'Banana',
        calories_per_100g: 89,
        protein_per_100g: 1.1,
        carbs_per_100g: 23,
        fat_per_100g: 0.3,
        is_veg: true,
        category: 'fruits'
    },
    {
        name: 'Broccoli',
        calories_per_100g: 34,
        protein_per_100g: 2.8,
        carbs_per_100g: 7,
        fat_per_100g: 0.4,
        is_veg: true,
        category: 'vegetables'
    },
    {
        name: 'Almonds',
        calories_per_100g: 579,
        protein_per_100g: 21,
        carbs_per_100g: 22,
        fat_per_100g: 50,
        is_veg: true,
        category: 'nuts'
    },
    {
        name: 'Whole Milk',
        calories_per_100g: 61,
        protein_per_100g: 3.2,
        carbs_per_100g: 4.8,
        fat_per_100g: 3.3,
        is_veg: true,
        category: 'dairy'
    },
    {
        name: 'Eggs',
        calories_per_100g: 155,
        protein_per_100g: 13,
        carbs_per_100g: 1.1,
        fat_per_100g: 11,
        is_veg: false,
        category: 'meat'
    },
    {
        name: 'Lentils',
        calories_per_100g: 116,
        protein_per_100g: 9,
        carbs_per_100g: 20,
        fat_per_100g: 0.4,
        is_veg: true,
        category: 'legumes'
    }
];

const seedFoods = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing foods
        await Food.deleteMany({});
        console.log('Cleared existing foods');

        // Insert new foods
        await Food.insertMany(foods);
        console.log('Foods seeded successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding foods:', error);
        process.exit(1);
    }
};

seedFoods();