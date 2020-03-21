// function passGen() {
//     let str = "";
//     while (str.length < 15) {
//         const char = Math.floor(Math.random() * 36).toString(36);
//         console.log(char);
//         if (parseInt(char)) continue;
//         else str += char;
//     }
//     return str;
// }

// console.log(passGen());
//-------------

// const jwt = require("jsonwebtoken");
// const _ = require("lodash");

// function generate(user) {
//     return jwt.sign(user, "hellooooooo");
// }

// const user = {
//     name: "yash",
//     email: "ibvfb@email.com",
//     password: "vfuhuegheib",
//     kuchbhi: "abe saaaleeee"
// };

// const res = generate(_.pick(user, ["name", "email", "password"]));
// console.log(res);

//--------------------

// const passGen = require("password-generator");

// console.log(passGen(12));

//--------------------

// const jwt = require("jsonwebtoken");

// console.log(jwt.sign({ a: 1 }, "helloo"));

//--------------------

const config = require("config");
console.log(config.get("cryptrKey"));