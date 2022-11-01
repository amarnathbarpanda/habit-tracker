const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltrounds = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    habits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit',
    }]
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltrounds);
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;