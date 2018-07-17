const fs = require('fs')
const path = require('path')

const contents = fs.readFileSync(path.resolve(__dirname, '../data/offers.json'))

module.exports = contents
