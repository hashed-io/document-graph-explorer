export default () => ({
  isEdit: false,
  typeCid: undefined,
  daoNameStore: null,
  formStore: {
    price: 100,
    businessName: {
      businessName: '',
      additionalDesignation: 'Decentralized Autonomous Organization'
    },
    detail: {
      periodOfDuration: '',
      expirationDate: '',
      delayedEffectiveDate: ''
    },
    agent: {
      firstName: null,
      middleName: null,
      lastName: null,
      organization: null,
      country: 'USA',
      address: {
        line1: null,
        line2: null,
        line3: null
      },
      city: null,
      state: 'WY',
      postalCode: null,
      phone: null,
      email: null
    },
    addresses: {
      principalAddress: {
        country: null,
        address: {
          line1: null,
          line2: null,
          line3: null
        },
        city: null,
        state: null,
        postalCode: null,
        phone: null,
        fax: null,
        email: null
      },
      mailingAddress: {
        country: null,
        address: {
          line1: null,
          line2: null,
          line3: null
        },
        city: null,
        state: null,
        postalCode: null
      }
    },
    organizers: [],
    additionalArticles: [],
    fillerInformation: {
      filerIs: null,
      firstName: null,
      middleName: null,
      lastName: null,
      title: null,
      phone: null,
      email: null
    }
  },
  selectedDAO: null,
  key: undefined,
  isGeneral: undefined
})
