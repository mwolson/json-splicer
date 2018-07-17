const axios = require('axios')
const config = require('./config')

const identity = data => data

async function getFacets(eventId, { responseType='text', transformResponse=identity }={}) {
  const { apikey, apisecret, url } = config.ismds
  const params = {
    apikey,
    apisecret,
    by: 'offers',
    show: 'listpricerange',
    embed: 'offer',
  }

  const response = await axios.get(`${url}/event/${eventId}/facets`, {
    params,
    responseType,
    transformResponse,
  })

  return response.data
}

module.exports = {
  getFacets,
}
