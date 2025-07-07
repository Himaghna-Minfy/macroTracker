const mongoose = require('mongoose');

const DiaryEntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    meal_type: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'snack'],
        required: true
    },
    log_date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('DiaryEntry', DiaryEntrySchema);