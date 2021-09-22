<template lang="pug">
q-card(flat)
  q-card-section.text-subtitle1.bg-primary.text-white
      | Confirmation
  div.q-pl-xs.q-pt-md
    p Please confirm the business entity information is entered correctly.
    p Warning : Please review your filing and click 'Continue' to file your registration electronically.
    .row
      .col(style='text-align: left; padding-left:0em;')
        div
          strong Name
        div {{form.businessName.businessName}}
        div
          strong Filing ID
        div (new)
        div
          strong Type
        div {{type}}
        div
          strong Additional Designation
        div {{form.businessName.additionalDesignation}}
        div
        div.q-py-xs
      .col(style='text-align: left; padding-left:5em; padding-right:3em;')
        div
          strong Filing Date
        div {{form.detail.periodOfDuration}}
        div
          strong Delayed Effective Date
        div {{form.detail.delayedEffectiveDate}}
        div
          strong Term of Duration
        div {{form.detail.expirationDate}}
        div.q-pt-sm
        div
          strong Formed in
        div {{formedIn}}
      .col(style='text-align: left;')
        template
          strong Mailing Address
          div(v-for="(address,index) in form.addresses.mailingAddress.address" )
            | {{address}}
          div
            | {{form.addresses.mailingAddress.city}}, {{form.addresses.mailingAddress.state}} {{form.addresses.mailingAddress.postalCode}}
          div
            | {{form.addresses.mailingAddress.country}}
        div.q-py-sm
        template
          strong Principal Office
          div(v-for="(address,index) in form.addresses.principalAddress.address" )
            | {{address}}
          div
            | {{form.addresses.mailingAddress.city}}, {{form.addresses.mailingAddress.state}} {{form.addresses.mailingAddress.postalCode}}
          div
            | {{form.addresses.mailingAddress.country}}
    template
      OrganizerListComponent(:elementsObj='form.organizers' title='Organizers' )
    template
      ArticlesListComponent(:elementsObj='form.additionalArticles')
    template
      .text-subtitle1 Registered Agent
      hr
      .row.justify-left
        .col-xs-12.col-sm-3
          strong Agent Name
          div {{form.agent.firstName}} {{form.agent.middleName}} {{form.agent.lastName}}
        .col-xs-12.col-sm-3
          div.q-pt-sm
            strong Email
          div {{form.agent.email}}
        .col-xs-12.col-sm-3
          div.q-pt-sm
            strong Phone
          div {{form.agent.phone}}
        .col-xs-12.col-sm-3
          div.q-pt-sm
            template
              strong Principal Office
              div(v-for='(address,index) in form.agent.address' )
                | {{address}}
          p {{form.agent.city}}, {{form.agent.state}}{{form.agent.postalCode}}
    template
    .q-pt-xs
      .text-subtitle1 Filing Fee
      hr
      .row.justify-left
        | ${{form.price}}
</template>

<style lang="">

</style>

<script>
import OrganizerListComponent from './listOfElements/organizerListComponent.vue'
import ArticlesListComponent from './listOfElements/articlesListComponent.vue'
export default {
  name: 'confirmationComponent',
  components: { OrganizerListComponent, ArticlesListComponent },
  props: {
    form: {
      type: Object
    }
  },
  data () {
    return {
      type: 'Limited Liability Company',
      formedIn: 'Wyoming'
    }
  },
  methods: {

  }
}
</script>
