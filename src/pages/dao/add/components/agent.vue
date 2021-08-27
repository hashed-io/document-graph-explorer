//TODO City input show a Postal Code available in Wyoming
<template lang="pug">
.q-pa-md.row.items-start.q-gutter-md
  q-card
    q-card-section.bg-primary.text-white
      .text-h6 Search for a Registered Agent
    q-separator
    p.q-pa-md
      | The registered agent may be an individual resident in Wyoming who is at least eighteen (18) years old, or a domestic or foreign entity authorized to transact business in Wyoming having a business office identical with such registered office. The registered agent must have a physical address in Wyoming. A Post Office Box or Drop Box is not acceptable. If the registered office includes a suite number, it must be included in the registered office address.
    ul
      li
        strong
          a(href='https://sos.wyo.gov/Forms/WyoBiz/Registered_Offices_and_Agents_Act_Chapter_28.pdf' style="color:#AC2734;") Registered Offices and Agents Act
    .container
      q-form(@submit='searchAgent', @reset='onReset' ref="searchAgent")
        .row.justify-center
          .col.q-pa-md
            q-input(v-model='dataForSearch.firstName', filled, label="First Name", label-stacked)
          .col.q-pa-md
            q-input(v-model='dataForSearch.middleName', filled, label="Middle Name", label-stacked)
          .col.q-pa-md
            q-input(v-model='dataForSearch.lastName', filled, label="Last Name", label-stacked)
        .row.justify-center
          .col
            q-input.q-pa-md(v-model='dataForSearch.organization', filled, label="Organization Name", label-stacked)
        .container.q-pa-md
          q-btn(label='Search' type='submit' color='primary' @click='dialog =!dialog')
          q-btn(label='Clear' type='reset' flat class='q-ml-sm' color='primary')
  .col
    q-card(class='column')
      q-card-section.bg-primary.text-white
        div(v-if="agentForm.firstName !== null && agentFound")
          .row
            .col
              p Selected Agent: {{responseSearch.selectedAgent}}
        div(v-else)
          | Enter Agent Information
      q-separator
      .container
        q-form(@submit="onSubmit" @reset='clearAgent' ref="dataAgentForm")
          .col(style='text-align:right').q-pt-sm
            q-btn(label='clear agent' outline type='reset')
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-4
              q-input(v-model='agentForm.firstName', filled, label='First Name : *', label-stacked :rules='[rules.required]')
            .col.q-pa-md.col-xs-12.col-sm-4
              q-input(v-model='agentForm.middleName', filled, label='Middle Name :', label-stacked)
            .col.q-pa-md.col-xs-12.col-sm-4
              q-input(v-model='agentForm.lastName', filled, label='Last Name : *', label-stacked :rules='[rules.required]' lazy-rules)
          .row.justify-center
            .col-q-pa-md.col-xs-12.col-sm-12
              q-input.q-pa-md(v-model='agentForm.organization', filled, label="Organization Name", label-stacked readonly bg-color="grey-5")
          .row.justify-left
            .col.q-pa-md.col-xs-12.col-sm-8
              q-input(v-model='agentForm.country', filled, label="Country", label-stacked :readonly='true' bg-color="grey-5")
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-12
              q-input(v-model='agentForm.address.line1', filled, label="Address Line 1 *", label-stacked :rules='[rules.required]')
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-12
              q-input(v-model='agentForm.address.line2', filled, label="Address Line 2", label-stacked)
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-12
              q-input(v-model='agentForm.address.line3', filled, label="Address Line 3", label-stacked)
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-6
              q-input(v-model='agentForm.city', @input="getPostalCode()" filled, label='City: *', label-stacked :rules='[rules.required]')
            .col.q-pa-md.col-xs-12.col-sm-2
              q-input(v-model='agentForm.state', filled, label='State: *', label-stacked readonly bg-color="grey-5" :rules='[rules.required]')
            .col.q-pa-md.col-xs-12.col-sm-4
              q-input(v-model='agentForm.postalCode' filled, label='Postal Code: *', label-stacked  readonly bg-color="grey-5" :rules='[rules.required]')
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-12
              q-input(v-model='agentForm.phone', filled, label='Phone: *', label-stacked mask="phone" :rules='[rules.required]')
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-12
              q-input(v-model='agentForm.email', filled, label='Email: *', label-stacked :rules="[rules.required, rules.isEmail]")
              div(style='color:red;')
                q-checkbox(v-model='agree' label="* I have obtained a signed and dated statement by the registered agent in which they voluntarily consent to appointment for this entity. " )
  .dialog
    q-dialog(v-model='dialog' full-width)
      q-card
        q-toolbar(style='background-color: #4839F9; color:white;')
          q-toolbar-title
            span.text-weight-bold Select an Agent
          q-btn(dense flat icon='close' v-close-popup)
            q-tooltip Close
        q-card-section
        div(v-if='agentsData.length === 0')
          .row.justify-center.q-pa-xl
              q-spinner(color='primary' size='5em')
        div(v-else)
          q-item.q-pb-md
            q-item-section(top)
              q-item-label
                strong.text-h6 Agent Code
            q-item-section(top)
              q-item-label
                strong.text-h6 Agent Name
            q-item-section(top)
              q-item-label
                strong.text-h6 Agent Address
          div(v-for='(agent,indexAgent) in agentsData' :key='agent.number')
            .itemsList
              q-item(clickable v-ripple @click='selectedAgent(indexAgent)' :active="idAgentSelect === indexAgent"  active-class='menuLinkActive')
                q-item-section(top)
                  q-item-label
                    strong.item {{agent.number}}
                q-item-section(top)
                  q-item-label
                    p.item {{agent.name.firstName}}&nbsp;{{agent.name.lastName}}
                q-item-section(top)
                  q-item-label
                  p.item {{agent.address.line1}}, {{agent.city}},{{agent.postCode}}

