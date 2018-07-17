require('dotenv').config()
env = process.env

const trailingSlash = new RegExp('/+$')

module.exports = {
  ismds: {
    apikey: env.ISMDS_APIKEY,
    apisecret: env.ISMDS_APISECRET,
    url: env.ISMDS_URL.replace(trailingSlash, ''),
  },
}
