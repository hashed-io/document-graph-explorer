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
      eosaccount: 'Invalid Eos account name',
      invalidTimePoint: 'Invalid time point. format 24hrs',
      isURL: 'The input must be a valid URL',
      invalidContent: 'The value must not start a word with a number',
      contentLegth: 'Please use maximum 25 characters',
      notAllowedTwoDotsConsecutively: 'Only one dot (.) is allowed between words'
    }
  },
  menu: {
    example: 'Example Dashboard'
  },
  pages: {
    index: {
      buttons: {
        createAccount: 'Create account',
        login: 'Sign In',
        loginButton: 'Login with Telos',
        redirectButton: 'DGE'
      }
    },
    general: {
      search: 'Search',
      confirmActions: 'Do you want confirm this action?',
      noAccountsFound: 'No accounts found',
      actions: 'Contracts',
      download: 'Download',
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
    documentExplorer: {
      certify: {
        title: 'Certify Form'
      },
      explorer: {
        title: 'Explore Document',
        noDataOnSearch: 'No documents found for'
      },
      erase: {
        title: 'Erase Document',
        titleModal: 'Are you absolutely sure?',
        warning: 'Unexpect bad things will happen if you don\'t read this!',
        msg: 'This action cannot be undone. This will permanently delete the doc with the ID: ',
        typeMsg: 'Please type',
        msgDel: 'document',
        typeMsgContinue: 'to confirm',
        btnErase: 'I understand the consequences, delete this document'
      },
      extend: {
        title: 'Extend Document'
      },
      create: {
        title: 'Create Document'
      },
      edit: {
        title: 'Edit Document',
        contentGroup: {
          ipfs: 'Saved in IPFS',
          encrypt: 'Click to decrypt'
        },
        edges: {
          modal: 'We are working on a document selector'
        },
        cancel: {
          text: 'If you continue your changes will not be saved.'
        }
      },
      edges: {
        create: 'New Edge',
        noEdges: 'This document does not contain edges',
        extend: 'Add edges using the button below',
        title: 'Edges',
        search: {
          empty: 'No edge found'
        }
      },
      listDocs: {
        title: 'Documents in the Graph'
      },
      file: {
        hint: 'The file must be less than 500MB'
      }
    }
  }
}
