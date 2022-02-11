import { mapMutations } from 'vuex'
import customRegex from '~/const/customRegex.js'
export const utils = {
  methods: {
    ...mapMutations('general', ['setErrorMsg', 'setSuccessMsg', 'setIsLoading']),
    copyToClipboard (str) {
      const el = document.createElement('textarea')
      el.value = str
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
      }
    },
    showNotification (message, type = 'success') {
      const color = type.toLowerCase() === 'success' ? 'green' : 'negative'
      const icon = type.toLowerCase() === 'success' ? 'done' : 'error'
      const timeOut = type.toLowerCase() === 'success' ? 5000 : 10000
      this.$q.notify({
        color: color,
        textColor: 'white',
        message: message,
        icon: icon,
        position: 'top-right',
        timeout: timeOut,
        actions: [{ label: 'Close', color: 'white' }]
      })
    },
    showSuccessMsg (message) {
      this.setSuccessMsg(message)
    },
    showErrorMsg (message) {
      this.setErrorMsg(message)
    },
    showIsLoading (state) {
      this.setIsLoading(state)
    },
    dateToString (_date) {
      if (!_date) return _date
      var date = new Date(_date.replace(/ /g, 'T'))
      return date.getDate() + ' ' + [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ][date.getMonth()] + ' ' + date.getFullYear()
    },
    isEncrypt (value) {
      if (value && typeof (value) === 'string') {
        return value.substring(0, 2) === 'U2'
      } else {
        return false
      }
    },
    isIpfs (value) {
      if (value) {
        var regexIPFS = new RegExp(customRegex.IPFS)
        return regexIPFS.test(value)
      } else {
        return false
      }
    },
    isHashedSystems (hashedReturn, TelosReturn) {
      return window.location.host.includes('hashed.systems') ? hashedReturn : TelosReturn
    },
    replaceWhiteSpace (string, toReplace) {
      const regex = / /g
      return string.replace(regex, toReplace)
    },
    camelCaseToFormat (string) {
      // camel case to snake case
      let snakeCase = string.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase() })
      // replace underscore to space
      console.log(snakeCase.replace(/_/g, ' '))
      return snakeCase.replace(/_/g, ' ')
    }
  }
}
