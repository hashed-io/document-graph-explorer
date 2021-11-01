// DHO created with simple register
export const adddao = async function ({ commit, dispatch }, params) {
  try {
    const response = await this.$documentsGeneralApi.Adddao({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to store Entry', e)
    throw new Error(e)
  }
}
export const storeEntry = async function ({ commit, dispatch }, params) {
  try {
    const response = await this.$documentsGeneralApi.StoreEntry({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to store Entry', e)
    throw new Error(e)
  }
}
export const storeAndDeleteEntry = async function ({ commit, dispatch }, params) {
  try {
    const response = await this.$documentsGeneralApi.StoreAndDeleteEntry({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to store Entry', e)
    throw new Error(e)
  }
}
export const delEntry = async function ({ commit, dispatch }, params) {
  console.log(params)
  try {
    const response = await this.$documentsGeneralApi.DelEntry({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to delete Entry', e)
    throw new Error(e)
  }
}

export const getDocuments = async function ({ commit, dispatch }, params) {
  try {
    const response = await this.$documentsGeneralApi.getDocuments({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to reset', e)
    throw new Error(e)
  }
}

export const getEdges = async function ({ commit, dispatch }, params) {
  try {
    const response = await this.$documentApi.getEdges({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to reset', e)
    throw new Error(e)
  }
}