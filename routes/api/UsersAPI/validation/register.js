import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateRegisterInput(data) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (!Validator.isLength(data.name, { min: 2, max: 18 })) {
        errors.name = "Display Name must be between 2 and 18 characters";
    }

    //Username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }
    if (!Validator.isLength(data.username, { min: 3, max: 16 })) {
        errors.username = "Username must be between 3 and 16 characters";
    }

    //Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match, please try again";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};