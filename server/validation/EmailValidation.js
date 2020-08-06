const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateEmail(email) {
    let error = "";
// Convert empty fields to an empty string for Validator functions
    email = !isEmpty(email) ? email : "";
// Check Email
    if (isEmpty(email)) {
        error = "Email field is required";
    } else if (!Validator.isEmail(email)) {
        error = "Email is invalid";
    }
    return {
        error,
        isValid: isEmpty(error)
    };
};