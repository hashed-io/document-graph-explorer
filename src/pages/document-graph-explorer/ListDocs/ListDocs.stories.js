import Vuex from 'vuex'
import ListDocs from './ListDocs.vue'
import { ApolloClient, gql } from 'apollo-boost'

export default {
  title: 'Document Explorer/ List Docs',
  component: ListDocs,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ListDocs },
  template: `
  <div>
  <ListDocs v-bind="$props" />
  </div>
  `,
  store: new Vuex.Store({
    modules: {
      documentGraph: {
        namespaced: true,
        state: {
          stackNavigation: [],
          document: undefined,
          typeCatalog: undefined,
          isEdit: false,
          isHashed: false,
          typesWithSystemNode: undefined,
          contractInfo: undefined,
          documentInterface: undefined,
          endpointApollo: undefined
        },
        actions: {
          async getPropsType ({ commit }, params) {
            const client = new ApolloClient({
              uri: process.env.APOLLO_URL
            })
            const query = gql`
              {
                __type(name: "${params.type}") {
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
            const { data } = await client.query({ query: query, errorPolicy: 'ignore', fetchPolicy: 'no-cache' })
            console.log(data)
          }
        },
        getters: {
          getDocument: state => { return state.document },
          getCatalog: state => { return state.isEdit },
          getIsEdit: state => { return state.isEdit },
          getDocInterface: state => { return state.documentInterface },
          getTypesWithSystemNode: state => { return state.typesWithSystemNode }
        }
      },
      accounts: {
        namespaced: true,
        state: {
          signUpForm: {
            account: null,
            smsNumber: null
          },
          account: null,
          autoLogin: false,
          loading: {}, // Wallets loading status
          requestAccount: false,
          availableAccounts: {
            list: {
              data: [],
              loaded: true
            }
          }
        }
      },
      general: {
        namespaced: true,
        mutations: {
          setErrorMsg (state, errorMsg) {
            state.errorMsg = errorMsg
          },
          setSuccessMsg (state, successMsg) {
            state.successMsg = successMsg
          },
          setIsLoading (state, isLoading) {
            state.isLoading = isLoading
          }
        }
      }
    }
  })
})

export const Base = Template.bind({})
Base.args = {
}
export const Example = Template.bind({})
Example.args = {
}
