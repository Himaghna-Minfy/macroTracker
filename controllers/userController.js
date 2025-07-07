const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender,
                weight: user.weight,
                height: user.height,
                target_calories: user.target_calories,
                target_protein: user.target_protein,
                target_carbs: user.target_carbs,
                target_fat: user.target_fat,
                target_water: user.target_water,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.age = req.body.age || user.age;
            user.gender = req.body.gender || user.gender;
            user.weight = req.body.weight || user.weight;
            user.height = req.body.height || user.height;
            user.target_calories = req.body.target_calories || user.target_calories;
            user.target_protein = req.body.target_protein || user.target_protein;
            user.target_carbs = req.body.target_carbs || user.target_carbs;
            user.target_fat = req.body.target_fat || user.target_fat;
            user.target_water = req.body.target_water || user.target_water;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                age: updatedUser.age,
                gender: updatedUser.gender,
                weight: updatedUser.weight,
                height: updatedUser.height,
                target_calories: updatedUser.target_calories,
                target_protein: updatedUser.target_protein,
                target_carbs: updatedUser.target_carbs,
                target_fat: updatedUser.target_fat,
                target_water: updatedUser.target_water,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserProfile, updateUserProfile };