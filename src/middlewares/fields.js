const { request, response } = require("express");
const { validationResult } = require("express-validator");


const fieldsValidator = (req = request, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = fieldsValidator;