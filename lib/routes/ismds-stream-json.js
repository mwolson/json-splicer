const express = require('express');
const asyncHandler = require('express-async-handler')
const { chain }  = require('stream-chain')
const { parser } = require('stream-json')
const Pick = require('stream-json/filters/Pick')
const { streamArray } = require('stream-json/streamers/StreamArray')
const api = require('../api')
const router = express.Router()

router.get('/await/facets/:eventId', asyncHandler(async function(req, res, next) {
  const pipeline = chain([
    Pick.withParser({ filter: 'facets' }),
    streamArray(),
  ])
  pipeline.on('data', ({ key, value }) => {
    if (key > 0) res.write(',')
    res.write(JSON.stringify(value))
  })
  pipeline.on('end', () => {
    res.write(']}')
    res.end()
  })

  const facets = await api.getFacets(req.params.eventId)

  res.set('Content-Type', 'application/json')
  res.write('{"facets":[')
  pipeline.write(facets)
  pipeline.end()
}))

router.get('/stream/facets/:eventId', asyncHandler(async function(req, res, next) {
  const pipeline = chain([
    Pick.withParser({ filter: 'facets' }),
    streamArray(),
  ])
  pipeline.on('data', ({ key, value }) => {
    if (key > 0) res.write(',')
    res.write(JSON.stringify(value))
  })
  pipeline.on('end', () => {
    res.write(']}')
    res.end()
  })

  const facets = await api.getFacets(req.params.eventId, { responseType: 'stream' })

  res.set('Content-Type', 'application/json')
  res.write('{"facets":[')
  facets.pipe(pipeline)
}))

router.get('/offers', function(req, res, next) {
  res.set('Content-Type', 'application/json')
  res.send(offers)
})

module.exports = router
