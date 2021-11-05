import ApolloClient from 'apollo-boost'

export default ({ store }) => {
  const client = new ApolloClient({
    uri: process.env.APOLLO_URL
  })

  store['$apollo'] = client
}
