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
          ) {{ camelCaseToFormat(props.row.key).toLowerCase() }}
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
            div(v-if="props.row.dataType === 'sd'")
              q-chip(
                data-cy="FileChip"
              ) FILE
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
                :debounce="1000"
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
                label='Upload file to IPFS'
                @update='getFile'
                )
            .row(v-if="newData.dataType === 's'")
              q-toggle(
                data-cy='encryptToggle'
                size='xs',
                no-hover,
                v-model='props.row.optional.encrypt',
                label='Encrypt',
                @input='onEncrypt(props.rowIndex,props.row)'
              )
              q-toggle(
                data-cy='ipfsToggle'
                size='xs',
                v-model='props.row.optional.ipfs',
                label='IPFS',
                @input='onIpfs(props.row.value,props.row.optional.ipfs)'
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
import { mapGetters } from 'vuex'
import TitleContentGroup from './titleContentGroup.vue'
import TFile from '~/components/file/t-file.vue'
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
    ...mapGetters('documentGraph', ['getIsEdit'])
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
    verifyTypeIPFS (value) {
      let str = value.substring(0, 7)
      if (str.includes('://')) {
        return 'FILE'
      } else {
        return 'IPFS'
      }
    },
    getFile (file) {
      this.newData.value = file.cid
    },
    async verifyValue () {
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
    async openIPFS (cid, rowIndex) {
      if (cid.substring(7).includes(':')) {
        const file = await BrowserIpfs.retrieve(cid.substring(7))
        var blob = new Blob([file.payload], { type: file.type })
        var url = window.URL.createObjectURL(blob)
        var a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        a.click()
      } else {
        let data = await BrowserIpfs.getFromJson(cid)
        this.contentGroupCopy[rowIndex].value = data.data
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
          if (bool.edit) {
            element.optional = {
              encrypt: false,
              ipfs: false,
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
    encryptValue (value) {
      if (this.cryptoKey) {
        return Encrypt.encryptText(value, this.cryptoKey)
      }
    },
    decryptValue (value, row, rowIndex) {
      if (this.cryptoKey) {
        row.value = (Encrypt.decryptText(value, this.cryptoKey))
        this.contentGroupCopy.splice(rowIndex, row)
      } else {
        this.$emit('openDialog', true)
      }
    },
    async onEncrypt (rowIndex, value) {
      value.value = this.newData.value
      await this.$forceUpdate()
      if (!this.cryptoKey) {
        this.$emit('openDialog', true)
      }
    },
    async onIpfs (value, saveInIPFS) {
      this.$forceUpdate()
    },
    onEditRow (row, rowIndex) {
      if (row) {
        this.newData = JSON.parse(JSON.stringify(row))
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
        let count = this.contentGroupCopy.filter((obj) => obj.key === this.newData.key).length
        if (count > 0 && row.key !== this.newData.key) {
          this.showErrorMsg('The key value is repeated.')
          return
        }
        if (!this.newData.key) {
          this.showErrorMsg('Fill the Key value')
          return
        }
        let obj = row.optional
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
