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
    this.DocumentInterface = `
        docId
        docId_i
        hash
        type
        creator
        createdDate
    `
  }
  async getPropsType ({ type }) {
    const query = gql`
      { 
        __type(name:"${type}") {
          fields {
              name
            type{
              name
              kind
              ofType{
                kind
                name
              }
            }
          }  
        }
      }
    `
    const { data } = await this.apollo.query({ query })
    return data
  }
  async getDocumentsByDocId ({ docID, props, type }) {
    if (!props) {
      props = ''
    }
    const query = gql`
      query {
        query${type}(filter: {docId: { eq: "${docID}"} } ) {
          ${this.DocumentInterface}
          ${props}
        }
      }
    `
    const { data } = await this.apollo.query({ query })
    return data
  }
  async getDocuments ({ number, props, type }) {
    if (!props) {
      props = ''
    }
    const query = gql`
      query {
        query${type}(first:${number}) {
          ${this.DocumentInterface}
          ${props}
        }
      }
    `
    console.log(query)
    const { data } = await this.apollo.query({ query })
    return data
  }
  async getAllDocuments ({ type }) {
    const query = gql`
    query {
      query${type} {
          ${this.DocumentInterface}
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
        types{
          name
          fields{
              name
            type {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
          ofType{
            name
            kind
            
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
