export const searchDoc = async function ({ commit }, params) {
  try {
    const response = await this.$elasticSearchApi.search({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get document using search engine', e)
    throw new Error(e)
  }
}
