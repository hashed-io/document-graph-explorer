<template lang="pug">
.q-pt-sm
  .flex
    div(v-for="certificate in certificates" :key="certificate.account")
      div(v-html="getIdenticon(certificate, identicon.size)" class="q-mx-xs")
      q-tooltip(content-class='bg-white text-black shadow-1 shadow-transition')
        div(class='tooltipContent')
          .row.justify-between
            .col-6
              div(v-html="getIdenticonTooltip(certificate, identicon.size + 20)")
            .col-6.q-pt-sm
              div {{certificate.account}}
              div {{certificate.date}}
          .flex.flex-start.q-pa-sm
            div(v-html="getNotes(certificate)")
</template>

<script>
import DOMPurify from 'dompurify'
import { toSvg, configure } from 'jdenticon'
import { marked } from 'marked'
export default {
  name: 'ListCertificates',
  props: {
    certificates: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      identicon: {
        size: 35
      }
    }
  },
  methods: {
    getNotes (data) {
      var notesJoined = ''
      // notesJoined += '**Account** ' + data.account
      // notesJoined += '\n \n**Date** ' + data.date
      // notesJoined += '\n \n **Notes** <hr> '

      data.notes.forEach(element => {
        let md = element
        notesJoined += md + '\n'
      })
      return DOMPurify.sanitize(marked(notesJoined))
    },
    showCertificateInfo (rowData) {
      let md = this.getNotes(rowData)
      this.$q.dialog({
        title: 'Certificate Information',
        style: 'border-radius:10px;',
        position: 'standard',
        seamless: false,
        transitionShow: 'fade',
        transitionHide: 'fade',
        message: md,
        html: true,
        ok: false
      }).onOk(() => {
        // console.log('OK')
      })
    },
    getIdenticonTooltip (rowData, size) {
      configure({
        // hues: [360],
        // lightness: {
        //   color: [1.00, 1.00],
        //   grayscale: [1.00, 1.00]
        // },
        // saturation: {
        //   color: 0.00,
        //   grayscale: 0.00
        // },
        // backColor: '#a1a1a12d'
      })
      return toSvg(rowData.account, size)
    },
    getIdenticon (rowData, size) {
      configure({
        // hues: [360],
        // lightness: {
        //   color: [1.00, 1.00],
        //   grayscale: [1.00, 1.00]
        // },
        // saturation: {
        //   color: 0.00,
        //   grayscale: 0.00
        // },
        // backColor: '#4338CA'
      })
      return toSvg(rowData.account, size)
    }
  }
}
</script>

<style lang="stylus" scoped>
.hrStyle
  border: 0.5px solid grey;
  border-radius: 5px;
.tooltipContent
  width: 250px
  font-size:13px
.cardTailWind
  border-radius: 50px !important
  width: 500px !important
.TailWind
  border-radius: 10px
</style>
