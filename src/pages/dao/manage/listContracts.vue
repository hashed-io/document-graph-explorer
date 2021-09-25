<template lang="pug">
#container
  #Form
  q-dialog(v-model='openDialog')
    q-card(flat).medium-width
      q-toolbar
        q-toolbar-title
          span.text-weight-bold Fill the fields
        q-btn(flat round dense icon="close" v-close-popup)
      q-card-section
        q-form(ref='labelForm')
          .row
            .col-8.q-pr-xs
              q-input(v-model='contract.label' outlined :readonly='fieldNameEditable' label='Field Name' :rules='[rules.required]')
            .col-4
              q-select(v-model='contract.value[0]' @input='changeType()'  :options='options' emit-value map-options outlined label='Type' :rules='[rules.required]')
          .row
            .col-xs-12.col-sm-12
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
                    q-file(v-model='contract.value[1]' display-value='File' :loading='contract.loadingState' ref='file' id='file' @input='e => handleFileUpload(e)' filled bottom-slots label='Upload file' :rules='[rules.required]')
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
            .row.justify-end.q-pa-md
              q-btn(v-if='idEdit === null' label='Add Field' color="primary" @click='addRow()')
              q-btn(v-else label='Update Field' @click='updateRow()' color="primary")
  #table
    q-table.q-mb-sm(
      title='Contracts'
      :data='manageContract'
      :columns="columns"
      :row-key='row => row.label'
      :rows-per-page-options="[0]"
      :pagination="initialPagination"
      :loading='loading'
      class="sticky-virtscroll-table"
      clearable
      flat
      no-data-label="There arent contracts associated to your account "
      dense
      ref='table'
      separator='none'
      table-header-class="hdTable"
      :filter="params.search"
    )
      template(v-slot:no-data="{icon, message}")
        div(class='full-width row flex-center text-primary q-gutter-sm text-weight-bolder')
          q-icon( size='2em' name='warning')
          span
            | {{message}}
      template(v-slot:top-right)
        q-input.q-mb-sm(
          ref="inputSearch"
          :label="$t('pages.general.search')"
          v-model.trim="params.search"
          debounce="1000"
          maxlength="12"
        )
          template(v-slot:append)
            q-icon(name='search')
      template(v-slot:top-left)
        .row.q-gutter-md
            q-btn(label='Add Field' @click='openAddField()' color="primary")
            q-btn(label='Save data' @click='modifiedData()' color="primary")
      template(v-slot:body="props")
        q-tr.cursor-pointer(:props="props")
          q-td.column-responsive(
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          ) {{col.value}}
            template(v-if="col.name == 'value' && (!(props.row.value[1].includes('file:') || props.row.ipfs))")
              q-tooltip {{props.row.value[1]}}
            template(v-if="col.name == 'actions'")
              .row.q-col-gutter-xs
                .col-xs-12.col-sm-4
                  template(v-if="props.row.value[1].includes('file:') || props.row.ipfs")
                    q-icon.animated-icon(
                      name='search'
                      v-ripple
                      size='sm'
                      color='positive'
                      @click="openLink(props.row.ipfs,props.row.value[1])"
                    )
                .col-xs-6.col-sm-4.q-px-sm
                  q-icon.q-px-md.animated-icon(
                    name='edit'
                    size='sm'
                    color='positive'
                    @click='editRow(props.rowIndex)'
                  )
                .col-xs-6.col-sm-4.q-px-sm
                  q-icon.q-pr-md.animated-icon(
                    name='delete'
                    v-ripple
                    size='sm'
                    color='negative'
                    @click='deleteRow(props.row,props.rowIndex)'
                  )
</template>
<style lang="sass" scoped>
.medium-width
  width: 50vw !important
  max-width: 50vw !important
.containerValue
  inline-size:95% !important
  overflow-wrap: break-word
