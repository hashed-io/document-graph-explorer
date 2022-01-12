<template lang="pug">
.q-pt-sm
  .flex
    div(v-for="certificate in certificates" :key="certificate.creator")
      div(v-html="getIdenticon(certificate, identicon.size)" class="q-mx-xs")
      q-tooltip(content-class='bg-white text-black shadow-1 shadow-transition')
        div(class='tooltipContent')
          .row.justify-between
            .col-6
              div(v-html="getIdenticonTooltip(certificate, identicon.size + 20)")
            .col-6.q-pt-sm
              div(class="q-pb-xs") {{certificate.creator}}
              div {{dateToString(certificate.createdDate)}}
          hr(class="hrStyle")
          .row.q-px-md.q-pb-md.justify-between
            .text-bold Notes
            .row.q-px-md(v-if="isIpfs(certificate.notes)")
              q-chip(
                :ripple="false"
                size="12px"
              ) IPFS
            .row.q-px-md(v-else-if="isEncrypt(certificate.notes)")
              q-chip(
                :ripple="false"
                size="12px"
              ) Encrypt
            .row.q-px-md(v-else)
              div(v-html="getHTML(certificate.notes)")
          .row.q-px-md.justify-between
            .text-bold Signature
            .row.q-px-md(v-if="isEncrypt(certificate.signature)")
              q-chip(
                :ripple="false"
                size="12px"
              ) Encrypt
            .row.q-px-md(v-else-if="isIpfs(certificate.signature)")
              q-chip(
                :ripple="false"
                size="12px"
              ) IPFS
            .row.q-px-md(v-else)
              div(v-html="getHTML(certificate.signature)")
</template>

<script>
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { toSvg, configure } from 'jdenticon'
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
    getHTML (data) {
      return DOMPurify.sanitize(marked(data + '\n\n'))
    },
    dateToString (_date) {
      if (!_date) return _date
      var date = new Date(_date.replace(/ /g, 'T'))
      return date.getDate() + ' ' + [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ][date.getMonth()] + ' ' + date.getFullYear()
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
      return toSvg(rowData.creator, size)
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
      return toSvg(rowData.creator, size)
    }
  }
}
</script>

<style lang="stylus" scoped>
.containerNotes
  width: 40%;
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
