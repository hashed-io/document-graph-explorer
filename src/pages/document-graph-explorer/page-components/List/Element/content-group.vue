<template lang="pug">
.q-py-sm
  TitleContentGroup(
    :isEditSystem="isEditSystem"
    :isEdit="isEditTitle"
    :title="index_content_group"
    @deleteTitle="onDeleteTitle"
    @onSaveTitle="onSaveTitle"
  )
  #TABLE
  q-table.sticky-virtscroll-table.TailWind(
    :data="contentGroupCopy",
    :columns="columns",
    :row-key="(row) => row.label",
    :pagination="initialPagination",
    clearable,
    no-data-label="There arent content group",
    ref="table",
    hide-bottom,
    separator="none",
    card-class="tableColor"
    :visible-columns="visibleColumns"
    wrap-cells
  )
    template(#body="props")
      q-tr(:props="props")
        template(v-if="editableRow !== props.rowIndex")#ReadMode
          q-td(
            data-cy='keyRead'
            key="key",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'rowOdd' : 'rowEven'"
          ) {{ camelCaseToFormat(props.row.key).toLowerCase()}}
          q-td(
            data-cy="valueRead"
            key="value",
            :props="props",
            style="word-break: break-word;"
            :class="props.rowIndex % 2 === 0 ? 'rowOdd' : 'rowEven'"
          )
            div(
              style="overflow-wrap: break-word;"
              v-if="!isIpfs(props.row.value) && !isEncrypt(props.row.value)"
              :inner-html.prop="render(props.row.value, true)"
              @click="seeValue(props.row.value)"
            )
            div(
              v-else-if="isIpfs(props.row.value) && !isEncrypt(props.row.value)"
            )
              q-chip(
                data-cy='chipIpfs'
                :ripple="false"
                size="12px"
                clickable
                @click="openIPFS(props.row.value, props.rowIndex)"
              ) {{verifyTypeIPFS(props.row.value)}}
                q-spinner(
                  v-if="isLoadingIPFS === props.rowIndex"
                  class="q-ml-xs"
                  :size="16"
                  color="primary"
                  :thickness="2"
                )
                q-tooltip(
                  content-class='bg-black'
                  transition-show="fade"
                  transition-hide="fade"
                  anchor="bottom middle"
                  self="top middle"
                  content-style="font-size: 12px"
                ) {{$t('pages.documentExplorer.edit.contentGroup.ipfs')}}
            div(
              v-else-if="!isIpfs(props.row.value) && isEncrypt(props.row.value)"
            )
              q-chip(
                data-cy='chipEncrypt'
                :ripple="false"
                size="12px"
                clickable
                @click="decryptValue(props.row.value, props.row, props.rowIndex )"
              ) Encrypted
                q-tooltip(
                  content-class='bg-black'
                  transition-show="fade"
                  transition-hide="fade"
                  anchor="bottom middle"
                  self="top middle"
                  content-style="font-size: 12px"
                ) {{$t('pages.documentExplorer.edit.contentGroup.encrypt')}}
          q-td(
            data-cy="dataTypeRead"
            key="dataType",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'rowOdd' : 'rowEven'"
          ) {{ getDataType(props.row.dataType) }}
          q-td(
            data-cy="ActionRead"
            v-if="isEdit  && editableRow !== props.rowIndex"
            key='Actions',
            :class="props.rowIndex % 2 === 0 ? 'rowOdd' : 'rowEven'"
          )
            template
              .row.justify-center.q-col-gutter-md
                .col-xs-12.col-sm-12.col-md-6
                  div(
                    data-cy="editRowButton"
                    class='actionsButton text-capitalize animated-icon'
                    @click='onEditRow(props.row, props.rowIndex )'
                  ) Edit
                .col-xs-12.col-sm-12.col-md-6
                  div(
                    v-if="isEdit && !isEditSystem && props.row.key !== 'nodeLabel'"
                    data-cy="deleteRowButton"
                    class='text-capitalize deleteButton animated-icon'
                    @click='onEraseRow(props.rowIndex)'
                  ) Delete
        template(v-else)#EditMode
          q-td(
            key="key",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'rowOdd' : 'rowEven'"
          )
            template(
              v-if="isEdit && !isEditSystem && props.row.key === 'nodeLabel'"
            ) {{ props.row.key }}
            q-form(ref='keyForm')
              TInput(
                :rules="[rules.required, rules.validContent, rules.contentLength]"
                :inputFormatting="true"
                data-cy='keyField'
                autofocus
                v-model="newData.key",
                v-if="isEdit && !isEditSystem && props.row.key !== 'nodeLabel'"
                dense,
                placeholder="Key"
              )
          q-td(
            key="value",
            style="word-break: break-all;",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'rowOdd' : 'rowEven'"
          )
            q-form(ref='valueForm')
              TInput(
                v-if="newData.dataType !== 'sd'"
                data-cy="valueField"
                v-model="newData.value",
                :style="newData.dataType !== 's' ? 'padding-bottom: 1.8rem;' : ''"
                :autofocus="isEdit && isEditSystem"
                :mask="newData.dataType === 't' ? '####-##-## ##:##': ''"
                :fillMask="newData.dataType === 't'"
                :hint="newData.dataType === 't' ? 'YYYY-MM-DD HH:MM':''"
                dense,
                :rules="getRules(newData.dataType)"
                :autogrow="getType(newData.dataType) === 'textarea'"
                :type="getType(newData.dataType)",
                class="verticalCenter",
                placeholder="Enter the value"
              )
              TFile(
                v-else
                class="verticalCenter",
                :label="getLabelFile()"
                :encrypted="newData.value"
                :rules="[rules.required]"
                @update='getFile'
                )
            .row(v-if="newData.dataType === 's'")
              q-toggle(
                data-cy='encryptToggle'
                size='xs',
                no-hover,
                v-model='newData.optional.encrypt',
                label='Encrypt',
                @input='onEncrypt(props.rowIndex,newData)'
              )
              q-toggle(
                data-cy='ipfsToggle'
                size='xs',
                v-model='newData.optional.ipfs',
                label='IPFS',
                @input='onIpfs(props.row.value,newData.optional.ipfs)'
              )
          q-td(
            key="dataType",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'rowOdd' : 'rowEven'"
          )
            template(
              v-if="isEdit && isEditSystem"
            ) {{getDataType(props.row.dataType)}}
            q-form(ref='selectTypeForm').topAlign
              TSelect(
                :rules="[rules.required]"
                data-cy='selectType'
                v-if="isEdit && !isEditSystem"
                v-model="newData.dataType",
                :placeholder="newData.dataType",
                :options="optionsSelect"
                dense
                @update="verifyValue"
                )
          q-td(
            v-show="isEdit && editableRow !== undefined && editableRow === props.rowIndex",
            key='Save',
            :class="props.rowIndex % 2 === 0 ? 'rowOdd' : 'rowEven'"
          )
            .row.q-col-gutter-md.q-pb-md
              .col-xs-12.col-sm-12.col-md-6
                div(
                  data-cy='saveEdit'
                  class='text-capitalize animated-icon actionsButton'
                  @click='onSave(props.rowIndex, props.row)'
                ) Save
              .col-xs-12.col-sm-12.col-md-6
                div(
                  data-cy='cancelEdit'
                  class='text-capitalize animated-icon actionsButton'
                  @click='onCancel(props.rowIndex, props.row)'
                ) Cancel
  .row.justify-end
    q-icon(
        data-cy='addRowButton'
        v-if='isEdit'
        class='text-brand-primary q-py-sm cursor-pointer',
        size="2rem",
        @click="onAddRow()"
      )
        svg(xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor")
          path(fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd")
</template>

<script>
import BrowserIpfs from '~/services/BrowserIpfs.js'
import TInput from '~/components/input/t-input.vue'
import TSelect from '~/components/select/t-select.vue'
import Encrypt from '~/utils/EncryptUtil'
import DOMPurify from 'dompurify'
import { validation } from '~/mixins/validation'
import { marked } from 'marked'
import { mapGetters, mapMutations, mapState } from 'vuex'
import TitleContentGroup from './titleContentGroup.vue'
import TFile from '~/components/file/t-file.vue'
import axios from 'axios'
import mime from 'mime-types'

export default {
  name: 'ContentGroup',
  mixins: [validation],
  components: {
    TInput,
    TSelect,
    TitleContentGroup,
    TFile
  },
  props: {
    content_group_data: {
      type: Array,
      required: false
    },
    index_content_group: {
      type: String
    },
    cryptoKey: {
      type: String,
      required: false
    },
    keysBackend: {
      type: Array,
      required: true
    },
    content_group_back: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    }
  },
  computed: {
    ...mapGetters('documentGraph', ['getIsEdit']),
    ...mapState('documentGraph', ['keyToEncrypt'])
  },
  beforeMount () {
    this.isEdit = true
    if (this.keysBackend.length > 0) {
      this.isEditTitle = !(this.keysBackend.includes(this.index_content_group))
    }
    if (this.getIsEdit) {
      this.modifiedData({ edit: true })
      this.isEditSystem = false
      this.visibleColumns.push('actions')
    } else {
      this.modifiedData({ edit: false })
      this.isEditSystem = false
      this.isEdit = false
    }
  },
  mounted () {
  },
  data () {
    return {
      isLoadingIPFS: undefined,
      isEditTitle: false,
      isValid: true,
      isEditSystem: false,
      limitChars: 500,
      typeInput: true,
      title: undefined,
      contentGroupCopy: JSON.parse(JSON.stringify(this.content_group_data)),
      editableRow: false,
      editableTitle: false,
      previousTitle: undefined,
      optionsSelect: [
        {
          label: 'Cheksum256',
          value: 'c'
        },
        {
          label: 'Name',
          value: 'n'
        },
        {
          label: 'Time',
          value: 't'
        },
        {
          label: 'String',
          value: 's'
        },
        {
          label: 'Asset',
          value: 'a'
        },
        {
          label: 'Int64',
          value: 'i'
        },
        {
          label: 'File',
          value: 'sd'
        }
      ],
      newData: {
        optional: {
          encrypt: false,
          ipfs: false,
          file: undefined,
          loadingFile: undefined
        },
        title: undefined,
        key: undefined,
        value: undefined,
        dataType: undefined
      },
      isEdit: false,
      initialPagination: {
        rowsPerPage: 50,
        page: 1
      },
      visibleColumns: ['key', 'value', 'dataType'],
      columns: [
        {
          name: 'key',
          label: 'Key',
          align: 'left',
          headerStyle: 'width:15%; font-size:12px;',
          headerClasses: 'tableColor text-subtitle2 text-uppercase',
          field: (row) => row.key,
          sortable: true
        },
        {
          name: 'value',
          label: 'Value',
          align: 'left',
          headerStyle: 'width:55%; font-size:12px;',
          headerClasses: 'tableColor text-subtitle2   text-uppercase',
          field: (row) => row.value,
          sortable: true
        },
        {
          name: 'dataType',
          label: 'Data Type',
          align: 'left',
          headerStyle: 'width:10%; font-size:12px;',
          headerClasses: 'tableColor text-subtitle2  text-uppercase ',
          field: (row) => row.dataType,
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'justify',
          headerStyle: 'width:10%; font-size:12px;',
          headerClasses: 'tableColor text-subtitle2   text-uppercase',
          sortable: false
        }
      ]
    }
  },
  methods: {
    ...mapMutations('documentGraph', ['setCryptoDialogState', 'setUploadFile']),
    verifyTypeIPFS (value) {
      let str = value.substring(0, 7)
      switch (str) {
        case 'file://':
          return 'File'
        case 'File://':
          return 'File'
        case 'eFile:/':
          return 'File encrypted'
        default:
          return 'IPFS'
      }
    },
    async getFile (cid) {
      this.newData.value = cid
      if (await this.$refs.keyForm.validate() && await this.$refs.valueForm.validate() && await this.$refs.selectTypeForm.validate()) {
        this.contentGroupCopy.splice(this.editableRow, 1, this.newData)
        this.$emit('elementChanged', { data: this.contentGroupCopy, key: this.index_content_group })
        this.editableRow = undefined
      }
    },
    getLabelFile () {
      let prefix = this.newData.value.substring(0, 7).toString()
      if (prefix === 'file://' || prefix === 'File://') {
        let cid = this.newData.value.substring(7).split(':')
        return cid[0]
      } else if (prefix === 'eFile:/') {
        let cid = this.newData.value.substring(8).split(':')
        return cid[0]
      } else {
        return 'Upload file to IPFS'
      }
    },
    async verifyValue () {
      if (this.newData.dataType === 'a') {
        this.showSuccessMsg('Asset example: 1 USD')
      }
      this.newData.value = ''
      this.newData.optional.encrypt = false
      this.newData.optional.ipfs = false
      await this.$refs.valueForm.validate()
      this.$forceUpdate()
    },
    getType (selectType) {
      let dataType = this.getDataType(selectType)
      if (dataType === 'int64') {
        return 'number'
      } else {
        return 'textarea'
      }
    },
    getRules (selectType) {
      let dataType = this.getDataType(selectType)
      var rule
      switch (dataType) {
        case 'checksum256':
          rule = 'isChecksum'
          break
        case 'name':
          rule = 'accountFormat'
          break
        case 'asset':
          rule = 'required'
          break
        case 'time_point':
          rule = 'isTimePoint'
          break
        case 'string':
          rule = 'required'
          break
        case 'int64':
          rule = 'required'
          break
      }
      return [this.rules[rule]]
    },
    async strToUint8Array (text) {
      const buffer = new ArrayBuffer(text.length)
      const view = new Uint8Array(buffer)
      for (let i = 0; i < text.length; i++) {
        view[i] = text.charCodeAt(i)
      }
      return view
    },
    async openIPFS (cid, rowIndex) {
      try {
        this.isLoadingIPFS = rowIndex
        const prefixfile = cid.substring(0, 7)
        const prefixefile = cid.substring(0, 8)
        const File = prefixfile === 'File://'
        const file = prefixfile === 'file://'
        const eFile = prefixefile === 'eFile://'
        if (file) {
          await this.openFilePrev(cid)
        } else if (File) {
          await this.openFileNew(cid)
        } else if (eFile) {
          await this.openEncryptedFile(cid)
        } else {
          await this.openStringIPFS(cid, rowIndex)
        }
      } catch (error) {
        this.showErrorMsg('An error occurred while opening the file ' + error)
        console.log('An error occurred while opening the file ' + error)
      } finally {
        this.isLoadingIPFS = undefined
      }
    },
    async openEncryptedFile (cid) {
      if (!this.cryptoKey) {
        this.setCryptoDialogState(true)
        return
      }
      try {
        let file = await BrowserIpfs.retrieve(cid.substring(8))
        var blobEncrypted = new Blob([file.payload], { type: file.type })
        let text = await Encrypt.decryptFile(blobEncrypted, this.keyToEncrypt)
        var blobDecrypted = new Blob([text], { type: file.type })
        let url = window.URL.createObjectURL(blobDecrypted)
        let a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        a.click()
      } catch (error) {
        this.showErrorMsg('An error ocurred while retrieving the file ' + error)
        console.log('An error ocurred while retrieving the file ' + error)
      }
    },
    async openFileNew (cid) {
      try {
        let file = await BrowserIpfs.retrieve(cid.substring(7))
        var blob = new Blob([file.payload], { type: file.type })
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        a.click()
      } catch (error) {
        this.showErrorMsg('An error occured while retrieving the file ' + error)
        console.log('An error occured while retrieving the file ' + error)
      }
    },
    async openFilePrev (cid) {
      const _cid = cid.substring(7).split(':')
      try {
        var response = await axios.post(`${process.env.IPFS_URL}/api/v0/cat?arg=${_cid[0]}`)
      } catch (error) {
        this.showErrorMsg('An error ocurred while retrieving the file')
      }
      // response is a String (base64)
      let text = response.data
      // Convert Base64 to a blob object [ArrayBuffer]
      let uint8Array = await this.strToUint8Array(text)
      // Blob object [Encrypted?]
      if (await this.isEncrypt(text)) {
        if (!this.keyToEncrypt) {
          this.showSuccessMsg('Write the key to decrypt the file')
          this.setCryptoDialogState(true)
        } else {
          try {
            let blob = new Blob([uint8Array], { type: mime.lookup(_cid[1]) })
            // Send blob to decrypt [Decrypt Text fails with message: Malformed UTF-8 data]
            text = await Encrypt.decryptFile(blob, this.keyToEncrypt)
            blob = new Blob([text], { type: mime.lookup(_cid[1]) })
            // filereader to read as string
            let url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = url
            a.target = '_blank'
            a.click()
          } catch (error) {
            this.showErrorMsg('An error occurred while decrypting the file ' + error)
          }
        }
      } else {
        let blob = new Blob([uint8Array], { type: mime.lookup(_cid[1]) })
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        a.click()
      }
    },
    async openStringIPFS (cid, rowIndex) {
      try {
        const response = await BrowserIpfs.getFromJson(cid)
        this.contentGroupCopy[rowIndex].value = response.data
      } catch (error) {
        this.showErrorMsg('An error occurred while retrieving the IPFS data')
        console.log('An error occurred while retrieving the IPFS data')
      }
    },
    seeValue (value) {
      if (value.length > this.limitChars) {
        let md = DOMPurify.sanitize(marked(value))
        this.$q.dialog({
          title: 'Complete value',
          style: 'border-radius:10px; width:auto',
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
      }
    },
    render (val, split) {
      if (val && typeof (val) === 'string') {
        let chars = val.length
        var md
        if (chars > 500 && split) {
          md = DOMPurify.sanitize(marked(val.substring(0, this.limitChars) + '<br>...'))
        } else {
          md = DOMPurify.sanitize(marked(val.substring(0, this.limitChars)))
        }
        return md
      } else {
        return val
      }
    },
    async saveStringIPFS (saveInIPFS, value) {
      if (saveInIPFS) {
        this.$q.loading.show({
          message: 'Saving in IPFS...'
        })
        try {
          var ipfsString = await BrowserIpfs.addAsJson({ data: value })
        } catch (e) {
          this.showErrorMsg('Error occurred while data was saving in IPFS. ' + e)
        } finally {
          this.$q.loading.hide()
        }
        return ipfsString
      }
    },
    async modifiedData (bool) {
      let filterContentGroup = []
      this.contentGroupCopy.forEach(element => {
        // If the value is empty won't show to user in UI
        if (element.value !== '') {
          const prefix = element.value.toString().substring(0, 7)
          const file = prefix.includes('file:/')
          const File = prefix.includes('File:/')
          if (file || File) {
            element.dataType = 'sd'
          }
          if (bool.edit) {
            element.optional = {
              encrypt: this.isEncrypt(element.value),
              ipfs: this.isIpfs(element.value),
              file: undefined,
              loadingFile: undefined
            }
          }
          filterContentGroup.push(element)
        }
      })
      this.contentGroupCopy = filterContentGroup
    },
    getDataType (val) {
      const types = {
        c: 'checksum256',
        n: 'name',
        a: 'asset',
        t: 'time_point',
        s: 'string',
        i: 'int64',
        sd: 'File'
      }
      return types[val]
    },
    async encryptValue (value) {
      if (this.keyToEncrypt) {
        return Encrypt.encryptText(value, this.keyToEncrypt)
      }
    },
    decryptValue (value, row, rowIndex) {
      if (this.keyToEncrypt) {
        try {
          let decrypted = Encrypt.decryptText(value, this.keyToEncrypt)
          if (decrypted) {
            row.value = decrypted
            this.contentGroupCopy.splice(rowIndex, row)
          } else {
            throw new Error('Decrypt failed')
          }
        } catch (error) {
          this.showErrorMsg('Wrong key to decrypt the file')
        }
      } else {
        this.$emit('openDialog', true)
      }
    },
    async onEncrypt (rowIndex, value) {
      value.value = this.newData.value
      await this.$forceUpdate()
      if (!this.keyToEncrypt && value.optional.encrypt) {
        this.$emit('openDialog', true)
      }
    },
    async onIpfs (value, saveInIPFS) {
      this.$forceUpdate()
    },
    onEditRow (row, rowIndex) {
      if (row) {
        this.newData = JSON.parse(JSON.stringify(row))
        this.newData.key = this.camelCaseToFormat(this.newData.key)
      }
      this.editableRow = rowIndex
      // this.openCryptoDialog = true
    },
    onEraseRow (rowIndex) {
      this.contentGroupCopy.splice(rowIndex, 1)
      this.$emit('elementChanged', { data: this.contentGroupCopy, key: this.index_content_group })
    },
    async onSave (rowIndex, row) {
      if (await this.$refs.keyForm.validate() && await this.$refs.valueForm.validate() && await this.$refs.selectTypeForm.validate()) {
        if (this.newData.dataType === 'sd') {
          // Change Vuex state to save the file
          this.setUploadFile(true)
          return
        }
        let count = this.contentGroupCopy.filter((obj) => obj.key === this.newData.key).length
        if (count > 0 && row.key !== this.newData.key) {
          this.showErrorMsg('The key value is repeated.')
          return
        }
        if (!this.newData.key) {
          this.showErrorMsg('Fill the Key value')
          return
        }
        let obj = this.newData.optional
        if (obj.encrypt && !obj.ipfs) {
          this.newData.optional.encrypt = true
          this.newData.optional.ipfs = false
          if (!this.isEncrypt(this.newData.value)) {
            this.newData.value = await this.encryptValue(this.newData.value)
          }
        } else if (!obj.encrypt && obj.ipfs) {
          this.newData.optional.encrypt = false
          this.newData.optional.ipfs = true
          if (!this.isIpfs(this.newData.value) && this.newData.value) {
            this.newData.value = await this.saveStringIPFS(true, this.newData.value)
          }
        } else if (obj.encrypt && obj.ipfs) {
          this.newData.optional.encrypt = true
          this.newData.optional.ipfs = true
          if (!this.isEncrypt(this.newData.value)) {
            this.newData.value = await this.encryptValue(this.newData.value)
          }
          if (!this.isIpfs(this.newData.value) && this.newData.value) {
            this.newData.value = await this.saveStringIPFS(true, this.newData.value)
          }
        }
        this.contentGroupCopy.splice(rowIndex, 1, this.newData)
        this.$emit('elementChanged', { data: this.contentGroupCopy, key: this.index_content_group })
        this.editableRow = undefined
      }
    },
    async onCancel (index, row) {
      if (await this.$refs.keyForm.validate()) {
        row.key = JSON.parse(JSON.stringify(this.newData.key))
        this.contentGroupCopy.splice(index, 1, row)
        this.editableRow = undefined
      } else {
        this.showErrorMsg('The key is necessary')
      }
    },
    async onAddRow () {
      if (this.$refs.keyForm) {
        let key = await this.$refs.keyForm.validate()
        let value = await this.$refs.valueForm.validate()
        let dataType = await this.$refs.selectTypeForm.validate()
        if (!key || !value || !dataType) {
          return this.showErrorMsg('Fill the information')
        }
      }
      let emptyObject = {
        optional: {
          encrypt: false,
          ipfs: false,
          file: undefined,
          loadingFile: undefined
        },
        title: this.index_content_group,
        key: '',
        value: '',
        dataType: 's'
      }
      this.contentGroupCopy.push(JSON.parse(JSON.stringify(emptyObject)))
      this.newData = JSON.parse(JSON.stringify(emptyObject))
      this.onEditRow(this.newData, this.contentGroupCopy.length - 1)
    },
    onSaveTitle (title) {
      // this.content_group_data[0].title = title
    },
    onDeleteTitle (title) {
      this.$emit('deleteTitle', title)
    }
  }
}
</script>

<style lang="stylus" scoped>
.actionsButton
  color: $positive
.deleteButton
  color: $delete-button !important
.tableColor
  background : $table-header-color !important
  color: $table-header-font !important
.rowOdd
  background: $table-content-color-odd
  color: $table-content-font-odd
.rowEven
  background: $table-content-color-even
  color: $table-content-font-even
.q-chip
  background: $chip-bg
  margin: 0px
  color: $chip-font
.topAlign
  padding-top: 0.1rem
.titleClass
  color: $title-content-group !important
.cardTailWind
  border-radius: 50px !important
  width: 500px !important
.column-responsive
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  max-width: 300px
.autogrow
  overflow-wrap: break-word;
  max-width: 300px
.TailWind
  border-radius: 10px
.iconTailwind
  color: #4338CA
.spaceBtn
  top: 65%
  border-radius: 10px
  height: 2.2rem
  color:white
  width: 4rem
  background: #4F46E5
.btnEdit
  height: 38px
  width : 85.78px
.btnTailwind
  width 108px
.verticalCenter
  margin-top: 30px
.fontSize
  font-size: 16px !important
</style>
