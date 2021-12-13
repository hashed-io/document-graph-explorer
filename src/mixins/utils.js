import { mapMutations } from 'vuex'
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
      const color = type.toLowerCase() === 'success' ? 'green' : 'red'
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
    // TODO: 13 nov 2021
    dateToString (_date) {
      if (!_date) return _date
      var date = new Date(_date.replace(/ /g, 'T'))
      return date.getDate() + ' ' + [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ][date.getMonth()] + ', ' + date.getFullYear()
    }
  }
}
