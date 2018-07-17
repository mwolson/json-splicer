const fs = require('fs')
const path = require('path')

const contents = fs.readFileSync(path.resolve(__dirname, '../data/facets.json'))

module.exports = contents
