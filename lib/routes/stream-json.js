var express = require('express');
var router = express.Router();
const { chain }  = require('stream-chain')
const { parser } = require('stream-json')
const Pick = require('stream-json/filters/Pick')
const {streamArray} = require('stream-json/streamers/StreamArray')
const facets = require('../raw-facets')
const offers = require('../raw-offers')

router.get('/facets', function(req, res, next) {
  const pipeline = chain([
    Pick.withParser({ filter: 'facets' }),
    streamArray(),
  ])
  pipeline.on('data', ({ key, value }) => {
    if (key === 0) {
      res.write('{"facets":[')
    } else {
      res.write(',')
    }
    res.write(JSON.stringify(value))
  })
  pipeline.on('end', () => {
    res.write(']}')
    res.end()
  })

  res.set('Content-Type', 'application/json');
  pipeline.write(facets)
  pipeline.end()
});

router.get('/offers', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.send(offers)
});

module.exports = router;
