const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

checkKeyStatus();

const { url, options } = require("./utils/dbutils");
const login = require("./routes/login");
const register = require("./routes/register");
const passwords = require("./routes/passwords");

const port = process.env.PORT || 4000;
mongoose
    .connect(url, options)
    .then(res => {
        app.listen(port, () =>
            console.log(`listening on port ${port} and connected to mongodb`)
        );
    })
    .catch(err => {
        console.log("here is the error", err);
    });

app.use(express.json());
app.use("/api/login", login);
app.use("/api/register", register);
app.use("/api/passwords", passwords);

function checkKeyStatus() {
    if (!config.get("jwtPrivateKey") || !config.get("cryptrKey")) {
        console.error(
            "FATAL!! Either or both of keepers_jwtKey and keepers_cryptrKey not set!"
        );
        process.exit(1);
    } else return;
}