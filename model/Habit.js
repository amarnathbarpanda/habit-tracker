const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dates: [{
        status: {
            type: String,
            default: 'none'
        }
    }],
    progress: {
        type: Number,
        default: 0
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    } 
}, {
    timestamps: true
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;