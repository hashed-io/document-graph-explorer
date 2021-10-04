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
                    template(v-if="contract.ipfs === undefined" )
                      q-icon(name="error" class="text-red" style="font-size: 2rem;")
              q-input(v-else-if="contract.value[0] === 'asset'"  v-model='contract.value[1]'  outlined label='Amount' input-class="text-right"  :rules='[rules.required]')
              q-input(v-else-if="contract.value[0] === 'name'"  v-model='contract.value[1]'  outlined label='Name'   :rules='[rules.required, rules.isEosAccount]')
              q-input(v-else-if="contract.value[0] === 'checksum256'"  v-model='contract.value[1]'  outlined label='checksum256'  :rules='[rules.required, rules.isChecksum]')
              template(v-else-if="contract.value[0] === 'string'")
                .q-pb-md
                  q-btn(label='Save in IPFS' :loading='stringIPFSloading' @click='saveStringIPFS()' color='primary')
                q-input(v-model='contract.value[1]'  outlined label='Value' :rules='[rules.required]')
              q-input(v-else v-model='contract.value[1]' counter  outlined label='Value' :rules='[rules.required]')
            .row.justify-end.q-py-md
              q-btn(v-if='idEdit === null' label='Add Field' color="primary" @click='addRow()')
              q-btn(v-else label='Update Field' @click='updateRow()' color="primary")
  #deployAgain
  #table.q-gutter-md(v-if='hasAbi && initializedDAO')
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
              q-popup-edit(v-model="props.row.value[1]" title='Details')
                q-input(v-model="props.row.value[1]" readonly @keyup.enter.stop type='textarea').fitExpand
            template(v-if="col.name == 'actions'")
              .row.q-col-gutter-xs
                .col-xs-12.col-sm-4
                  template(v-if="props.row.value[1].includes('file:') || props.row.ipfs  ")
                    q-icon.animated-icon(
                      name='search'
                      v-ripple
                      size='sm'
                      color='positive'
                      @click="openLink(props.row.ipfs,props.row.value[1])"
                    )
                  template(v-else-if="/^([a-zA-Z0-9]){45,60}/.test(props.row.value[1])  ")
                    q-icon.animated-icon(
                      name='search'
                      v-ripple
                      size='sm'
                      color='positive'
                      @click="openLinkString(props.row.value[1])"
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
  div(v-else-if='!hasAbi && initializedDAO')
    p The contract was not deployed success. Press the button to deploy the smart contract and initialize
    q-btn(label='Deploy contract' color='primary' @click='deployContractAgain()')
  div(v-else-if='!initializedDAO && hasAbi')
    p The contract was deployed success but the DAO was not initialized correctly.
    q-btn(label='Initialize the DAO' color='primary' @click='callActionInitDAO()')
</template>
<style lang="sass" scoped>
.medium-width
  width: 50vw !important
  max-width: 50vw !important
.containerValue
  inline-size:95% !important
  overflow-wrap: break-word
.fitExpand
  height: auto
</style>
<script>
import BrowserIpfs from '~/services/BrowserIpfs'
import { ContractsApi } from '~/services'
import { validation } from '~/mixins/validation'
import { mapActions } from 'vuex'
import { date, QSpinnerPuff } from 'quasar'

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
        this.showErrorMsg('The associated DAO has not been selected ')
      } else {
        let _contractAccount = this.dao.dao
        let _api = this.$store.$apiMethods
        let mEosApi = this.$store.$defaultApi
        this.DocumentApi = await new ContractsApi({ eosApi: _api, mEosApi }, _contractAccount)

        let getAbiResponse = await this.$store.$defaultApi.rpc.get_abi(_contractAccount)
        // let getAbiResponse = await this.$store.$defaultApi.rpc.get_abi('alejandroga1')
        if (getAbiResponse.hasOwnProperty('abi')) {
          console.log('Deploy success')
          await this.verifiedInitDao()
          this.hasAbi = true
          if (this.initializedDAO) {
            this.loadData()
          }
        } else {
          console.log(' Deploy fail, deploy again')
          this.hasAbi = false
          this.initializedDAO = true
          this.showErrorMsg('Smart contract deployment failed. Deploy again')
        }
        console.log('documentApi created', this.DocumentApi)
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
      stringIPFS: false,
      stringIPFSloading: false,
      hasAbi: true,
      flagAbi: false,
      initializedDAO: true,
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
          // format: (val, row) => `${/^([a-zA-Z0-9]){46,64}:([a-zA-Z])|^file:([a-zA-Z])/.test(val) ? 'File' : val}`,
          format: (val, row) => {
            let isFile = /^([a-zA-Z0-9]){46,64}:([a-zA-Z])|^file:([a-zA-Z])/.test(val)
            let isStringIPFS = /^([a-zA-Z0-9]){59}/.test(val)
            if (isFile) {
              return 'File'
            } else if (isStringIPFS) {
              return 'Value in IPFS'
            } else {
              return val
            }
          },
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
    ...mapActions('dao', ['deployContract', 'initDao']),
    async saveStringIPFS () {
      this.stringIPFSloading = true
      let string = this.contract.value[1]
      try {
        this.contract.value[1] = await BrowserIpfs.addAsJson({ data: string })
        this.showSuccessMsg('The value has been saved in IPFS')
        this.stringIPFSloading = false
      } catch (e) {
        this.stringIPFSloading = false
        this.showErrorMsg('Error occurred while data was saving in IPFS. ' + e)
      }
    },
    openAddField () {
      this.openDialog = !this.openDialog
      this.clearContract()
      this.fieldNameEditable = false
    },
    async verifiedInitDao () {
      let data = await this.DocumentApi.getDocuments({
        ...this.params,
        search: this.params.search ? this.params.search.toLowerCase() : undefined
      })
      if (data.rows.length === 0 && this.hasAbi) {
        this.initializedDAO = false
      } else {
        this.initializedDAO = true
      }
    },
    async callActionInitDAO () {
      this.$q.loading.show({
        message: 'Initializing DAO...',
        customClass: 'text-weight-bold text-subtitle1',
        spinnerSize: '15em',
        spinner: QSpinnerPuff
      })
      await new Promise(resolve => setTimeout(resolve, 500))
      this.$q.loading.hide()
      try {
        await this.initDao({
          account: this.dao.dao.toLowerCase()
        })
        this.hasAbi = true
        this.initializedDAO = true
        this.showSuccessMsg('DAO initialized successfully')
        this.loadData()
      } catch (e) {
        this.showErrorMsg('Error an ocurred while trying to initializing DAO')
        this.initializedDAO = false
      }
    },
    async verifiedAbiExists () {
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
      for (let i = 0; i <= 5; i++) {
        let response = await this.$store.$defaultApi.rpc.get_abi(this.dao.dao)
        if (response.hasOwnProperty('abi')) {
          this.flagAbi = true
          break
        }
        console.log('Finding ABI')
        await delay(500)
      }
      if (this.flagAbi) {
        this.hasAbi = true
        this.initializedDAO = false
        return true
      } else {
        this.initializedDAO = false
        this.hasAbi = false
        return false
      }
    },
    async deployContractAgain () {
      this.initializedDAO = true
      this.hasAbi = false
      try {
        this.$q.loading.show({
          message: 'Setting DAO..',
          customClass: 'text-weight-bold text-subtitle1',
          spinnerSize: '15em',
          spinner: QSpinnerPuff
        })
        await new Promise(resolve => setTimeout(resolve, 500))
        this.$q.loading.hide()
        try {
          await this.deployContract({
            accountName: this.dao.dao.toLowerCase()
          })
          this.showSuccessMsg('Deploy contract success')
        } catch (e) {
          this.showErrorMsg('An error ocurred while trying to deploy contract again' + e)
        }
        // loading show [step 2]
        this.$q.loading.show({
          message: 'Confirming the contract deployment...',
          customClass: 'text-weight-bold text-subtitle1',
          spinnerSize: '15em',
          spinner: QSpinnerPuff
        })
        //
        await this.verifiedAbiExists()
        await new Promise(resolve => setTimeout(resolve, 500))
        this.$q.loading.hide()

        this.initializedDAO = false

        if (this.flagAbi) {
          console.log('Found ABI')
          this.hasAbi = true
          try {
            this.$q.loading.show({
              message: 'Initializing DAO...',
              customClass: 'text-weight-bold text-subtitle1',
              spinnerSize: '15em',
              spinner: QSpinnerPuff
            })
            await new Promise(resolve => setTimeout(resolve, 700))
            this.$q.loading.hide()
            await this.initDao({
              account: this.dao.dao.toLowerCase()
            })
            this.initializedDAO = true
            this.loadData()
          } catch (e) {
            this.initializedDAO = false
          }
          this.$q.loading.hide()
        } else {
          console.log('NOT Found ABI')
          this.$q.loading.hide()
          this.showErrorMsg('An error occurred when the smart contract was deployed')
          this.$emit('backToListDao', true)
        }
        // await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (e) {
        this.hasAbi = false
        this.$q.loading.hide()
        this.showErrorMsg('An error ocurred while trying to deploy contract and Initialize the dao. Try again')
      }
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
          if (_index >= 0) {
            this.newLabels.splice(_index, 1)
          }
          this.showSuccessMsg('Label ' + contract.label + ' deleted.')
        } else {
          let label = this.manageContract[index].label
          this.deleteLabels.push(label)
          this.manageContract.splice(index, 1)
          let indexUpdate = this.updateLabels.findIndex(el => el.label === contract.label)
          if (indexUpdate >= 0) {
            this.updateLabels.splice(indexUpdate, 1)
          }
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
        this.fieldNameEditable = false
      } else {
        this.fieldNameEditable = true
      }
      let data = this.manageContract[index]
      this.contract = JSON.parse(JSON.stringify(data))
      this.idEdit = index
      this.prevLabel = this.manageContract[index].label
    },
    updateRow () {
      console.log({ new: this.newLabels, update: this.updateLabels, manage: this.manageContract })
      let index = this.idEdit
      if (!this.fieldNameEditable) {
        // Save in new labels
        var isEqual
        if (this.newLabels.find(el => el.label === this.contract.label)) {
          isEqual = (element) => element.label === this.contract.label
        } else {
          isEqual = (element) => element.label === this.prevLabel
        }
        let id = this.newLabels.findIndex(isEqual)
        if (id >= 0) {
          this.newLabels[id] = JSON.parse(JSON.stringify(this.contract))
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
        self.showErrorMsg('Error ocurred while file was uploaded. ' + e)
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
    openLinkString (Cid) {
      let url = 'https://ipfs.io/ipfs/' + Cid
      window.open(url, '_blank')
    }
  }
}
</script>
