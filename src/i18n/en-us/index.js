export default {
  common: {
    appName: 'Telos Communities',
    buttons: {
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      continue: 'Continue',
      create: 'Create',
      logout: 'Logout',
      mint: 'Mint',
      register: 'Register',
      save: 'Save',
      confirm: 'Confirm',
      download: 'Download',
      editDao: 'Edit DAO',
      viewData: 'View Data on IPFS',
      see: 'See data',
      extendDoc: 'Extend Document'
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
      email: 'Invalid email',
      checksum: 'Invalid checksum. Must contain 64 characters and letters between A to F',
      eosaccount: 'Invalid Eos account name'
    }
  },
  menu: {
    transfer: 'Transfer',
    daos: 'DAOS',
    example: 'Example Dashboard',
    registerDao: 'Register dao',
    listDao: 'List Dao',
    manageContract: 'Manage Contracts',
    all_daos: 'All DAOs'
  },
  pages: {
    index: {
      buttons: {
        createAccount: 'Create account',
        login: 'Login',
        loginButton: 'Login with Telos'
      }
    },
    general: {
      search: 'Search',
      confirmActions: 'Do you want confirm this action?',
      noAccountsFound: 'No accounts found',
      actions: 'Contracts',
      download: 'Download',
      dao: 'DAO',
      ipfs: 'IPFS',
      editDao: 'Edit',
      viewData: 'See data in IPFS',
      back: 'Back to the list daos'
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
      titleForm: 'DAOs created by your account',
      createDao: 'Using Wyoming steps',
      createDaoSimple: 'Basic setup',
      nodata: 'There aren\'t any DAOs associated with your account',
      deployDAOFailure: 'Failure on deploy DAO Failure',
      initDAOFailure: 'Failure on init DAO',
      daoName: 'Dao Name',
      creator: 'Creator',
      goWebsite: 'Go to website',
      seeDetails: 'See details'
    },
    daoSimple: {
      text: 'Basic setup of the create a DAO LLC '
    },
    orderBook: {
      accountInfoTip: 'Account info'
    },
    documentExplorer: {
      explorer: {
        title: 'Explore Document'
      },
      erase: {
        title: 'Erase Document',
        titleModal: 'Are you absolutely sure?',
        msg: 'This action cannot be undone. This will permanently delete the doc with the ID: ',
        typeMsg: 'Please type',
        msgDel: 'document with id',
        typeMsgContinue: 'to confirm',
        btnErase: 'I understand the consequences, delete this document'
      },
      extend: {
        title: 'Extend Document'
      },
      edit: {
        title: 'Edit Document'
      },
      edges: {
        noEdges: 'This document does not contain edges',
        title: 'Edges',
        search: {
          empty: 'No edge found'
        }
      },
      listDocs: {
        title: 'Documents in the Graph'
      }
    }
  }
}
