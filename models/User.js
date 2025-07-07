const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false
    },
    age: {
        type: Number,
        required: [true, 'Please provide age'],
        min: 1
    },
    gender: {
        type: String,
        required: [true, 'Please provide gender'],
        enum: ['male', 'female', 'other']
    },
    weight: {
        type: Number,
        required: [true, 'Please provide weight in kg']
    },
    height: {
        type: Number,
        required: [true, 'Please provide height in cm']
    },
    // Daily targets
    target_calories: { type: Number, default: 2000 },
    target_protein: { type: Number, default: 150 },
    target_carbs: { type: Number, default: 200 },
    target_fat: { type: Number, default: 70 },
    target_water: { type: Number, default: 3000 }, // in ml
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);