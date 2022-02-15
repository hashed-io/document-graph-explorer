// cy.$t = async (key) => {
//   let t
//   await cy.window().then(win => {
//     console.log(win)
//     t = win.Vue.$t(key)
//   })
//   return t
// }
import rulesi18n from '/src/i18n/en-us/index.js'
cy.$t = async (msg) => {
  let labels = msg.split('.')
  var prevValue = rulesi18n
  var nextValue
  labels.forEach(element => {
    nextValue = prevValue[element]
    prevValue = nextValue
  })
  return nextValue
}
