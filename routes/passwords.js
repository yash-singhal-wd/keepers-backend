const express = require("express");
const config = require("config");
const passwordGenerator = require("password-generator");
const Cryptr = require("cryptr");
const Joi = require("@hapi/joi");

const { auth } = require("../middleware/auth");
const { checkDuplicateAccount } = require("../utils/checkDuplicateAccount");
const { checkAccountAndDelete } = require("../utils/checkAccountAndDelete");
const { decryptPass } = require("../utils/decryptPass");
const { User } = require("../models/users");

const cryptr = new Cryptr(config.get("cryptrKey"));
const router = express.Router();

router.post("/generate", auth, async(req, res) => {
    const { error } = validateGenerator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const generatedPass = passwordGenerator(req.body.length, req.body.memorable);
    res.send(generatedPass);
});

router.put("/store", auth, async(req, res) => {
    const { error } = validateStore(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ _id: req.user._id });
    if (checkDuplicateAccount(user.info, req.body.account))
        return res
            .status(400)
            .send("This account name already exists! Try a new one.");

    const encryptedPass = cryptr.encrypt(req.body.pass);
    user = await User.findByIdAndUpdate(
        req.user._id, { $push: { info: { account: req.body.account, pass: encryptedPass } } }, { new: true }
    );
    console.log(user);
    res.send(user);
});

router.get("/", auth, async(req, res) => {
    let user = await User.findOne({ _id: req.user._id }).select({
        info: 1,
        _id: 0
    });
    user = decryptPass(user.info);
    res.send(user);
});

router.delete("/", auth, async(req, res) => {
    const { error } = validateDelete(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ _id: req.user._id });

    const { isAccExist, newArray } = checkAccountAndDelete(
        user.info,
        req.body.account
    );
    if (!isAccExist) return res.status(400).send("Error! Try a different name!");

    user = await User.findByIdAndUpdate(
        req.user._id, { $set: { info: newArray } }, { new: true }
    );
    res.send(user.info);
});

function validateStore(body) {
    const schema = Joi.object({
        account: Joi.string()
            .required()
            .max(50)
            .min(1),
        pass: Joi.string()
            .min(6)
            .max(40)
            .required()
    });
    return schema.validate(body);
}

function validateGenerator(body) {
    const schema = Joi.object({
        length: Joi.number()
            .min(6)
            .max(40)
            .required(),
        memorable: Joi.boolean().required()
    });

    return schema.validate(body);
}

function validateDelete(body) {
    const schema = Joi.object({
        account: Joi.string()
            .required()
            .max(50)
            .min(1),
        pass: Joi.string()
    });

    return schema.validate(body);
}

module.exports = router;