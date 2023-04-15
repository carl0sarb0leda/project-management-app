const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./schema/schema");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
app.all("/graphql", createHandler({ schema, graphiql: true }));

app.listen(port, console.log(`The server is running in port ${port}`));