</style>
<script>
import BrowserIpfs from '~/services/BrowserIpfs'
import { ContractsApi } from '~/services'
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
      this.loading = true
      if (this.dao === null) {
        this.$router.push({ name: 'daos' })
        this.showErrorMsg('The associated DAO has not been selected ')
      } else {
        let _contractAccount = this.dao.dao
        let _api = this.$store.$apiMethods
        let mEosApi = this.$store.$defaultApi
        const contractsApi = await new ContractsApi({ eosApi: _api, mEosApi }, _contractAccount)
        this.DocumentApi = contractsApi
        console.log('documentApi created', this.DocumentApi)
        this.loadData()
      }
    } catch (e) {
      console.error('An error ocurred while trying to create Document Api. ' + e)
      this.showErrorMsg(e || e.message)
    }
  },
  computed: {
    daosFreeze () {
      return Object.freeze(this.daos.rows.slice(0, this.pageSize * (this.nextPage - 1)))
    }
  },
  data () {
    return {
      openDialog: false,
      loading: false,
      date: null,
      DocumentApi: null,
      idEdit: null,
      fieldNameEditable: false,
      manageContract: [],
      pageSize: 10,
      nextPage: 2,
      initialPagination: {
        rowsPerPage: 10,
        page: 1
      },
      contracts: {
        more: true,
        rows: []
      },
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
      columns: [
        {
          name: 'label',
          label: 'Field Name',
          align: 'left',
          headerStyle: 'font-weight: bolder;',
          headerClasses: '',
          classes: '',
          field: row => row.label,
          sortable: true
        },
        {
          name: 'type',
          label: 'Type',
          headerStyle: 'font-weight: bolder',
          align: 'left',
          field: row => row.value[0],
          sortable: true
        },
        {
          name: 'value',
          label: 'Value',
          headerStyle: 'font-weight: bolder',
          align: 'justify',
          format: (val, row) => `${(val.includes(':')) ? 'File' : val}`,
          field: row => row.value[1],
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          headerStyle: 'font-weight: bolder; text-align:center',
          align: 'center',
          sortable: false
        }
      ],
      deleteLabels: [],
      updateLabels: [],
      newLabels: [],
      prevLabel: null
    }
  },
  methods: {
    ...mapActions('documents', ['storeEntry', 'getDocuments', 'getEdges']),
    openAddField () {
      this.openDialog = !this.openDialog
      this.clearContract()
      this.fieldNameEditable = false
    },
    async addRow () {
      if (await this.$refs.labelForm.validate()) {
        if (this.manageContract.find(el => el.label === this.contract.label)) {
          this.showErrorMsg('Label duplicate')
        } else {
          this.manageContract.push(JSON.parse(JSON.stringify(this.contract)))
          this.newLabels.push(JSON.parse(JSON.stringify(this.contract)))
          if (this.contract.value[0] === 'file') {
            let lengthManage = this.manageContract.length - 1
            let lengthNewLabels = this.newLabels.length - 1
            this.manageContract[lengthManage].value[1] = this.manageContract[lengthManage].ipfs
            this.newLabels[lengthNewLabels].value[1] = this.manageContract[lengthManage].ipfs
          }
          this.clearContract()
        }
        this.openDialog = false
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
          let indexUpdate = this.updateLabels.findIndex(el => el.label === contract.label)
          this.manageContract.splice(index, 1)
          this.updateLabels.splice(indexUpdate, 1)
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
      this.openDialog = true
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
      this.prevLabel = this.manageContract[index].label
      console.log({ contract: this.contract, prevLabel: this.prevLabel })
    },
    updateRow () {
      console.log({ new: this.newLabels, update: this.updateLabels, manage: this.manageContract })
      let index = this.idEdit
      if (!this.fieldNameEditable) {
        // Save in new labels
        if (this.newLabels.find(el => el.label === this.contract.label)) {
          const isEqual = (element) => element.label === this.contract.label
          let id = this.newLabels.findIndex(isEqual)
          this.newLabels[id] = JSON.parse(JSON.stringify(this.contract))
        } else {
          const isEqual = (element) => element.label === this.prevLabel
          let id = this.newLabels.findIndex(isEqual)
          this.newLabels[id] = (JSON.parse(JSON.stringify(this.contract)))
        }
      } else {
        // Save in update lables
        let prevType = this.manageContract[index].value[0]
        let prevValue = this.manageContract[index].value[1]
        if (prevType !== this.contract.value[0] || prevValue !== this.contract.value[1]) {
          this.updateLabels.push(JSON.parse(JSON.stringify(this.contract)))
          this.showSuccessMsg('Update new label')
        } else {
          this.showSuccessMsg('The changes are the same')
        }
      }
      this.showSuccessMsg('Label Update')
      console.log({ new: this.newLabels, update: this.updateLabels })
      this.manageContract.splice(index, 1, JSON.parse(JSON.stringify(this.contract)))
      if (this.manageContract[index].value[0] === 'file') {
        this.manageContract[index].value[1] = this.manageContract[index].ipfs
      }
      this.idEdit = null
      this.fieldNameEditable = false
      this.clearContract()
      this.openDialog = false
      this.$forceUpdate()
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
        var typeCid = await BrowserIpfs.store(e)
        console.log(typeCid)
      } catch (e) {
        self.showSuccessMsg('Error ocurred while file was uploaded. ' + e)
        console.error(e)
      } finally {
        self.showSuccessMsg('File uploaded success')
        this.loading = false
        self.contract.loadingState = false
        self.contract.value[1] = e
        self.contract.ipfs = typeCid
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
      // this.$refs.labelForm.reset()
    },
    async modifiedData () {
      this.clearContract()
      Array.prototype.push.apply(this.newLabels, this.updateLabels)
      let rawData = JSON.parse(JSON.stringify(this.newLabels))
      rawData.forEach(function (entry) {
        if ((entry.value[0] === 'time_point' || entry.value[0] === 'file' || entry.value[0] === 'name')) {
          entry.value[1] = entry.value[1].toString()
          entry.value[1] = entry.value[1].toLowerCase()
          console.log(entry.value[1])
        }
        if (entry.value[0] === 'asset') {
          // entry.value[1] = entry.value[1].toString()
          console.log(entry.value[1])
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
      // console.log(rawData)
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
                case 'string':
                  if (element.value[1].includes('file:')) {
                    element.value[0] = 'file'
                    element.ipfs = element.value[1]
                  }
                  break
              }
              element.value[1] = element.value[1].toString()
              this.manageContract.push(element)
            }
            // flag = false
            counter++
          })
        }
        this.loading = false
        // this.showSuccessMsg('Contracts loaded success')
      } catch (e) {
        this.showErrorMsg('Fail to load DAO information. ' + e)
        console.log(e.json.error.details[0].message)
        // this.showErrorMsg(e.json.error.details[0].message)
      }
    },
    async openLink (value, value2) {
      var link
      if (value) {
        if (value.includes('file:')) {
          link = value.substring(5)
        } else {
          link = value
        }
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
    },
    async onScroll ({ to, ref, index, direction }) {}
  }
}
</script>
