var express = require('express');
var router = express.Router();
const facets = require('../raw-facets')
const offers = require('../raw-offers')

router.get('/facets', function(req, res, next) {
  const parsed = JSON.parse(facets)
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(parsed))
});

router.get('/offers', function(req, res, next) {
  const parsed = JSON.parse(offers)
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(parsed))
});

module.exports = router;
