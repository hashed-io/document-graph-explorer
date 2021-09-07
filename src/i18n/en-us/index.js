export default {
  common: {
    appName: 'Telos Communities',
    buttons: {
      cancel: 'Cancel',
      edit: 'Edit',
      continue: 'Continue',
      create: 'Create',
      logout: 'Logout',
      mint: 'Mint',
      register: 'Register',
      save: 'Save',
      confirm: 'Confirm',
      download: 'Download',
      editDao: 'Edit DAO',
      viewData: 'View Data on IPFS'
    },
    defaultTitle: 'Title'
  },
  forms: {
    errors: {
      accountFormat: 'The account can contain lowercase characters only, numbers from 1 to 5 or a dot (.)',
      accountFormatBasic: 'The account must contain 12 lowercase characters only and number from 1 to 5',
      accountLength: 'The account must contain at most 12 characters',
      accountNotAvailable: 'The account "{account}" already exists',
      accountNotExists: 'The account "{account}" does not exist',
      copyKey: 'Copy the key to a safe place',
      dateFuture: 'The date must be in the future',
      greaterOrEqualThan: 'The value must be greater than than or equal to {value}',
      integer: 'Please type an integer',
      phoneFormat: 'Please type a valid phone',
      positiveInteger: 'The value must be greater than 0',
      required: 'This field is required',
      token: 'The field must contain between 2 and 6 characters',
      tokenDecimals: 'The decimals must be between 2 and 9',
      email: 'Invalid email'
    }
  },
  menu: {
    transfer: 'Transfer',
    example: 'Example Dashboard',
    registerDao: 'Register dao',
    listDao: 'List Dao',
    manageContract: 'Manage Contracts'
  },
  pages: {
    index: {
      buttons: {
        createAccount: 'Create account',
        login: 'Login with Telos'
      }
    },
    general: {
      search: 'Search',
      confirmActions: 'Do you want confirm this action?',
      noAccountsFound: 'No accounts found',
      actions: 'Actions',
      download: 'Download',
      dao: 'DAO',
      ipfs: 'IPFS',
      editDao: 'Edit',
      viewData: 'See data in IPFS'
    },
    agent: {
      name: 'Name',
      field: 'Address 1',
      address: 'Address 2'
    },
    login: {
      getApp: 'Download the app',
      title: 'Select your wallet',
      selectAccount: 'Please select an account'
    },
    daos: {
      titleForm: 'DAOS',
      createDao: 'Create new DAO'
    }
  }
}
