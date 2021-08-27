export const saveDaoData = async function ({ commit, dispatch }, params) {
  try {
    const accountName = this.getters['accounts/account']
    // const response = await this.$daoApi.saveDaoData({ ...params })
    // console.log('actions.js*********')
    // console.log({ ...params, accountName })
    // console.log('actions.js*********')
    // await this.$daoApi.saveDaoData({ ...params, accountName })
    const response = await this.$daoApi.saveDaoData({ ...params, accountName })
    return response
  } catch (e) {
    console.error('An error ocurred while trying to save account info', e)
    throw new Error(e)
  }
}
