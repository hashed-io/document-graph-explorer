<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'agentComponent',
  mixins: [validation],
  data () {
    return {
      validateComponent: false,
      agentFound: true,
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
        selectedAgent: '15781'
      }
    }
  },
  methods: {
    onSubmit () {
      const searchForm = this.dataForSearch
      console.log(searchForm)
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
    onSubmitAgent () {
      const agentForm = this.$refs.dataAgentForm
      var self = this

      agentForm.validate().then(success => {
        if (success) {
          if (self.agree) {
            this.$emit('dataFromAgent', this.agentForm, false)
            alert('send to parent')
          } else {
            alert('Accept the agree.')
          }
        } else {

        }
      })
    }
  }
}
</script>
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
      q-form(@submit='onSubmit', @reset='onReset' ref="searchAgent")
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
          q-btn(label='Search' type='submit' color='primary')
          q-btn(label='Clear' type='reset' flat class='q-ml-sm' color='primary')
  .col
    q-card(class='column')
      q-card-section.bg-primary.text-white
        div(v-if="agentForm.firstName !== null && agentFound")
          .row
            p Selected Agent: {{responseSearch.selectedAgent}}
        div(v-else)
          | Enter Agent Information
      q-separator
      .container
        q-form(@submit="onSubmitAgent" ref="dataAgentForm")
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-4
              q-input(v-model='agentForm.firstName', filled, label='First Name : *', label-stacked :rules='[rules.required]')
            .col.q-pa-md.col-xs-12.col-sm-4
              q-input(v-model='agentForm.middleName', filled, label='Middle Name :', label-stacked)
            .col.q-pa-md.col-xs-12.col-sm-4
              q-input(v-model='agentForm.lastName', filled, label='Last Name : *', label-stacked :rules='[rules.required]' lazy-rules)
          .row.justify-center
            .col-q-pa-md.col-xs-12.col-sm-12
              q-input.q-pa-md(v-model='agentForm.organization', filled, label="Organization Name", label-stacked disable bg-color="grey-5")
          .row.justify-left
            .col.q-pa-md.col-xs-12.col-sm-8
              q-input(v-model='agentForm.country', filled, label="Country", label-stacked :disable='true' bg-color="grey-5")
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
              q-input(v-model='agentForm.state', filled, label='State: *', label-stacked disable bg-color="grey-5" :rules='[rules.required]')
            .col.q-pa-md.col-xs-12.col-sm-4
              q-input(v-model='agentForm.postalCode', filled, label='Postal Code: *', label-stacked disable bg-color="grey-5" :rules='[rules.required]')
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-12
              q-input(v-model='agentForm.phone', filled, label='Phone: *', label-stacked mask="phone" :rules='[rules.required]')
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-12
              q-input(v-model='agentForm.email', filled, label='Email: *', label-stacked :rules="[rules.required, rules.isEmail]")
              div(style='color:red;') *
                q-checkbox(v-model='agree' label="I have obtained a signed and dated statement by the registered agent in which they voluntarily consent to appointment for this entity. " )
              br
              q-btn(label='Validate' type='submit' color='primary' style="margin-top:1%;")
</template>

<style lang="">

</style>
