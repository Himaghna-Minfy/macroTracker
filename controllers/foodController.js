const Food = require('../models/Food');
const DiaryEntry = require('../models/DiaryEntry');
const WeightLog = require('../models/WeightLog');
const WaterLog = require('../models/WaterLog');

// @desc    Search foods
// @route   GET /api/foods/search?q=chicken
// @access  Private
const searchFoods = async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const foods = await Food.find({
            name: { $regex: q, $options: 'i' }
        }).limit(20);

        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add food to diary
// @route   POST /api/foods/diary
// @access  Private
const addFoodToDiary = async (req, res) => {
    try {
        const { food_id, quantity, meal_type, log_date } = req.body;

        // Validate food exists
        const food = await Food.findById(food_id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        const diaryEntry = await DiaryEntry.create({
            user: req.user._id,
            food: food_id,
            quantity,
            meal_type,
            log_date: new Date(log_date)
        });

        // Populate food details in response
        await diaryEntry.populate('food');

        res.status(201).json(diaryEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add water log
// @route   POST /api/foods/water
// @access  Private
const addWaterLog = async (req, res) => {
    try {
        const { quantity_ml, log_date } = req.body;

        const waterLog = await WaterLog.create({
            user: req.user._id,
            quantity_ml,
            log_date: new Date(log_date)
        });

        res.status(201).json(waterLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add weight log
// @route   POST /api/foods/weight
// @access  Private
const addWeightLog = async (req, res) => {
    try {
        const { weight_kg, log_date } = req.body;

        const weightLog = await WeightLog.create({
            user: req.user._id,
            weight_kg,
            log_date: new Date(log_date)
        });

        res.status(201).json(weightLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    searchFoods,
    addFoodToDiary,
    addWaterLog,
    addWeightLog
};