import BaseEosApi from './BaseEosApi'
import { gql } from 'apollo-boost'
class ApolloApi extends BaseEosApi {
  constructor ({
    eosApi,
    apollo,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        table: '',
        tableId: 'id',
        defaultSortField: 'key'
      }
    )
    this.apollo = apollo
  }
  changeEndpointApollo ({ client }) {
    this.apollo = client
  }
  async getPropsType ({ type }) {
    const query = gql`
    {
      __type(name: "${type}") {
        fields {
          name
          type {
            name
            kind
            ofType {
              kind
              name
              ofType{
                kind
                name
              }
            }
          }
        }
      }
    }
    `
    const { data } = await this.apollo.query({ query: query, errorPolicy: 'ignore', fetchPolicy: 'no-cache' })
    return data
  }
  async getDocumentsByDocId ({ byElement, props, type, docInterface, isHashed }) {
    if (!props) {
      props = ''
    }
    const query = gql`
      query {
        query${type}(filter: {${isHashed ? 'hash' : 'docId'}: { eq: "${byElement}"} } ) {
          ${docInterface ? localStorage.getItem('documentInterface').toString() : ''}
          ${props}
        }
      }
    `

    const { data } = await this.apollo.query({ query, errorPolicy: 'ignore', fetchPolicy: 'no-cache' })
    return data
  }
  async getDocuments ({ offset, limit, props, type }) {
    if (!props) {
      props = ''
    }
    const query = gql`
      query  {
        query${type}(first:${limit}, offset: ${offset}, order: {desc: createdDate}) {
          ${localStorage.getItem('documentInterface')}
          ${props}
        }
      }
    `
    const { data } = await this.apollo.query({ query, fetchPolicy: 'no-cache' })
    console.log('data----------------------')
    console.log(data)
    console.log('data----------------------')
    return data
  }
  async getAllDocuments ({ type }) {
    const query = gql`
    query {
      query${type} {
          ${localStorage.getItem('documentInterface')}
        }
      }
    `
    const { data } = await this.apollo.query({ query, fetchPolicy: 'no-cache' })
    return data
  }
  async getSchema () {
    const query = gql`
    {
      __schema{
        types {
          kind
          name
          fields{
            name
            type{
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
    const { data } = await this.apollo.query({ query, fetchPolicy: 'no-cache' })
    return data
  }
  async getContractInfo () {
    const query = gql`
    query{
      queryDoccacheConfig{
        contract
        eosEndpoint
        documentsTable
        edgesTable
      }
    }
    `
    const { data } = await this.apollo.query({ query, fetchPolicy: 'no-cache' })
    return data
  }
  async getAllTypes () {
    const query = gql`
    {
      __schema{
        types{
          name
          interfaces{
            name
          }
        }
      }
    }
    `
    const { data } = await this.apollo.query({ query, fetchPolicy: 'no-cache' })
    return data
  }
  async getCertificate ({ docId }) {
    const query = gql`
      query {
        queryCertificate(filter: { docId: { eq: "${docId}" } }) {
          fixedDetails_notes_s
          fixedDetails_signature_s
        }
      }
    `
    const { data } = await this.apollo.query({ query, fetchPolicy: 'no-cache' })
    return data
  }
}

export default ApolloApi
