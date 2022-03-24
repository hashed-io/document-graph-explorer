export default () => ({
  stackNavigation: [],
  document: undefined,
  typeCatalog: undefined,
  isEdit: false,
  isHashed: undefined,
  typesWithSystemNode: undefined,
  contractInfo: undefined,
  documentInterface: undefined,
  endpointApollo: undefined,
  openCryptoDialog: undefined,
  // Key to encrypt the document
  keyToEncrypt: undefined,
  // To prevent the user changing the endpoint quickly
  loadingFromEndpoint: false,
  // To trigger the upload of the document
  uploadFile: false
})
