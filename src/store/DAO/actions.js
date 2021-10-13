export const initDao = async function ({ commit, dispatch }, params) {
  try {
    const accountName = this.getters['accounts/account']
    const response = await this.$daoApi.InitDao({ ...params, accountName })
    console.log('initDao', response)
    return response
  } catch (e) {
    console.error('An error ocurred while trying to Init DAO', e)
    throw new Error(e)
  }
}
export const createDao = async function ({ commit, dispatch }, params) {
  try {
    const accountName = this.getters['accounts/account']
    const response = await this.$daoApi.CreateDao({ ...params, accountName })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to save dao data', e)
    throw new Error(e)
  }
}
export const deployContract = async function ({ commit, dispatch }, accountName) {
  try {
    const response = await this.$daoApi.deployContract({ ...accountName })
    console.log('deployContract', response)
    return response
  } catch (e) {
    console.error('An error ocurred while trying to reset', e)
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
export const getAllDaos = async function ({ commit }, params) {
  try {
    commit('general/setIsLoading', true, { root: true })
    console.log(params)
    return this.$daoApi.getAllDaos({ ...params })
  } catch (e) {
    console.error('An error ocurred while trying to get all daos actions:', e)
    commit('general/setErrorMsg', e.message || e, { root: true })
    throw new Error(e)
  } finally {
    commit('general/setIsLoading', false, { root: true })
  }
}
export const createDaoSimple = async function ({ commit, dispatch }, params) {
  try {
    const accountName = this.getters['accounts/account']
    const response = await this.$daoApi.CreateDao({ ...params, accountName })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to save basic dao data ', e)
    throw new Error(e)
  }
}
export const deployContractSimple = async function ({ commit, dispatch }, params) {
}
export const initDaoSimple = async function ({ commit, dispatch }, params) {
}
export const updateDaoSimple = async function ({ commit, dispatch }, params) {
}
