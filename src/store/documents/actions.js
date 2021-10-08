export const storeEntry = async function ({ commit, dispatch }, params) {
  try {
    const response = await this.$documentApi.StoreEntry({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to store Entry', e)
    throw new Error(e)
  }
}
export const delEntry = async function ({ commit, dispatch }, params) {
  console.log(params)
  try {
    const response = await this.$documentApi.DelEntry({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to delete Entry', e)
    throw new Error(e)
  }
}
export const initDao = async function ({ commit, dispatch }, params) {
  try {
    const response = await this.$documentApi.InitDao({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to init Dao', e)
    throw new Error(e)
  }
}

export const reset = async function ({ commit, dispatch }, params) {
  try {
    const response = await this.$documentApi.Reset()
    return response
  } catch (e) {
    console.error('An error ocurred while trying to reset', e)
    throw new Error(e)
  }
}

export const getDocuments = async function ({ commit, dispatch }, params) {
  try {
    const response = await this.$contractsApi.getDocuments({ ...params })
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
