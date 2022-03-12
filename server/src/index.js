
const express = require("express");
const routeHandler = require("./src/route");

const app = express();

app.use("/graphql", routeHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));