<template lang="pug">
#container
  //- p {{dao.dao}}
  //- p {{dao.ipfs}}
  //- p {{dao.creator}}
  q-toolbar
    q-toolbar-title
      span.text-weight-bold Manage Contracts
    q-btn(flat round dense icon="close" v-close-popup)
  q-card-section
  q-item.q-pb-md
    q-item-section(top)
      q-item-label
        strong.text-subtitle1 Field Name
    q-item-section(top)
      q-item-label
        strong.text-subtitle1 Type
    q-item-section(top)
      q-item-label
        strong.text-subtitle1 Value
  q-form()
    #contracts(v-for='(contract, index) in this.manageContract')
      q-item.q-pb-md
        q-item-section(top)
          q-input(v-model='contract.label' outlined label='Field Name')
        q-item-section(top)
          q-select(v-model='contract.value[0]' :options='options' emit-value map-options outlined label='Type')
        q-item-section(top)
          div(v-if="contract.value[0] === 'time_point'")
            q-input(outlined v-model='contract.value[1]')
              template(v-slot:append='')
                q-icon.cursor-pointer(name='event')
                  q-popup-proxy(ref='qDateProxy', transition-show='scale', transition-hide='scale')
                    q-date(v-model='date', today-btn, mask='YYYY/MM/DD' @input='changesDate(index)')
                      .row.items-center.justify-end
                        q-btn(v-close-popup, label='Close', color='primary', flat='flat')

          div(v-else-if="contract.value[0] === 'file'")
            .row.justify-center
              .col.q-px-md.col-xs-10.col-sm-10
                q-file(v-model='contract.value[1]' :loading='contract.loadingState' ref='file' id='file' @input='handleFileUpload(contract,index)' filled bottom-slots label='Upload file')
                  template(v-slot:before)
                    q-icon(name='folder_open')
              .col.col-xs-2.col-sm-2
                template(v-if="typeof(contract.value[2]) === 'string'")
                  q-icon(name="check" class="text-green" style="font-size: 2rem;")
                p {{contract.value[2]}}
                template(v-if="contract.value[2] === undefined" )
                  q-icon(name="error" class="text-red" style="font-size: 2rem;")
                  //- p Fail Upload

          q-input(v-else v-model='contract.value[1]' counter outlined label='Value')

  .row.justify-end.q-gutter-md
    q-btn(label='Add Field' @click='addRow()' color="primary")
    q-btn(label='Save' @click='saveData()' color="primary")
</template>

<script>
import BrowserIpfs from '~/services/BrowserIpfs'
import { validation } from '~/mixins/validation'
export default {
  name: 'managecontract',
  mixins: [validation],
  props: {
    dao: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // load information
  },
  data () {
    return {
      date: null,
      manageContract: [
        {
          loadingState: false,
          label: null,
          value: [
            null,
            null,
            null
          ]
        }
      ],
      options: [
        {
          label: 'String',
          value: 'string'
        },
        {
          label: 'Asset',
          value: 'asset'
        },
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Int64',
          value: 'int64'
        },
        {
          label: 'Time point',
          value: 'time_point'
        },
        {
          label: 'Checksum256',
          value: 'checsum256'
        },
        {
          label: 'File',
          value: 'file'
        }
      ]
    }
  },
  methods: {
    addRow () {
      this.manageContract.push(
        {
          loadingState: false,
          label: null,
          value: [
            null,
            null,
            null
          ]
        }
      )
    },
    saveData () {
      this.$q.notify({
        message: 'Dato guardados [por implementar]'
      }
      )
    },
    changesDate (index) {
      const arr = this.date.split('/')
      let dateFormatted = arr[1] + '/' + arr[2] + '/' + arr[0]
      this.manageContract[index].value[1] = dateFormatted
      this.$forceUpdate()
    },
    async handleFileUpload (row, index) {
      var self = this
      self.manageContract[index].loadingState = true
      var _row = row.value[1]
      const reader = new FileReader()
      reader.onload = async function (_row) {
        let blob = new Blob([new Uint8Array(_row.target.result)], { type: _row.type })
        try {
          let typeCid = await BrowserIpfs.addFile(blob)
          self.manageContract[index].value[2] = typeCid
          self.manageContract[index].loadingState = false
          self.getFileFromIPFS(self.manageContract[index].value[2], _row.type)
        } catch (e) {
          alert(e)
          self.manageContract[index].value[2] = undefined
          self.manageContract[index].loadingState = false
        }
      }
      reader.readAsArrayBuffer(_row)
    },
    async getFileFromIPFS (index, type) {
      // application/vnd.oasis.opendocument.text
      let filename = 'documentFromIPFS'
      console.log(index)
      let blob = await BrowserIpfs.getFile(index, filename, type)
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.log(blob)
    }
  }
}
</script>
