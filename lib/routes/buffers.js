var express = require('express');
var router = express.Router();
const facets = require('../raw-facets')
const offers = require('../raw-offers')
const Parser = require('../buffer-slicer')

router.get('/facets', function(req, res, next) {
  let value
  const parser = new Parser()
  parser.write(facets)
  value = Buffer.concat(parser.values, parser.totalLength)

  res.set('Content-Type', 'application/json');
  res.send(value)
});

router.get('/offers', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.send(offers)
});

module.exports = router;
