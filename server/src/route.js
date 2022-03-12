const express = require("express");
const router = express.Router();
const graphQLCLient = require("./graphql-client");
const queries = require("./query");

const { searchQuery, searchTotalQuery } = queries;

router.get("/", async (req, res) => {
  const { limit, term, location, offset } = req.query;

  ///Graphql query variables
  const variables = {
    term,
    location,
    limit: parseInt(limit),
    offset: parseInt(offset),
  };

  try {
    const data = await graphQLCLient.request(searchQuery, variables);
    res.send(JSON.stringify(data));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/total", async (req, res) => {
  const { limit, term, location, offset } = req.query;

  ///Graphql query variables
  const variables = {
    term,
    location,
    limit: parseInt(limit),
    offset: parseInt(offset),
  };

  try {
    const data = await graphQLCLient.request(searchTotalQuery, variables);
    res.send(JSON.stringify(data));
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;