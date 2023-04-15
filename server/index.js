require("dotenv").config();
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const connectDB = require("./config/db");

const schema = require("./schema/schema");
const port = process.env.PORT || 5000;

const app = express();
//Db instance
connectDB();
//Graphql instance
app.use("/graphql", createHandler({ schema, graphiql: true }));
//Port
app.listen(port, console.log(`The server is running in port ${port}`));
