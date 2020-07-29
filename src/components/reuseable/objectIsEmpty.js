

let validAddr = false;

module.exports = function objectIsEmpty(obj) {
    for (let key in obj) {
        if (obj[key] != null && obj[key] !== "")
            return false;
    }
    return true;
};