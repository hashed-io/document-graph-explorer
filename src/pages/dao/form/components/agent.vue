<template lang="pug">
div
  q-card(flat)
    q-card-section.bg-primary.text-white
      .text-subtitle1 Search for a Registered Agent
    q-separator
    p.q-px-xs.q-pt-md
      | The registered agent may be an individual resident in Wyoming who is at least eighteen (18) years old, or a domestic or foreign entity authorized to transact business in Wyoming having a business office identical with such registered office. The registered agent must have a physical address in Wyoming. A Post Office Box or Drop Box is not acceptable. If the registered office includes a suite number, it must be included in the registered office address.
    ul
      li
        strong
          a(href='https://sos.wyo.gov/Forms/WyoBiz/Registered_Offices_and_Agents_Act_Chapter_28.pdf' style="color:#AC2734;") Registered Offices and Agents Act
    .container.q-px-xs.q-pb-md.q-gutter-sm
      q-btn(label='Search' type='submit' color='primary' @click='searchAgent()')
      q-btn(label='clear agent' @click='clearAgent()' type='reset' color='primary')
    q-card-section.bg-primary.text-white
      div(v-if="agentForm.firstName !== null && agentFound")
        .row
          .col.text-subtitle1
            div Selected Agent: {{responseSearch.selectedAgentInfo}}
      div(v-else).text-subtitle1
        | Enter Agent Information
    div
      q-form(@submit="onSubmit"  ref="dataAgentForm")
        .row.q-pt-md.q-col-gutter-sm
          .col.col-xs-12.col-sm-4
            q-input(v-model='agentForm.firstName', filled, label='First Name : *', label-stacked :rules='[rules.required]')
              template(v-slot:prepend)
                q-icon(name='badge')
          .col.col-xs-12.col-sm-4.q-pb-md
            q-input(v-model='agentForm.middleName', filled, label='Middle Name :', label-stacked)
          .col.col-xs-12.col-sm-4
            q-input(v-model='agentForm.lastName', filled, label='Last Name : *', label-stacked :rules='[rules.required]' lazy-rules)
        .row
          .col-xs-12.col-sm-12
            q-input.q-pb-md(v-model='agentForm.organization', filled, label="Organization Name", label-stacked readonly bg-color="grey-5")
              template(v-slot:prepend)
                q-icon(name='business')
        .row
          .col.q-py-sm.col-xs-12.col-sm-8
            q-input.rulesPadding(v-model='agentForm.country', filled, label="Country", label-stacked :readonly='true' bg-color="grey-5")
        .row.justify-center
          .col.q-pt-sm.col-xs-12.col-sm-12
            q-input(v-model='agentForm.address.line1', filled, label="Address Line 1 *", label-stacked :rules='[rules.required]')
              template(v-slot:prepend)
                q-icon(name='location_on')
        .row.justify-center
          .col.q-py-sm.col-xs-12.col-sm-12
            q-input.rulesPadding(v-model='agentForm.address.line2', filled, label="Address Line 2", label-stacked)
        .row.q-col-gutter-xs
          .col.q-py-sm.col-xs-12.col-sm-6
            q-input(v-model='agentForm.city', filled, label='City: *', label-stacked :rules='[rules.required]')
          .col.q-py-sm.col-xs-12.col-sm-2
            q-input(v-model='agentForm.state', filled, label='State: *', label-stacked readonly bg-color="grey-5" :rules='[rules.required]')
          .col.q-py-sm.col-xs-12.col-sm-4
            q-input(v-model='agentForm.postalCode' filled, label='Postal Code: *', label-stacked  readonly bg-color="grey-5" :rules='[rules.required]')
        .row
          .col.q-py-xs.col-xs-12.col-sm-12
            q-input(v-model='agentForm.phone', filled, label='Phone: *', label-stacked mask="phone" :rules='[rules.required]')
              template(v-slot:prepend)
                q-icon(name='phone')
        .row.justify-center
          .col.q-py-xs.col-xs-12.col-sm-12
            q-input(v-model='agentForm.email', filled, label='Email: *', label-stacked :rules="[rules.required, rules.isEmail]")
              template(v-slot:prepend)
                q-icon(name='email')
            div(style='color:red;').q-pt-md
              q-checkbox(v-model='agree' label="* I have obtained a signed and dated statement by the registered agent in which they voluntarily consent to appointment for this entity. " )
  .dialog
    AgentListComponent(ref='agentList' :show='dialog' @agentSelected='selectedAgent' @closeModal='closeModal')
    //- q-dialog(v-model='dialog' full-width)
    //-   q-card
    //-     q-toolbar(style='color:white;').bg-primary
    //-       q-toolbar-title
    //-         span.text-subtitle1 Select an Agent
    //-       q-btn(dense flat icon='close' v-close-popup)
    //-         q-tooltip Close
    //-     q-card-section
    //-     #container.q-px-xl.q-pb-md
    //-       q-table.q-mb-sm(
    //-         title: 'Agents'
    //-         :data="agentsData"
    //-         :columns="columns"
    //-         :loading = "loading"
    //-         row-key="number"
    //-         flat
    //-         dense
    //-         :rows-per-page-options="[0]"
    //-         no-data-label='No agents recovered'
    //-         class="sticky-virtscroll-table"
    //-         ref="table"
    //-         table-header-class="hdTable"
    //-         :hide-pagination="true"
    //-         :filter="search"
    //-         @row-click='selectRow'
    //-       )
    //-         template(v-slot:no-data="{icon, message}")
    //-           div(class='full-width row flex-center text-primary q-gutter-sm text-weight-bolder')
    //-             q-icon( size='2em' name='warning')
    //-             span
    //-               | {{message}}
    //-         template(v-slot:top-right)
    //-           q-input(borderless, dense, debounce='300', v-model='search', placeholder='Search')
    //-             template(v-slot:append)
    //-               q-icon(name='search')

</template>

<style lang="sass">
.menuLinkActive
  color: blue
  background: #ddd
.item
  color: #808080
.rulesPadding
  padding-bottom : 1.3%
</style>

<script>
import { validation } from '~/mixins/validation'
import AgentListComponent from './listOfElements/agentListComponent.vue'
export default {
  name: 'agentComponent',
  mixins: [validation],
  components: { AgentListComponent },
  props: {
    agentObject: Object
  },
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
      responseSearch: {
        selectedAgentInfo: null
      }

    }
  },
  beforeMount () {
    this.agentForm = JSON.parse(JSON.stringify(this.agentObject))
  },
  methods: {
    closeModal () {
      this.dialog = false
    },
    searchAgent () {
      this.dialog = true
      this.$refs.agentList.searchAgent()
    },
    onReset () {
      const object = this.dataForSearch
      for (var key in object) {
        object[key] = null
      }
    },
    onSubmit () {
      const agentForm = this.$refs.dataAgentForm
      var self = this
      agentForm.validate().then(success => {
        if (success) {
          if (self.agree) {
            this.$emit('dataFromAgent', this.agentForm)
          } else {
            this.showErrorMsg('Accept the agree')
          }
        }
      })
    },
    selectedAgent (selectedAgentData) {
      let agentForm = this.agentForm
      this.responseSearch.selectedAgentInfo = selectedAgentData.number
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
      this.$refs.dataAgentForm.reset()
    }
  }
}
</script>
