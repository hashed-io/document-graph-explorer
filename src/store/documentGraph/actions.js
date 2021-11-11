export const getPropsType = async function ({ commit }, params) {
  try {
    const response = await this.$apolloApi.getPropsType({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get type', e)
    throw new Error(e)
  }
}
export const getDocumentsByDocId = async function ({ commit }, params) {
  try {
    const response = await this.$apolloApi.getDocumentsByDocId({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get documents by doc id', e)
    throw new Error(e)
  }
}
export const getDocuments = async function ({ commit }, params) {
  try {
    const response = await this.$apolloApi.getDocuments({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get documents', e)
    throw new Error(e)
  }
}
export const getAllDocuments = async function ({ commit }, params) {
  try {
    const response = await this.$apolloApi.getAllDocuments({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get all documents', e)
    throw new Error(e)
  }
}
export const getSchema = async function ({ commit }, params) {
  try {
    const response = await this.$apolloApi.getSchema({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get documents', e)
    throw new Error(e)
  }
}
