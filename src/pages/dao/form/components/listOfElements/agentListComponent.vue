<template lang='pug'>
  q-dialog(v-model='show' full-width persistent)
    q-card
      q-toolbar(style='color:white;').bg-primary
        q-toolbar-title
          span.text-subtitle1 Select an Agent
        q-btn(dense flat icon='close' @click='closeModal' v-close-popup)
          q-tooltip Close
      q-card-section
      #container.q-px-xl.q-pb-md
        q-table.q-mb-sm(
          title: 'Agents'
          :data="agentsData"
          :columns="columns"
          :loading = "loading"
          row-key="number"
          flat
          dense
          :rows-per-page-options="[0]"
          no-data-label='No agents recovered'
          class="sticky-virtscroll-table"
          ref="table"
          table-header-class="hdTable"
          :hide-pagination="true"
          :filter="search"
          @row-click='selectRow'
          data-cy='tableAgents'
        )
          template(v-slot:no-data="{icon, message}")
            div(class='full-width row flex-center text-primary q-gutter-sm text-weight-bolder')
              q-icon( size='2em' name='warning')
              span
                | {{message}}
          template(v-slot:top-right)
            q-input(borderless, dense, debounce='300', v-model='search', placeholder='Search')
              template(v-slot:append)
                q-icon(name='search')
</template>
<style lang='sass'>

</style>
<script>
export default {
  name: 'agentListComponent',
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      search: '',
      loading: false,
      agentsData: [],
      columns: [
        {
          name: 'number',
          label: 'Number',
          align: 'left',
          field: row => row.number,
          sortable: true
        },
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: row => row.name.firstName + ' ' + row.name.lastName,
          sortable: true
        },
        {
          name: 'address',
          label: 'Address',
          align: 'left',
          field: row => row.address.line1 + ',' + row.city + ',' + row.postCode,
          style: 'max-width: 200px',
          sortable: true
        }
      ],
      idAgentSelect: null
    }
  },
  methods: {
    selectRow (evt, row) {
      console.log(row)
      const isEqual = (element) => element.number === row.number
      let id = this.agentsData.findIndex(isEqual)
      // this.$emit('agentSelected', id)
      this.selectedAgent(id)
    },
    async searchAgent () {
      this.dialog = !this.dialog
      this.loading = true
      this.agentsData = []
      const searchForm = this.dataForSearch
      console.log(searchForm)
      console.log('Datos solicitados')
      this.agentsData = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              'number': '0186605',
              'name': {
                'firstName': 'Aaron',
                'lastName': 'Martin'
              },
              'address': {
                'line1': '3896 CR 203'
              },
              'city': 'Cheyenne',
              'postCode': '82001',
              'state': 'WY',
              'phone': '(307)640-3551',
              'email': 'amartin_7362@yahoo.com'
            },
            {
              'number': '0184358',
              'name': {
                'firstName': 'Abrianne',
                'lastName': 'Thoman'
              },
              'address': {
                'line1': '65 Jones Dr',
                'line2': 'PO Box 86'
              },
              'city': 'LaBarge',
              'postCode': '83123',
              'state': 'WY',
              'phone': '(307)386-2194',
              'email': 'abrianne_@hotmail.com'
            },
            {
              'number': '0184230',
              'name': {
                'firstName': 'Agnes',
                'middleName': 'A',
                'lastName': 'Hanson'
              },
              'address': {
                'line1': '22 Old Hwy 85'
              },
              'city': 'Newcastle',
              'postCode': '82701',
              'state': 'WY',
              'phone': '(307)746-9604',
              'email': 'agnes_hanson@msn.com'
            },
            {
              'number': '0184187',
              'name': {
                'firstName': 'Aimee',
                'middleName': '',
                'lastName': 'Dendrinos'
              },
              'address': {
                'line1': '1200 E 20th St Ste A'
              },
              'city': 'Cheyenne',
              'postCode': '82001',
              'state': 'WY',
              'phone': '(307)773-1337',
              'email': 'adendrinos@winhealthpartners.org'
            }
          ])
        }, 300)
      })
      console.log('Datos obtenidos')
      this.loading = false
    },
    selectedAgent (id) {
      this.idAgentSelect = id
      this.dialog = false
      let selectedAgentData = this.agentsData[id]
      this.$emit('agentSelected', selectedAgentData)
      this.$emit('closeModal', true)
    },
    closeModal () {
      this.$emit('closeModal', true)
    }
  }
}
</script>
