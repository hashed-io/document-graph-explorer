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
  //- p {{manageContract}}
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
    q-item-section(side top)
      q-item-label
        strong.text.subtitle1 Actions
  #contracts(v-for='(contract, index) in this.manageContract')
    q-item
      q-item-section(top)
        q-item-label {{contract.label}}
      q-item-section(top)
        q-item-label(lines='') {{contract.value[0]}}
      q-item-section(top)
        template(v-if="contract.value[0] === 'file' || contract.value[1].includes('file:') === true")
          .row.q-gutter-md
            q-btn(icon='search' @click='openLink(contract.ipfs, contract.value[1])' color="primary" )
            p {{'File'}}
        q-item-label(v-else)
          .containerValue
            | {{contract.value[1]}}
      q-item-section(side top)
        .row.q-gutter-md.justify-end
            q-btn( color='red' icon='delete' round size='md' @click='deleteRow(contract, index)')
            q-btn( color='yellow' icon='edit' round size='md' @click='editRow(index)')
  q-form(ref='labelForm' @submit='addRow')
      q-item.q-pb-md
        q-item-section(top)
          q-input(v-model='contract.label' outlined :readonly='fieldNameEditable' label='Field Name' :rules='[rules.required]')
        q-item-section(top)
          q-select(v-model='contract.value[0]' @input='changeType()'  :options='options' emit-value map-options outlined label='Type' :rules='[rules.required]')
        q-item-section(top)
          .row.justify-start
            .col-xs-11.col-sm-11
              div(v-if="contract.value[0] === 'time_point'")
                q-input(outlined v-model='contract.value[1]' :rules='[rules.required]' )
                  template(v-slot:append='')
                    q-icon.cursor-pointer(name='event')
                      q-popup-proxy(ref='qDateProxy', transition-show='scale', transition-hide='scale')
                        q-date(v-model='date', today-btn, mask='YYYY/MM/DD' @input='changesDate()')
                          .row.items-center.justify-end
                            q-btn(v-close-popup, label='Close', color='primary', flat='flat')

              div(v-else-if="contract.value[0] === 'file'")
                .row.justify-center
                  .col.q-px-md.col-xs-10.col-sm-10
                    q-file(v-model='contract.value[1]'  :loading='contract.loadingState' ref='file' id='file' @input='e => handleFileUpload(e)' filled bottom-slots label='Upload file' :rules='[rules.required]')
                      template(v-slot:before)
                        q-icon(name='folder_open')
                  .col.col-xs-2.col-sm-2
                    template(v-if="typeof(contract.ipfs) === 'string'")
                      q-icon(name="check" class="text-green" style="font-size: 2rem;")
                    //- p {{contract.ipfs}}
                    template(v-if="contract.ipfs === undefined" )
                      q-icon(name="error" class="text-red" style="font-size: 2rem;")
                      //- p Fail Upload
              q-input(v-else-if="contract.value[0] === 'asset'"  v-model='contract.value[1]'  outlined label='Amount' input-class="text-right"  :rules='[rules.required]')
              q-input(v-else v-model='contract.value[1]' counter  outlined label='Value' :rules='[rules.required]')
      .row.justify-end.q-gutter-md
        q-btn(v-if='idEdit === null' label='Add Field' @click='addRow()' color="primary")
        q-btn(v-else label='Update Field' @click='updateRow()' color="primary")
        q-btn(label='Save' @click='modifiedData()' color="primary")

