var express = require('express');
var router = express.Router();
const facets = require('../raw-facets')
const offers = require('../raw-offers')
const FacetsParser = require('../facets-parser')

router.get('/facets', function(req, res, next) {
  let value
  const parser = new FacetsParser()
  parser.onValue = function() {
    value = this.value
  }
  parser.write(facets)

  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(value))
});

router.get('/offers', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.send(offers)
});

module.exports = router;
