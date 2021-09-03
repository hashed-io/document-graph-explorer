export const saveDaoData = async function ({ commit, dispatch }, params) {
  try {
    const accountName = this.getters['accounts/account']
    const response = await this.$daoApi.saveDaoData({ ...params, accountName })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to save dao data', e)
    throw new Error(e)
  }
}
export const updateDaoData = async function ({ commit, dispatch }, params) {
  try {
    const accountName = this.getters['accounts/account']
    const response = await this.$daoApi.updateDaoData({ ...params, accountName })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to update dao data', e)
    throw new Error(e)
  }
}

export const getDaos = async function ({ commit }, params) {
  try {
    const response = await this.$daoApi.getDaos(params)
    return response
  } catch (e) {
    console.error('An error ocurred while trying to get users action:', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