</template>
<script>
import BrowserIpfs from '~/services/BrowserIpfs'
import { DocumentsApi } from '~/services'
import { validation } from '~/mixins/validation'
import { mapActions } from 'vuex'
import { date } from 'quasar'
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
    try {
      let _contractAccount = this.dao.dao
      let _api = this.$store.$apiMethods
      let mEosApi = this.$store.$defaultApi
      const documentsApi = await new DocumentsApi({ eosApi: _api, mEosApi }, _contractAccount)
      this.DocumentApi = documentsApi
      console.log('documentApi created', this.DocumentApi)
      this.loadData()
    } catch (e) {
      console.error('An error ocurred while trying to create Document Api. ' + e)
      this.showErrorMsg(e || e.message)
    }
  },
  data () {
    return {
      date: null,
      DocumentApi: null,
      idEdit: null,
      fieldNameEditable: false,
      manageContract: [],
      contract: {
        label: null,
        loadingState: false,
        ipfs: undefined,
        value: [
          null,
          null
        ]
      },
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
          value: 'checksum256'
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
      },
      deleteLabels: [],
      updateLabels: [],
      newLabels: []
    }
  },
  methods: {
    ...mapActions('documents', ['storeEntry', 'getDocuments', 'getEdges']),
    async addRow () {
      if (await this.$refs.labelForm.validate()) {
        if (this.manageContract.find(el => el.label === this.contract.label)) {
          this.showErrorMsg('Label duplicate')
        } else {
          this.manageContract.push(JSON.parse(JSON.stringify(this.contract)))
          this.newLabels.push(JSON.parse(JSON.stringify(this.contract)))
          this.clearContract()
        }
      }
    },
    async deleteRow (contract, index) {
      if (contract.label !== null) {
        if (this.newLabels.find(el => el.label === contract.label)) {
          this.manageContract.splice(index, 1)
          const isEqual = (element) => element.label === contract.label
          let _index = this.newLabels.findIndex(isEqual)
          this.newLabels.splice(_index, 1)
          this.showSuccessMsg('Label ' + contract.label + ' deleted.')
        } else {
          let label = this.manageContract[index].label
          this.deleteLabels.push(label)
          this.manageContract.splice(index, 1)
          this.showSuccessMsg('Label ' + label + ' deleted. Save your changes')
        }
      }
    },
    async saveData (values) {
      var deleteLabels = JSON.parse(JSON.stringify(this.deleteLabels))
      try {
        if (deleteLabels.length > 0 && values.length > 0) {
          console.log('TWO')
          await this.DocumentApi.StoreAndDeleteEntry({
            values,
            deleteLabels
          })
        } else if (deleteLabels.length > 0 && values.length === 0) {
          console.log('Only delete')
          await this.DocumentApi.DelEntry({
            deleteLabels
          })
        } else if (deleteLabels.length === 0 && values.length > 0) {
          console.log('Only store')
          await this.DocumentApi.StoreEntry({
            values
          })
        } else {
          this.showSuccessMsg('Nothing to save')
          return
        }
        this.resetLabelsArray()
        this.showSuccessMsg('Data stored correctly')
        this.loadData()
      } catch (e) {
        this.resetLabelsArray()
        this.loadData()
        this.showErrorMsg('Fail to save DAO information ' + e)
        console.error('An error ocurred while trying to save Data ' + e)
      }
    },
    resetLabelsArray () {
      this.manageContract = []
      this.deleteLabels = []
      this.newLabels = []
      this.updateLabels = []
    },
    editRow (index) {
      if (this.newLabels.find(el => el.label === this.manageContract[index].label)) {
        let data = this.manageContract[index]
        this.contract = JSON.parse(JSON.stringify(data))
        this.idEdit = index
        this.fieldNameEditable = false
      } else {
        let data = this.manageContract[index]
        this.contract = JSON.parse(JSON.stringify(data))
        this.idEdit = index
        this.fieldNameEditable = true
      }
    },
    updateRow () {
      let index = this.idEdit
      if (!this.fieldNameEditable) {
        // Se guarda en nuevos labels
        this.newLabels.push(JSON.parse(JSON.stringify(this.contract)))
      } else {
        // Se guarda en labels por actualizar
        let prevType = this.manageContract[index].value[0]
        let prevValue = this.manageContract[index].value[1]
        console.log({ prevType, prevValue })
        if (prevType !== this.contract.value[0] || prevValue !== this.contract.value[1]) {
          this.updateLabels.push(JSON.parse(JSON.stringify(this.contract)))
        } else {
          this.showSuccessMsg('Valores actualizados iguales')
        }
      }
      // this.showSuccessMsg('Label Update')
      this.manageContract[index] = JSON.parse(JSON.stringify(this.contract))
      this.idEdit = null
      this.fieldNameEditable = false
      this.clearContract()
    },
    //
    changesDate () {
      const arr = this.date.split('/')
      let dateFormatted = arr[1] + '/' + arr[2] + '/' + arr[0]
      this.contract.value[1] = dateFormatted
      this.$forceUpdate()
    },
    async handleFileUpload (e) {
      var self = this
      self.contract.loadingState = true
      try {
        this.loading = true
        let typeCid = await BrowserIpfs.store(e)
        console.log(typeCid)
        self.contract.loadingState = false
        self.contract.ipfs = typeCid
      } catch (e) {
        self.showSuccessMsg('Error ocurred while file was uploaded. ' + e)
        console.error(e)
      } finally {
        self.showSuccessMsg('File uploaded success')
        this.loading = false
      }
    },
    async getFileFromIPFS (index, type) {
      // application/vnd.oasis.opendocument.text
      let filename = 'documentFromIPFS'
      let blob = await BrowserIpfs.getFile(index, filename, type)
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    changeType () {
      this.contract.value[1] = undefined
      this.contract.ipfs = undefined
    },
    clearContract () {
      this.contract.label = null
      this.contract.loadingState = false
      this.contract.ipfs = undefined
      this.contract.value[0] = null
      this.contract.value[1] = null
      this.$refs.labelForm.reset()
    },
    async modifiedData () {
      this.clearContract()
      Array.prototype.push.apply(this.newLabels, this.updateLabels)
      let rawData = JSON.parse(JSON.stringify(this.newLabels))
      rawData.forEach(function (entry) {
        if (!(entry.value[0] === 'asset' || entry.value[0] === 'time_point' || entry.value[0] === 'file' || entry.value[0] === 'name')) {
          entry.value[1] = entry.value[1].toLowerCase()
        }
        if (entry.ipfs === undefined) {
          delete entry.ipfs
        } else {
          let ipfsCID = entry.ipfs
          entry.value[1] = ipfsCID
          delete entry.ipfs
        }
        if (entry.value[0] === 'file') {
          entry.value[1] = 'file:' + entry.value[1]
          entry.value[0] = 'string'
        }
        delete entry.loadingState
      })
      this.saveData(rawData)
    },
    async loadData () {
      this.manageContract = []
      this.newLabels = []
      this.updateLabels = []
      try {
        let data = await this.DocumentApi.getDocuments({
          ...this.params,
          search: this.params.search ? this.params.search.toLowerCase() : undefined
        })
        // var flag = true
        var counter = 0
        let tableRows = data.rows[1].content_groups
        if (tableRows.length === 2) {
          tableRows[1].forEach(element => {
            if (counter > 1) {
              let type = element.value[0]
              switch (type) {
                case 'time_point':
                  const timeStamp = new Date(element.value[1])
                  element.value[1] = date.formatDate(timeStamp, 'MM/DD/YYYY')
                  break
              }
              this.manageContract.push(element)
            }
            // flag = false
            counter++
          })
        }
        // this.showSuccessMsg('Data loaded success')
      } catch (e) {
        this.showErrorMsg('Fail to load DAO information. ' + e)
        console.log(e.json.error.details[0].message)
        // this.showErrorMsg(e.json.error.details[0].message)
      }
    },
    async openLink (value, value2) {
      var link
      if (value) {
        link = value
      } else {
        if (value2.includes('file:')) {
          link = value2.substring(5)
        }
      }
      const file = await BrowserIpfs.retrieve(link)
      var blob = new Blob([file.payload], { type: file.type })
      var url = window.URL.createObjectURL(blob)
      var a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.click()
    }
  }
}
</script>

<style lang="sass" scoped>
.medium-width
  width: 50vw !important
  max-width: 50vw !important
.containerValue
  inline-size:95% !important
  overflow-wrap: break-word
</style>