</template>

<style lang="sass">
.menuLinkActive
  color: blue
  background: #ddd
.item
  color: #808080
</style>

<script>
import { validation } from '~/mixins/validation'
// import { Notify } from 'quasar'
export default {
  name: 'agentComponent',
  mixins: [validation],
  data () {
    return {
      validateComponent: false,
      agentFound: true,
      idAgentSelect: null,
      dialog: false,
      agree: false,
      agentForm: {
        firstName: null,
        middleName: null,
        lastName: null,
        organization: null,
        country: 'USA',
        address: {
          line1: null,
          line2: null,
          line3: null
        },
        city: null,
        state: 'WY',
        postalCode: null,
        phone: null,
        email: null
      },
      dataForSearch: {
        firstName: null,
        middleName: null,
        lastName: null,
        Organization: null
      },
      responseSearch: {
        selectedAgent: null
      },
      agentsData: []
    }
  },
  methods: {
    async searchAgent () {
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
    },
    onReset () {
      const object = this.dataForSearch
      for (var key in object) {
        object[key] = null
      }
    },
    getPostalCode () {
      // TODO Show modal with all PostalCode
    },
    onSubmit () {
      const agentForm = this.$refs.dataAgentForm
      var self = this

      agentForm.validate().then(success => {
        if (success) {
          if (self.agree) {
            this.$emit('dataFromAgent', this.agentForm)
          } else {
            this.$q.notify({
              type: 'negative',
              message: `Accept the agree`
            })
          }
        }
      })
    },
    selectedAgent (id) {
      this.idAgentSelect = id
      this.dialog = false
      let selectedAgentData = this.agentsData[id]
      let agentForm = this.agentForm
      this.responseSearch.selectedAgent = selectedAgentData.number
      agentForm.firstName = selectedAgentData.name.firstName
      agentForm.middleName = selectedAgentData.name.middleName
      agentForm.lastName = selectedAgentData.name.lastName
      agentForm.address.line1 = selectedAgentData.address.line1
      agentForm.address.line2 = selectedAgentData.address.line2
      agentForm.city = selectedAgentData.city
      agentForm.postalCode = selectedAgentData.postCode
      agentForm.state = selectedAgentData.state
      agentForm.phone = selectedAgentData.phone
      agentForm.email = selectedAgentData.email
    },
    clearAgent () {
      this.agentForm.postalCode = null
      this.agentForm.firstName = null
      this.agentForm.middleName = null
      this.agentForm.lastName = null
      this.agentForm.organization = null
      this.agentForm.city = null
      this.agentForm.phone = null
      this.agentForm.email = null
      for (let key in this.agentForm.address) {
        this.agentForm.address[key] = null
      }
    }
  }
}
</script>
