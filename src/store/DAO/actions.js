export const initDao = async function ({ commit, dispatch }) {
  try {
    const accountName = this.getters['accounts/account']
    const response = await this.$daoApi.InitDao({ accountName })
    console.log('initDao', response)
    return response
  } catch (e) {
    console.error('An error ocurred while trying to Init DAO', e)
    throw new Error(e)
  }
}
export const saveAndDeployDao = async function ({ commit, dispatch }, params) {
  try {
    const accountName = this.getters['accounts/account']
    const response = await this.$daoApi.SaveAndDeployDao({ ...params, accountName })
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
    commit('general/setIsLoading', true, { root: true })
    const accountName = this.getters['accounts/account']
    console.log(params)
    return this.$daoApi.getDaos({
      ...params,
      accountName
    })
    // return response
  } catch (e) {
    console.error('An error ocurred while trying to get users action:', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
