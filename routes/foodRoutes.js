const express = require('express');
const {
    searchFoods,
    addFoodToDiary,
    addWaterLog,
    addWeightLog
} = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search', protect, searchFoods);
router.post('/diary', protect, addFoodToDiary);
router.post('/water', protect, addWaterLog);
router.post('/weight', protect, addWeightLog);

module.exports = router;