export const setBusinessEntityName = (state, businessEntityName) => {
  state.businessEntityName = businessEntityName
}
export const setExpirationDate = (state, expirationDate) => {
  state.expirationDate = expirationDate
}

export const setIsEdit = (state, _isEdit) => {
  state.isEdit = _isEdit
}

export const setDataForm = (state, _form) => {
  state.formStore = _form
}
export const setDaoName = (state, _daoName) => {
  state.daoNameStore = _daoName
}

export const setSelectedDao = (state, _selectedDao) => {
  state.selectedDAO = _selectedDao
}
