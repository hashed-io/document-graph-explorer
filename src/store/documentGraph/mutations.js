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
