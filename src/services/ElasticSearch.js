import axios from 'axios'
// import response from './response'
class ElasticSearchApi {
  async search ({ search, params }) {
    var responseElastic
    var data = JSON.stringify({
      'from': 0,
      'size': 10,
      'query': {
        'multi_match': {
          'query': search,
          'fuzziness': 'auto',
          'fields': [
            '*'
          ]
        }
      }
    })
    var config = {
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': 'ApiKey QnpfOGVINEJlUDVxVEJhbGdvNXQ6UVZGN2NDbjNUV2FCQ2N2R1kyTmYtUQ==',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'same-origin',
      data: data
    }
    try {
      responseElastic = await axios.post('https://traceability.es.us-east4.gcp.elastic-cloud.com:9243/traceability-documents/_search', data, config)
      return responseElastic.data
    } catch (e) {
      throw new Error(e)
    }
  }
}

export default ElasticSearchApi
