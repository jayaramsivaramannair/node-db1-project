const express = require("express");

const server = express();
const accountsRouter = require("./accounts/accounts-router.js");

server.use(express.json());

server.use("/api/accounts", accountsRouter)

server.get('/', (req, res) => {
    res.status(200).json({
        message: `Welcome to the Relational Database Management Sprint`
    })
})

module.exports = server;
