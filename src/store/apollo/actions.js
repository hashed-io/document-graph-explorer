export const getDocuments = async function ({ commit }) {
  try {
    const response = await this.$apolloApi.getDocuments()
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get documents', e)
    throw new Error(e)
  }
}

export const getAssignment = async function ({ commit }) {
  try {
    const response = await this.$apolloApi.getAssignment()
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get documents', e)
    throw new Error(e)
  }
}
