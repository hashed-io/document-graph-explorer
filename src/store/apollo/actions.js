export const getType = async function ({ commit }, params) {
  try {
    const response = await this.$apolloApi.getType({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get documents', e)
    throw new Error(e)
  }
}
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

export const getMembers = async function ({ commit }, params) {
  try {
    const response = await this.$apolloApi.getMembers({ ...params })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get DHO by hash', e)
    throw new Error(e)
  }
}
