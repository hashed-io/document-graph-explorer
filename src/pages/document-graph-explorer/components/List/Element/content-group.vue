<template lang="pug">
.q-py-sm.text-capitalize
  div.q-pb-md.text-subtitle1.q-pl-md {{content_group_data[0].title}}
  q-table.sticky-virtscroll-table(
    :data="content_group_data",
    :columns="columns",
    :row-key="(row) => row.label",
    :pagination="initialPagination",
    clearable,
    no-data-label="There arent content_group",
    ref="table",
    hide-bottom,
    separator="none",
    table-header-class="hdTable"
  )
    template(#body="props")
      q-tr(:props="props")
        q-td.column-responsive(
          key="key",
          :props="props",
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        ) {{ props.row.key }}
        q-td.column-responsive(
          key="value",
          :props="props",
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        ) {{ props.row.value }}
        q-td.column-responsive(
          key="dataType",
          :props="props",
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        ) {{ getDataType(props.row.dataType) }}
  q-icon.q-py-sm(v-if='isEdit' color="secondary", size="2rem", @click="alert('Adding new Content group')" )
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
export default {
  name: 'ContentGroup',
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
    } else {
      this.isEdit = false
    }
  },
  data () {
    return {
      isEdit: false,
      initialPagination: {
        rowsPerPage: 10,
        page: 1
      },
      columns: [
        {
          name: 'key',
          label: 'Key',
          align: 'left',
          headerStyle: ' width:20%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8  text-uppercase',
          classes: 'column-responsive',
          field: (row) => row.key,
          sortable: true
        },
        {
          name: 'value',
          label: 'Value',
          align: 'left',
          headerStyle: 'width:60%; font-size:12px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8  text-uppercase',
          classes: 'column-responsive',
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
          classes: 'column-responsive',
          style: 'color: rgb(107,114,128);',
          field: (row) => row.dataType,
          sortable: true
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
</style>
