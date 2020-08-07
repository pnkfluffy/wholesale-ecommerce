const Validator = require("validator");
const isEmpty = require("is-empty");
const User = require('../schemas/userSchema')

module.exports = async function validateEmail(email) {
    let error = "";
    // Convert empty fields to an empty string for Validator functions
    email = !isEmpty(email) ? email : "";
    // Check Email
    let exists = await User.findOne({ email: email })
    if (isEmpty(email)) {
        error = "Email field is required";
    } else if (!Validator.isEmail(email)) {
        error = "Email is invalid";
    } else if (exists) {
        error = "Email taken"
    }
    return {
        error,
        isValid: isEmpty(error)
    };
};