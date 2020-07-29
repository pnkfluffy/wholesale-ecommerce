const isEmpty = require("is-empty");

module.exports = function validateDeliverySizes(delivery) {
    let errors = {};
    // Check for empty fields
    if(isEmpty(delivery.ClientFirstName))
        errors.ClientFirstName = "First name can't be empty";
    if(isEmpty(delivery.ClientLastName))
        errors.ClientLastName = "Family name can't be empty";
    if(isEmpty(delivery.ClientAddr1))
        errors.ClientAddr1 = "This address line can't be empty";
    if(isEmpty(delivery.postal_code))
        errors.postal_code = "Postal code can't be empty";
    if(isEmpty(delivery.state))
        errors.state = "State can't be empty"
    if(isEmpty(delivery.city))
        errors.city = "City can't be empty"

    if(isEmpty(errors))
    {
        delivery.ClientAddr2 = isEmpty(delivery.ClientAddr2) ? "" : delivery.ClientAddr2;
        //check if address is valid
        if (delivery.postal_code.length > 5)
            errors.postal_code = "Postal code too long"
        else if (delivery.postal_code.length < 5)
            errors.postal_code = "Postal code too short"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};