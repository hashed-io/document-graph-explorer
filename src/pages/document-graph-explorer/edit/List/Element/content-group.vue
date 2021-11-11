<template lang="pug">
.q-py-sm
  q-table.sticky-virtscroll-table(
    :data="content_group_data.data",
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
      q-tr(no-hover, :props="props")
        q-td(
          key="key",
          no-hover,
          :props="props",
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        ) {{ props.row.key }}
        q-td(
          key="value",
          no-hover,
          :props="props",
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        ) {{ props.row.value }}
        q-td(
          key="dataType",
          no-hover,
          :props="props",
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        ) {{ props.row.dataType }}
  q-icon.q-py-sm(color="primary", size="2rem", @click="")
    svg.h-6.w-6(
      fill="none",
      viewBox="0 0 24 24",
      stroke="currentColor"
    )
      path(
        stroke-linecap="round",
        stroke-linejoin="round",
        stroke-width="2",
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      )
</template>

<script>
export default {
  name: 'ContentGroup',
  props: {
    content_group_data: {
      type: Object,
      required: true
    },
    index_content_group: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      initialPagination: {
        rowsPerPage: 10,
        page: 1
      },
      columns: [
        {
          name: 'key',
          label: 'Key',
          align: 'left',
          headerStyle: 'font-weight: bolder;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          classes: '',
          field: (row) => row.key,
          sortable: true
        },
        {
          name: 'value',
          label: 'Value',
          align: 'left',
          headerStyle: 'font-weight: bolder;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          classes: '',
          field: (row) => row.value,
          sortable: true
        },
        {
          name: 'dataType',
          label: 'Data Type',
          align: 'left',
          headerStyle: 'font-weight: bolder;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          classes: '',
          field: (row) => row.dataType,
          sortable: true
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped></style>
