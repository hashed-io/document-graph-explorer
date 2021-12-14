<template lang="pug">
.q-py-sm
  template(v-if="isEdit")
    #Title
      template(v-if="!editableTitle")
        .row.justify-start.q-pb-md
            div.q-pl-md
              | {{content_group_data[0].title}}
            div(
              class='text-brand-primary text-capitalize animated-icon customAlign'
              @click='editableTitle = true'
            ) Edit
      .row.q-py-lg(v-if="editableTitle")
        .col-xs-12.col-sm-6
          TInput(
            label='Title'
            v-model='content_group_data[0].title'
            dense
          ).q-pr-md
        .col-xs-12.col-sm-5
          .row.q-col-gutter-md
            .col-xs-6.col-sm-3.col-md-2
              div(
                class='text-brand-primary text-capitalize animated-icon alignButtons'
                @click='onSaveTitle'
              ) Save
            .col-xs-6.col-sm-1.col-md-1
              div(
                class='text-brand-primary text-capitalize animated-icon alignButtons'
                @click='onDeleteTitle'
              ) Delete

  div.q-pb-md.q-pl-md.fontSize(v-else) {{content_group_data[0].title}}
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
          )
            template(
            ) {{ props.row.key }}
          q-td(
            key="dataType",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            div(
            ) {{ getDataType(props.row.dataType) }}
          q-td(
            key="value",
            :props="props",
            style="word-break: break-all;"
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            q-markdown(
              v-if="!isIpfs(props.row.value) && !isEncrypt(props.row.value)"
            ) {{ /(T\d\d:\d\d:\d\d)/.test(props.row.value) ? dateToString(props.row.value) : props.row.value}}
            div(
              v-if="isIpfs(props.row.value) && !isEncrypt(props.row.value)"
            )
              a(
                :href="'https://ipfs.io/ipfs/'+props.row.value"
                target="_blank"
                class="text-brand-primary"
              ) {{props.row.value}}
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
              div(
                style='color:#0ea5e9'
                @click="decryptValue(props.row.value, props.row, props.rowIndex )"
              ) {{props.row.value}}
              q-tooltip(
                content-class='bg-black'
                transition-show="fade"
                transition-hide="fade"
                anchor="bottom middle"
                self="top middle"
                content-style="font-size: 12px"
              ) {{$t('pages.documentExplorer.edit.contentGroup.encrypt')}}
          q-td(
            v-if="isEdit  && editableRow !== props.rowIndex"
            key='Actions',
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            template
              .row.justify-between
                .col-xs-12.col-sm-12.col-md-6
                  div(
                    class='text-brand-primary text-capitalize animated-icon'
                    @click='onEditRow(props.row, props.rowIndex )'
                  ) Edit
                .col-xs-12.col-sm-12.col-md-6
                  div(
                    class='text-capitalize animated-icon'
                    style='color: #DC2626'
                    @click='onEraseRow(props.rowIndex )'
                  ) Delete
        template(v-else)#EditMode
          q-td(
            key="key",
            :props="props",
            size="xl",
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            TInput(
              v-model="newData.key",
              dense,
              placeholder="Key"
            )
          q-td(
            key="dataType",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            .q-mt-md
              TSelect(
                v-model="newData.dataType",
                :placeholder="newData.dataType",
                :options="optionsSelect"
                dense
                )
          q-td(
            key="value",
            style="word-break: break-all;",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            TInput(
              v-model="newData.value",
              dense,
              :type="'textarea'",
              autogrow,
              class="verticalCenter",
              placeholder="Value"
            )
            .row
              q-toggle(
                size='xs',
                no-hover,
                v-model='props.row.optional.encrypt',
                label='Encrypt',
                @input='onEncrypt(props.row)'
              )
              q-toggle(
                size='xs',
                v-model='props.row.optional.ipfs',
                label='IPFS',
                @input='onIpfs(props.row.value,props.row.optional.ipfs)'
              )
          q-td(
            v-show="isEdit && editableRow !== undefined && editableRow === props.rowIndex",
            key='Save',
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          )
            .row
              .col-xs-12.col-sm-12.col-md-6
                div(
                  class='text-capitalize animated-icon text-brand-primary'
                  @click='onSave(props.rowIndex, props.row)'
                ) Save
              .col-xs-12.col-sm-12.col-md-6
                div(
                  class='text-capitalize animated-icon text-brand-primary'
                  @click='onCancel(props.rowIndex, props.row)'
                ) Cancel
  .row.justify-end
    q-icon(
        v-if='isEdit'
        class='text-brand-primary q-py-sm animated-icon',
        size="2rem",
        @click="onAddRow()"
      )
        svg(xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor")
          path(fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd")
</template>

<script>
import BrowserIpfs from 'src/services/BrowserIpfs.js'
import { mapGetters } from 'vuex'
import TInput from '~/components/input/t-input.vue'
import TSelect from '~/components/select/t-select.vue'
import Encrypt from '~/utils/EncryptUtil'
import customRegex from 'src/const/customRegex.js'
export default {
  name: 'ContentGroup',
  components: {
    TInput,
    TSelect
  },
  props: {
    content_group_data: {
      type: Array,
      required: true
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
      this.isEdit = true
      this.visibleColumns.push('actions')
    } else {
      this.isEdit = false
    }
  },
  data () {
    return {
      typeInput: true,
      title: undefined,
      contentGroupCopy: this.content_group_data,
      editableRow: false,
      editableTitle: false,
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
          headerStyle: 'width:10%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8  text-uppercase',
          field: (row) => row.key,
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
          name: 'value',
          label: 'Value',
          align: 'left',
          headerStyle: 'width:65%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8  text-uppercase',
          style: 'color: rgb(107,114,128);',
          field: (row) => row.value,
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'center',
          headerStyle: 'width:10%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8  text-uppercase',
          style: 'color: rgb(107,114,128);',
          sortable: false
        }
      ]
    }
  },
  methods: {
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
    modifiedData () {
      this.contentGroupCopy.forEach(element => {
        element.optional = {
          encrypt: false,
          ipfs: false,
          file: undefined
        }
      })
    },
    getDataType (val) {
      const types = {
        c: 'Checksum256',
        n: 'Name',
        a: 'Asset',
        t: 'Time',
        s: 'String',
        i: 'Int64'
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
      if (value) {
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
        this.newData = row
      }
      console.log(this.newData)
      this.editableRow = rowIndex
      // this.openCryptoDialog = true
    },
    onEraseRow (rowIndex) {
      this.contentGroupCopy.splice(rowIndex, 1)
      // TODO: Push into delete
    },
    async onSave (rowIndex, row) {
      let obj = row.optional
      console.log(obj)
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
      this.contentGroupCopy.splice(rowIndex, this.newData)
      this.editableRow = undefined
      // TODO: send to the parent component to sign transaction
    },
    onCancel () {
      this.editableRow = undefined
    },
    onAddRow () {
      // TODO: Save the new row to sign
      let emptyObject = {
        title: this.content_group_data[0].title,
        key: 'Key',
        value: 'Value',
        dataType: 's'
      }
      console.log(emptyObject)
      this.contentGroupCopy.push(emptyObject)
      this.newData = emptyObject
      this.onEditRow(undefined, this.contentGroupCopy.length - 1)
    },
    onSaveTitle () {
      this.editableTitle = false
      console.log('Save title ' + this.content_group_data[0].title)
    },
    onDeleteTitle () {
      console.log('Delete title ' + this.content_group_data[0].title)
    }
  }
}
</script>

<style lang="stylus" scoped>
.alignButtons
  margin-top: 1.9rem
.customAlign
  margin-left: 2rem
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
