const mongoose = require('mongoose');
const DiaryEntry = require('../models/DiaryEntry');
const WaterLog = require('../models/WaterLog');
const WeightLog = require('../models/WeightLog');
const User = require('../models/User');

// @desc    Get dashboard data for a specific date
// @route   GET /api/dashboard?date=2024-01-15
// @access  Private
const getDashboardData = async (req, res) => {
    try {
        const { date } = req.query;
        
        if (!date) {
            return res.status(400).json({ message: 'Date is required' });
        }

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Get user targets
        const user = await User.findById(req.user._id);

        // Aggregate food diary data
        const foodData = await DiaryEntry.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user._id),
                    log_date: { $gte: startOfDay, $lte: endOfDay }
                }
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'food',
                    foreignField: '_id',
                    as: 'foodDetails'
                }
            },
            { $unwind: '$foodDetails' },
            {
                $group: {
                    _id: '$user',
                    total_calories: {
                        $sum: {
                            $multiply: [
                                '$quantity',
                                { $divide: ['$foodDetails.calories_per_100g', 100] }
                            ]
                        }
                    },
                    total_protein: {
                        $sum: {
                            $multiply: [
                                '$quantity',
                                { $divide: ['$foodDetails.protein_per_100g', 100] }
                            ]
                        }
                    },
                    total_carbs: {
                        $sum: {
                            $multiply: [
                                '$quantity',
                                { $divide: ['$foodDetails.carbs_per_100g', 100] }
                            ]
                        }
                    },
                    total_fat: {
                        $sum: {
                            $multiply: [
                                '$quantity',
                                { $divide: ['$foodDetails.fat_per_100g', 100] }
                            ]
                        }
                    },
                    entries: {
                        $push: {
                            _id: '$_id',
                            food_name: '$foodDetails.name',
                            quantity: '$quantity',
                            meal_type: '$meal_type',
                            calories: {
                                $multiply: [
                                    '$quantity',
                                    { $divide: ['$foodDetails.calories_per_100g', 100] }
                                ]
                            }
                        }
                    }
                }
            }
        ]);

        // Get water intake for the day
        const waterLogs = await WaterLog.find({
            user: req.user._id,
            log_date: { $gte: startOfDay, $lte: endOfDay }
        });

        const total_water = waterLogs.reduce((sum, log) => sum + log.quantity_ml, 0);

        // Get weight log for the day
        const weightLog = await WeightLog.findOne({
            user: req.user._id,
            log_date: { $gte: startOfDay, $lte: endOfDay }
        });

        // Prepare response
        const nutrition = foodData.length > 0 ? foodData[0] : {
            total_calories: 0,
            total_protein: 0,
            total_carbs: 0,
            total_fat: 0,
            entries: []
        };

        const dashboardData = {
            date,
            nutrition: {
                consumed: {
                    calories: Math.round(nutrition.total_calories),
                    protein: Math.round(nutrition.total_protein),
                    carbs: Math.round(nutrition.total_carbs),
                    fat: Math.round(nutrition.total_fat)
                },
                targets: {
                    calories: user.target_calories,
                    protein: user.target_protein,
                    carbs: user.target_carbs,
                    fat: user.target_fat
                },
                entries: nutrition.entries
            },
            water: {
                consumed: total_water,
                target: user.target_water
            },
            weight: weightLog ? weightLog.weight_kg : null
        };

        res.json(dashboardData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardData };