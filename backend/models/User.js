const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

// User Schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',  
    },
   
});

// Method to generate JWT Token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: '1d',  
    });
    return token;
};

// Validate function using Joi
const validate = (data) => {
    const schema = Joi.object({
        userName: Joi.string().required().label("User Name"), 
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};

// Model for User
const User = mongoose.model('User', userSchema);

module.exports =  User;