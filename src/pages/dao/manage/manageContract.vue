<template lang="pug">
#container
  //- p {{dao.dao}}
  //- p {{dao.ipfs}}
  //- p {{dao.creator}}
  q-toolbar
    q-toolbar-title
      span.text-weight-bold Manage Contracts for {{dao.dao}}
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
  q-form(ref='labelForm' @submit='addRow')
    #contracts(v-for='(contract, index) in this.manageContract')
      q-item.q-pb-md
        q-item-section(top)
          q-input(v-model='contract.label' readonly disabled outlined label='Field Name' :rules='[rules.required]')
        q-item-section(top)
          q-select(v-model='contract.value[0]' @input='changeType(contract)' :options='options' emit-value map-options outlined label='Type' :rules='[rules.required]')
        q-item-section(top)
          .row.justify-start
            .col-xs-11.col-sm-11
              div(v-if="contract.value[0] === 'time_point'")
                q-input(outlined v-model='contract.value[1]' :rules='[rules.required]')
                  template(v-slot:append='')
                    q-icon.cursor-pointer(name='event')
                      q-popup-proxy(ref='qDateProxy', transition-show='scale', transition-hide='scale')
                        q-date(v-model='date', today-btn, mask='YYYY/MM/DD' @input='changesDate(index)')
                          .row.items-center.justify-end
                            q-btn(v-close-popup, label='Close', color='primary', flat='flat')

              div(v-else-if="contract.value[0] === 'file'")
                .row.justify-center
                  .col.q-px-md.col-xs-10.col-sm-10
                    q-file(v-model='contract.value[1]' :loading='contract.loadingState' ref='file' id='file' @input='handleFileUpload(contract,index)' filled bottom-slots label='Upload file' :rules='[rules.required]')
                      template(v-slot:before)
                        q-icon(name='folder_open')
                  .col.col-xs-2.col-sm-2
                    template(v-if="typeof(contract.ipfs) === 'string'")
                      q-icon(name="check" class="text-green" style="font-size: 2rem;")
                    //- p {{contract.ipfs}}
                    template(v-if="contract.ipfs === undefined" )
                      q-icon(name="error" class="text-red" style="font-size: 2rem;")
                      //- p Fail Upload
              q-input(v-else-if="contract.value[0] === 'asset'" v-model='contract.value[1]'  outlined label='Ammount' input-class="text-right"  :rules='[rules.required]')
              q-input(v-else v-model='contract.value[1]' counter outlined label='Value' :rules='[rules.required]')
            .cols-xs-1.col-sm-1
              #button.q-pl-md
                q-btn( v-if='index>1' color='red' icon='delete' round size='md' @click='deleteRow(contract, index)')

  .row.justify-end.q-gutter-md
    q-btn(label='Add Field' @click='addRow()' color="primary")
    q-btn(label='Save' @click='modifiedData()' color="primary")

</template>

<script>
import BrowserIpfs from '~/services/BrowserIpfs'
import { DocumentsApi } from '~/services'
import { validation } from '~/mixins/validation'
import { mapActions } from 'vuex'
export default {
  name: 'managecontract',
  mixins: [validation],
  props: {
    dao: {
      type: Object,
      required: true
    }
  },
  async mounted () {
    console.log('load data if there are')
    let _contractAccount = this.dao.dao
    let _api = this.$store.$api
    const documentsApi = await new DocumentsApi({ eosApi: _api }, _contractAccount)
    this.DocumentApi = documentsApi
    this.loadData()
  },
  data () {
    return {
      date: null,
      DocumentApi: null,
      manageContract: [
        {
          loadingState: false,
          ipfs: undefined,
          label: null,
          value: [
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
      ],
      params: {
        offset: 0,
        limit: 5,
        search: undefined,
        customOffset: undefined,
        nextKey: undefined
      }
    }
  },
  methods: {
    ...mapActions('documents', ['storeEntry', 'delEntry', 'getDocuments', 'getEdges', 'getApiStore']),
    async addRow () {
      if (await this.$refs.labelForm.validate()) {
        this.manageContract.push({
          loadingState: false,
          ipfs: undefined,
          label: null,
          value: [
            null,
            null
          ]
        })
      }
      console.log(this.manageContract)
    },
    async onAddField () {
      console.log()
      if (await this.$refs.form.validate()) {
        this.fields.push({ ...this.params })
        this.onReset()
        this.$refs.form.reset()
      }
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
          self.manageContract[index].ipfs = typeCid
          self.manageContract[index].loadingState = false
          self.getFileFromIPFS(self.manageContract[index].ipfs, _row.type)
        } catch (e) {
          alert(e)
          self.manageContract[index].ipfs = undefined
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
    },
    changeType (contract) {
      contract.value[1] = undefined
      contract.ipfs = undefined
    },
    async deleteRow (contract, index) {
      if (contract.label !== null) {
        try {
          let _label = this.manageContract[index].label
          await this.DocumentApi.DelEntry({
            _label
          })
          this.showSuccessMsg('Label delete correctly')
          this.manageContract.splice(index, 1)
        } catch (e) {
          console.error('An error ocurred while trying to delete label')
          this.showErrorMsg('Error removing label')
          return
        }
      }
      this.manageContract.splice(index, 1)
    },
    async modifiedData () {
      if (await this.$refs.labelForm.validate()) {
        let rawData = JSON.parse(JSON.stringify(this.manageContract))
        rawData.forEach(function (entry) {
          if (!(entry.value[0] === 'asset' || entry.value[0] === 'time_point' || entry.value[0] === 'file')) {
            entry.value[1] = entry.value[1].toLowerCase()
          }
          if (entry.ipfs === undefined) {
            delete entry.ipfs
          } else {
            let ipfsCID = entry.ipfs
            entry.value[1] = ipfsCID
            delete entry.ipfs
          }
          delete entry.loadingState
        })
        this.saveData(rawData)
        console.log(rawData)
      }
    },
    async saveData (values) {
      try {
        await this.DocumentApi.StoreEntry({
          values
        })
        this.showSuccessMsg('Data stored correctly')
      } catch (e) {
        this.showErrorMsg('Fail to save DAO information')
        console.error('An error ocurred while trying to save Data', e)
      }
    },
    async loadData () {
      console.log(this.DocumentApi.eosApi)
      this.manageContract = []
      try {
        let data = await this.DocumentApi.getDocuments({
          ...this.params,
          search: this.params.search ? this.params.search.toLowerCase() : undefined
        })
        let tableRows = data.rows[1].content_groups
        if (tableRows.length === 2) {
          tableRows[1].forEach(element => {
            this.manageContract.push(element)
          })
        }
      } catch (e) {
        this.showErrorMsg('Fail to load DAO information')
        console.error('An error ocurred while trying to load DAO data', e)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.medium-width
  width: 50vw !important
  max-width: 50vw !important
</style>
