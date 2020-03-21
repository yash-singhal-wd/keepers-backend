const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 2048
    },
    info: {
        type: Array,
        default: []
    }
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        _.pick(this, ["name", "email", "_id"]),
        config.get("jwtPrivateKey")
    );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .min(3)
            .max(255),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required()
            .min(10)
            .max(255),
        password: Joi.string()
            .required()
            .min(6)
            .max(32)
    });

    return schema.validate(user);
}

module.exports = { User, validate: validateUser };