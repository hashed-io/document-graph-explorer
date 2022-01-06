import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'
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
        contractAccount: Contracts.HYPHA,
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
    const { data } = await this.apollo.query({ query: query, errorPolicy: 'ignore' })
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

    const { data } = await this.apollo.query({ query, errorPolicy: 'ignore' })
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
    const { data } = await this.apollo.query({ query })
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
    const { data } = await this.apollo.query({ query })
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
    const { data } = await this.apollo.query({ query })
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
    const { data } = await this.apollo.query({ query })
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
    const { data } = await this.apollo.query({ query })
    return data
  }
}

export default ApolloApi
