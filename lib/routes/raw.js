var express = require('express');
var router = express.Router();
const facets = require('../raw-facets')
const offers = require('../raw-offers')

router.get('/facets', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.send(facets)
});

router.get('/offers', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.send(offers)
});

module.exports = router;
