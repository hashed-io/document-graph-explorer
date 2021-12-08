<template lang="pug">
.q-py-sm
  template(v-if="isEdit")
    #Title
      template(v-if="!editableTitle")
        .row.justify-start.q-pb-md
          .col-xs-12.col-sm-2
            .text-h6.q-px-md {{content_group_data[0].title}}
          .col-xs-12.col-sm-1
            q-btn(
              class="btnEdit btnTailwind"
              label='Edit'
              unelevated
              no-caps
              @click='editableTitle = true'
            )
      .row.q-py-lg(v-if="editableTitle")
        .col-xs-12.col-sm-6
          TInput(
            label='Title'
            v-model='content_group_data[0].title'
            dense
          ).q-pr-md
        .col-xs-12.col-sm-5
          .row.q-col-gutter-md
            .col-xs-6.col-sm-12.col-md-6
              q-btn(
                label='Save'
                no-caps
                @click='onSaveTitle'
                class="spaceBtn q-mr-sm btnTailwind"
              )
            .col-xs-6.col-sm-12.col-md-6
              q-btn(
                no-caps
                label='Delete'
                @click='onDeleteTitle'
                class="spaceBtn btnTailwind"
              )
  div.q-pb-md.text-subtitle1.q-pl-md(v-else) {{content_group_data[0].title}}
  CryptoDialog(:openDialog="openCryptoDialog" @close-dialog="onCloseDialog")
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
      q-tr(:props="props" )
        q-td(
          key="key",
          :props="props",
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        )
          template(
            v-if="editableRow !== props.rowIndex"
          ) {{ props.row.key }}
          template(v-else)
            TInput(
              v-model="newData.key"
              dense
              placeholder="Key"
            )
        q-td(
          key="value",
          :props="props",
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        )
          div(
            v-if="editableRow !== props.rowIndex"
          ) {{ /(T\d\d:\d\d:\d\d)/.test(props.row.value) ? dateToString(props.row.value) : props.row.value}}
          template(v-else)
            TInput(
              v-model="newData.value"
              dense
              placeholder="Value"
            )
        q-td(
          key="dataType",
          :props="props",
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        )
          div(
            v-if="editableRow !== props.rowIndex"
          ) {{ getDataType(props.row.dataType) }}
          template(v-else)
            .q-mt-md
              TSelect(
                v-model="newData.dataType"
                :placeholder="newData.dataType"
                :options="optionsSelect"
                dense
                )
        q-td(
          v-if="isEdit  && editableRow !== props.rowIndex"
          key='Actions',
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        )
          .row
            .col-6
              div(
                class='text-brand-primary text-capitalize text-bold animated-icon'
                @click='onEditRow(props.row, props.rowIndex )'
              ) Edit
            .col-6
              div(
                class='text-capitalize text-bold animated-icon'
                style='color: #DC2626'
                @click='onEraseRow(props.rowIndex )'
              ) Delete
        q-td(
          v-show="isEdit && editableRow !== undefined && editableRow === props.rowIndex"
          key='Save'
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        )
          .row.justify-center
            div(
              class='text-capitalize text-bold animated-icon text-brand-primary'
              @click='onSave(props.rowIndex)'
            )
              | Save
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
import { mapGetters } from 'vuex'
import TInput from '~/components/input/t-input.vue'
import TSelect from '../../../../../components/select/t-select.vue'
import CryptoDialog from './crypto-dialog.vue'
export default {
  name: 'ContentGroup',
  components: {
    TInput,
    TSelect,
    CryptoDialog
  },
  props: {
    content_group_data: {
      type: Array,
      required: true
    },
    index_content_group: {
      type: String
    }
  },
  computed: {
    ...mapGetters('documentGraph', ['getIsEdit'])
  },
  mounted () {
    if (this.getIsEdit) {
      this.isEdit = true
      this.visibleColumns.push('actions')
    } else {
      this.isEdit = false
    }
  },
  data () {
    return {
      openCryptoDialog: false,
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
          headerStyle: ' width:15%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8  text-uppercase',
          field: (row) => row.key,
          sortable: true
        },
        {
          name: 'value',
          label: 'Value',
          align: 'left',
          headerStyle: 'width:64%; font-size:12px;',
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
    onEditRow (row, rowIndex) {
      if (row) {
        this.newData = row
      }
      console.log(this.newData)
      this.editableRow = rowIndex
    },
    onEraseRow (rowIndex) {
      this.contentGroupCopy.splice(rowIndex, 1)
      // TODO: Push into delete
    },
    onSave (rowIndex) {
      this.contentGroupCopy.splice(rowIndex, this.newData)
      this.editableRow = undefined
      // TODO: send to the parent component to sign transaction
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
    },
    onCloseDialog (cryptoKey) {
      this.openCryptoDialog = false
      alert(cryptoKey)
    }
  }
}
</script>

<style lang="stylus" scoped>
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
  top:40%
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

</style>
