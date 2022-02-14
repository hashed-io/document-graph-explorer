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
    // console.log(Object.keys(e))
    // console.log(e)
    console.error('An error ocurred while trying to get documents by doc id', e)
    throw new Error(e)
  }
}
export const getTypes = async function ({ commit }) {
  try {
    const response = await this.$apolloApi.getAllTypes()
    return response
  } catch (error) {
    console.error('An error ocurred while trying to get the types', error)
    throw new Error(error)
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
export const changeEndpoint = async function ({ commit }, params) {
  try {
    const response = await this.$apolloApi.changeEndpointApollo({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to change endpoint api', e)
    throw new Error(e)
  }
}
export const setLocalStorage = function ({ commit }, params) {
  localStorage.setItem(params.key, params.value)
}
export const getLocalStorage = function ({ commit }, params) {
  try {
    let apiEndpoint = localStorage.getItem(params.key)
    return apiEndpoint
  } catch (e) {
    console.error('An error ocurred while trying to retrieve api endpoint', e)
    throw new Error(e)
  }
}
export const getContractInformation = async function ({ commit }, params) {
  try {
    let contractInfo = await this.$apolloApi.getContractInfo()
    return contractInfo
  } catch (e) {
    return undefined
  }
}

export const getCertificate = async function ({ commit }, params) {
  try {
    const response = await this.$apolloApi.getCertificate({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get certitificate ', e)
    throw new Error(e)
  }
}
