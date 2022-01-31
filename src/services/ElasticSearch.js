import axios from 'axios'
// import response from './response'
class ElasticSearchApi {
  async search ({ search, params }) {
    var responseElastic
    var data = JSON.stringify({
      'from': params.from,
      'size': params.size,
      'query': {
        'multi_match': {
          'query': search,
          'fuzziness': params.fuzziness,
          'fields': params.fields
        }
      },
      'highlight': {
        'fields': {
          '*': {}
        }
      }
    })
    var config = {
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': `ApiKey ${params.apikey}`,
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'same-origin',
      data: data
    }
    try {
      responseElastic = await axios.post(params.endpoint, data, config)
      return responseElastic.data
    } catch (e) {
      throw new Error(e)
    }
  }
}

export default ElasticSearchApi
