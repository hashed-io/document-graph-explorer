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

  async getDocuments () {
    const query = gql`
      query {
        queryDocument(first:5) {
          creator
          hash
          createdDate
          type
        }
      }
    `
    const { data } = await this.apollo.query({ query })
    return data
  }

  async getAssignment () {
    const query = gql`
    query {
      queryAssignment(first: 5){
        hash
        creator
        type
        details_description_s
      }
    }
    `
    const { data } = await this.apollo.query({ query })
    return data
  }

  async getAllDocuments () {
    const query = gql`
      query {
        queryDocument {
          creator
          hash
          createdDate
          type
        }
      }
    `
    const { data } = await this.apollo.query({ query })
    return data
  }

  async getDhoByHash ({ hash }) {
    const query = gql`
    query {
      getDho(hash: ${hash}) {
          creator
          hash
          createdDate
          type
        }
      }
    `
    const { data } = await this.apollo.query({ query })
    return data
  }

  async getMembers ({ hash }) {
    const query = gql`
    query {
      getMember(hash: ${hash}) {
          hash
          type
          creator
          details_member_n
          memberof {
            type
          }
        }
      }
    `
    const { data } = await this.apollo.query({ query })
    return data
  }
}

export default ApolloApi
