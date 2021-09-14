<template lang="pug">
q-card(flat)
  q-card-section.text-subtitle1.q-pb-md.bg-primary.text-white
      | Confirmation
  div.q-pa-md
    p Please confirm the business entity information is entered correctly.
    p Warning : Please review your filing and click 'Continue' to file your registration electronically.
    .row
      .col-8(align='justify')
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
        div.q-pt-sm
        template
          strong Mailing Address
          div(v-for="(address,index) in form.addresses.mailingAddress.address" )
            | {{address}}
          div
            | {{form.addresses.mailingAddress.city}}, {{form.addresses.mailingAddress.state}} {{form.addresses.mailingAddress.postalCode}}
          div
            | {{form.addresses.mailingAddress.country}}
      .col-4(align='justify')
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
    .q-py-md
      .text-subtitle1 Organizers
      hr
      div(v-if='form.organizers.length === 0')
        p  No Organizers Currently Assigned...
      div(v-else)
        q-list()
          div(v-for='(organizer, index) in form.organizers')
              q-item(clickable)
                q-item-section(top)
                  q-item-label(lines='5')
                    span.text-subtitle1
                      | Name: &nbsp;
                      b {{organizer.name}}
                  q-item-label(caption='', lines='1')
                    span.text-subtitle1
                      | type: &nbsp;
                      b {{organizer.officerType}}
                  q-item-label.q-mt-xs.text-caption.text-weight-bold.text-primary.text-uppercase(lines='1')
                    span Address:  &nbsp;
                      b {{organizer.addressInfo}}
    template
    .q-py-md
      .text-subtitle1 Articles Detail
      hr
      div(v-if='form.additionalArticles.length === 0')
        p    No Additional Articles Identified...
      div(v-else)
        q-list()
          div(v-for='(article, index) in form.additionalArticles')
            template
              q-item(clickable)
                q-item-section(top)
                  q-item-label(lines='5')
                    span.text-subtitle1
                      strong
                        | Article: &nbsp; #
                      b {{article.number}}
                q-item-section(top class="col-10")
                  q-item-label(caption='', lines='30')
                    span.text-subtitle1
                      strong
                        | Detail: &nbsp;
                      p {{article.detail}}
    template
      .text-subtitle1 Registered Agent
      hr
      .row.justify-left
        .col-3
          strong Agent Name
          div {{form.agent.firstName}} {{form.agent.middleName}} {{form.agent.lastName}}
        .col-3
          div.q-pt-sm
            strong Email
          div {{form.agent.email}}
        .col-3
          div.q-pt-sm
            strong Phone
          div {{form.agent.phone}}
        .col-3
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
export default {
  name: 'confirmationComponent',
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
