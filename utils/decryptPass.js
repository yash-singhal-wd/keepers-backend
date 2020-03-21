const config = require("config");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(config.get("cryptrKey"));

function decryptPass(arr) {
    for (let val of arr) {
        val.pass = cryptr.decrypt(val.pass);
    }
    return arr;
}

module.exports = { decryptPass };