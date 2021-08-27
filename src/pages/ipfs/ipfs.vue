<template lang="pug">
div
  .text-h3 Convert data
  q-input(v-model="text" label="Mensaje").q-ma-md
  div(v-if="typeCid").q-ma-md
    .text-subtitle1 TypeCid
    p {{ typeCid }}
  div(v-if="convertData").q-ma-md
    .text-subtitle1 Convert
    p {{ convertData }}
  div.q-ma-md
    q-btn(@click="sendInformationToIPFS" color="white" text-color="black" label="Send").q-mr-sm
    q-btn(v-if="typeCid" @click="convertToIPFS" color="red" text-color="black" label="Convert")
</template>

<script>
import BrowserIpfs from '~/services/BrowserIpfs'
export default {
  name: 'ipfs',
  data () {
    return {
      typeCid: undefined,
      convertData: undefined,
      text: ''
    }
  },
  methods: {
    async sendInformationToIPFS () {
      try {
        if (this.text !== '') {
          this.typeCid = await BrowserIpfs.addAsJson({ data: this.text })
        }
      } catch (e) {
        console.log(e)
      }
    },
    async convertToIPFS () {
      const data = await BrowserIpfs.getFromJson(this.typeCid)
      this.convertData = data
    }
  }
}
</script>
