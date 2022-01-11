<template lang="pug">
.q-py-sm
  TitleContentGroup(
    :isEditSystem="isEditSystem"
    :isEdit="isEdit"
    :title="content_group_data[0].title"
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
    no-data-label="There arent content_group",
    ref="table",
    hide-bottom,
    separator="none",
    table-header-class="hdTable"
    :visible-columns="visibleColumns"
    wrap-cells
  )
    template(#body="props")
      q-tr(:props="props")
        template(v-if="editableRow !== props.rowIndex")#ReadMode
          q-td(
            key="key",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          ) {{ props.row.key }}
          q-td(
            key="value",
            :props="props",
            style="word-break: break-all;"
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            div(
              v-if="!isIpfs(props.row.value) && !isEncrypt(props.row.value)"
              :inner-html.prop="render(props.row.value, true)"
              @click="seeValue(props.row.value)"
            )
            div(
              v-if="isIpfs(props.row.value) && !isEncrypt(props.row.value)"
            )
              q-chip(
                :ripple="false"
                size="12px"
                clickable
                @click="openIPFS(props.row.value)"
              ) IPFS
                q-tooltip(
                  content-class='bg-black'
                  transition-show="fade"
                  transition-hide="fade"
                  anchor="bottom middle"
                  self="top middle"
                  content-style="font-size: 12px"
                ) {{$t('pages.documentExplorer.edit.contentGroup.ipfs')}}
            div(
              v-if="!isIpfs(props.row.value) && isEncrypt(props.row.value)"
            )
              q-chip(
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
            key="dataType",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          ) {{ getDataType(props.row.dataType) }}
          q-td(
            v-if="isEdit  && editableRow !== props.rowIndex"
            key='Actions',
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            template
              .row.justify-center.q-col-gutter-md
                .col-xs-12.col-sm-12.col-md-6
                  div(
                    data-cy="editRowButton"
                    class='text-brand-primary text-capitalize animated-icon'
                    @click='onEditRow(props.row, props.rowIndex )'
                  ) Edit
                .col-xs-12.col-sm-12.col-md-6
                  div(
                    data-cy="deleteRowButton"
                    class='text-capitalize animated-icon'
                    style='color: #DC2626'
                    @click='onEraseRow(props.rowIndex )'
                  ) Delete
        template(v-else)#EditMode
          q-td(
            key="key",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            template(
              v-if="isEdit && isEditSystem"
            ) {{ props.row.key }}
            q-form(ref='keyForm')
              TInput(
                :rules="[rules.required]"
                data-cy='keyField'
                autofocus
                v-model="newData.key",
                v-if="isEdit && !isEditSystem"
                dense,
                placeholder="Key"
              )
          q-td(
            key="value",
            style="word-break: break-all;",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            q-form(ref='valueForm')
              TInput(
                data-cy="valueField"
                v-model="newData.value",
                :style="newData.dataType !== 's' ? 'padding-bottom: 1.8rem;' : ''"
                :autofocus="isEdit && isEditSystem"
                dense,
                :rules="getRules(newData.dataType)"
                :autogrow="getType(newData.dataType) === 'textarea'"
                :type="getType(newData.dataType)",
                class="verticalCenter",
                placeholder="Enter the value"
              )
            .row(v-if="newData.dataType === 's'")
              q-toggle(
                data-cy='encryptToggle'
                size='xs',
                no-hover,
                v-model='props.row.optional.encrypt',
                label='Encrypt',
                @input='onEncrypt(props.row)'
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
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
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
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            .row.q-col-gutter-md.q-pb-md
              .col-xs-12.col-sm-12.col-md-6
                div(
                  data-cy='saveEdit'
                  class='text-capitalize animated-icon text-brand-primary'
                  @click='onSave(props.rowIndex, props.row)'
                ) Save
              .col-xs-12.col-sm-12.col-md-6
                div(
                  data-cy='cancelEdit'
                  class='text-capitalize animated-icon text-brand-primary'
                  @click='onCancel(props.rowIndex, props.row)'
                ) Cancel
  .row.justify-end
    q-icon(
        data-cy='addRowButton'
        v-if='isEdit'
        class='text-brand-primary q-py-sm animated-icon',
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
import customRegex from '~/const/customRegex.js'
import DOMPurify from 'dompurify'
import { validation } from '~/mixins/validation'
import { marked } from 'marked'
import { mapGetters } from 'vuex'
import TitleContentGroup from './titleContentGroup.vue'
export default {
  name: 'ContentGroup',
  mixins: [validation],
  components: {
    TInput,
    TSelect,
    TitleContentGroup
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
    }
  },
  computed: {
    ...mapGetters('documentGraph', ['getIsEdit'])
  },
  mounted () {
    if (this.getIsEdit) {
      this.modifiedData()
      if (this.index_content_group !== 'system') {
        this.isEdit = true
        this.isEditSystem = false
      } else {
        this.isEditSystem = true
        this.isEdit = true
      }
      this.visibleColumns.push('actions')
    } else {
      this.isEditSystem = false
      this.isEdit = false
    }
  },
  data () {
    return {
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
        }
      ],
      newData: {
        optional: {
          encrypt: false,
          ipfs: false,
          file: undefined
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
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8  text-uppercase',
          style: 'color: rgb(107,114,128);',
          field: (row) => row.key,
          sortable: true
        },
        {
          name: 'value',
          label: 'Value',
          align: 'left',
          headerStyle: 'width:55%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8  text-uppercase',
          style: 'color: rgb(107,114,128);',
          field: (row) => row.value,
          sortable: true
        },
        {
          name: 'dataType',
          label: 'Data Type',
          align: 'left',
          headerStyle: 'width:10%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-uppercase ',
          style: 'color: rgb(107,114,128);',
          field: (row) => row.dataType,
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'justify',
          headerStyle: 'width:10%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8  text-uppercase',
          style: 'color: rgb(107,114,128);',
          sortable: false
        }
      ]
    }
  },
  methods: {
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
        case 'time':
          rule = 'required'
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
    openIPFS (cid) {
      window.open(`https://ipfs.io/ipfs/${cid}`, '_blank')
    },
    seeValue (value) {
      if (value.length > this.limitChars) {
        let md = DOMPurify.sanitize(marked(value))
        this.$q.dialog({
          title: 'Complete value',
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
    async modifiedData () {
      this.contentGroupCopy.forEach(element => {
        // element.value = marked(element.value)
        element.optional = {
          encrypt: false,
          ipfs: false,
          file: undefined
        }
      })
    },
    getDataType (val) {
      const types = {
        c: 'checksum256',
        n: 'name',
        a: 'asset',
        t: 'time',
        s: 'string',
        i: 'int64'
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
    isEncrypt (value) {
      if (value && typeof (value) === 'string') {
        return value.substring(0, 2) === 'U2'
      } else {
        return false
      }
    },
    isIpfs (value) {
      if (value) {
        var regexIPFS = new RegExp(customRegex.IPFS)
        return regexIPFS.test(value)
      } else {
        return false
      }
    },
    onEncrypt (value) {
      this.$forceUpdate()
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
      // TODO: Push into delete
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
          // TODO: First retrieve ipfs
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
      // TODO: send to the parent component to sign transaction
    },
    onCancel (index, row) {
      this.editableRow = undefined
    },
    onAddRow () {
      // TODO: Save the new row to sign
      let emptyObject = {
        optional: {
          encrypt: false,
          ipfs: false,
          file: undefined
        },
        title: this.content_group_data[0].title,
        key: '',
        value: '',
        dataType: 's'
      }
      this.contentGroupCopy.push(JSON.parse(JSON.stringify(emptyObject)))
      this.newData = JSON.parse(JSON.stringify(emptyObject))
      this.onEditRow(this.newData, this.contentGroupCopy.length - 1)
    },
    onSaveTitle (title) {
      this.content_group_data[0].title = title
    },
    onDeleteTitle (title) {
      this.$emit('deleteTitle', title)
    }
  }
}
</script>

<style lang="stylus" scoped>
.colorEncrypt
  color: #059669
.topAlign
  padding-top: 0.1rem
.titleClass
  color: rgb(107, 114, 128);
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
