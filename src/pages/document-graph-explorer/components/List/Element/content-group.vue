<template lang="pug">
.q-py-sm.text-capitalize
  .row.q-py-md(v-if="isEdit")
    .col-3
      TInput(
        label='Title'
        v-model='content_group_data[0].title'
        dense
      ).q-pr-md
    .col-3
      q-btn(
        label='Save'
        @click='onSaveTitle'
        class="spaceBtn q-mr-sm"
      )
      q-btn(
        label='Delete'
        @click='onDeleteTitle'
        class="spaceBtn"
      )
  div.q-pb-md.text-subtitle1.q-pl-md(v-else) {{content_group_data[0].title}}
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
          .row.q-gutter-sm
            q-btn(
              size='12px'
              class='btnTailwind'
              label='Edit'
              unelevated
              no-caps
              @click='onEditRow(props.row, props.rowIndex )'
            )
            q-btn(
              size='12px'
              label='Delete'
              class='btnTailwind'
              unelevated
              no-caps
              @click='onEraseRow(props.rowIndex )'
            )
        q-td(
          v-show="isEdit && editableRow !== undefined && editableRow === props.rowIndex"
          key='Save'
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        )
          q-btn(
            size='12px'
            class='btnTailwind'
            label='Save'
            unelevated
            no-caps
            @click='onSave(props.rowIndex)'
          )
  .row.justify-end
    q-icon(
        v-if='isEdit'
        class='text-brand-primary q-py-sm',
        size="2rem",
        @click="onAddRow()"
      )
      svg.h-6.w-6(
        fill="none",
        viewBox="0 0 24 24",
        stroke="currentColor"
      ).animated-icon
        path(
          stroke-linecap="round",
          stroke-linejoin="round",
          stroke-width="2",
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import TInput from '~/components/input/t-input.vue'
import TSelect from '../../../../../components/select/t-select.vue'
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
      title: undefined,
      contentGroupCopy: this.content_group_data,
      editableRow: undefined,
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
          headerStyle: ' width:20%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8  text-uppercase',
          field: (row) => row.key,
          sortable: true
        },
        {
          name: 'value',
          label: 'Value',
          align: 'left',
          headerStyle: 'width:60%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8  text-uppercase',
          style: 'color: rgb(107,114,128);',
          field: (row) => row.value,
          sortable: true
        },
        {
          name: 'dataType',
          label: 'Data Type',
          align: 'left',
          headerStyle: 'width:20%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-uppercase ',
          style: 'color: rgb(107,114,128);',
          field: (row) => row.dataType,
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'center',
          headerStyle: 'font-size:12px;',
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
      console.log('Save title ' + this.content_group_data[0].title)
    },
    onDeleteTitle () {
      console.log('Delete title ' + this.content_group_data[0].title)
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
.btnTailwind
  border-radius: 10px
  height: 2rem
  color:white
  width: 3.5rem
  background: #4F46E5
.spaceBtn
  margin-top: 1.3rem
  border-radius: 10px
  height: 2.2rem
  color:white
  width: 4rem
  background: #4F46E5
</style>
