const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

function checkObjectId(req, res, next) {
    const schema = Joi.object({
        _id: Joi.objectId()
    });
    const { error } = schema.validate({ _id: req.params.id });
    if (error) res.status(400).send("Wrong mongoId.");
    else next();
}

module.exports = { checkObjectId };