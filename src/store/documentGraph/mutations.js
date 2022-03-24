export const setDocument = (state, doc) => {
  state.document = doc
}
export const setCatalog = (state, mapType) => {
  state.typeCatalog = mapType
}
export const setIsEdit = (state, edit) => {
  state.isEdit = edit
}
export const setTypesWithSystemNode = (state, typesArr) => {
  state.typesWithSystemNode = typesArr
}
export const pushDocNavigation = (state, doc) => {
  state.stackNavigation.push({ ...doc })
}
export const popDocNavigation = (state) => {
  state.stackNavigation.pop()
}
export const addInformation = (state, keyPair) => {
  let lastElement = state.stackNavigation.length - 1
  state.stackNavigation[lastElement][keyPair.label] = keyPair.value
}
export const clearStack = (state) => {
  state.stackNavigation = []
}
export const setDocInterface = (state, docInterface) => {
  state.documentInterface = docInterface
}
export const setContractInfo = (state, contractInfo) => {
  state.contractInfo = contractInfo
}
export const setIsHashed = (state, bool) => {
  state.isHashed = bool
}
export const setEndpoint = (state, endpoint) => {
  state.endpointApollo = endpoint
}
export const setCryptoDialogState = (state, cryptoDialog) => {
  state.openCryptoDialog = cryptoDialog
}
export const setKeyToEncrypt = (state, key) => {
  state.keyToEncrypt = key
}
export const setLoadingFromEndpoint = (state, bool) => {
  state.loadingFromEndpoint = bool
}
export const setUploadFile = (state, bool) => {
  state.uploadFile = bool
}
