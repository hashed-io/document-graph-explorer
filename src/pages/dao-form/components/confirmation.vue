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
      formedIn: 'Wyoming',
      form2: {
        price: 100,
        businessName: {
          businessName: 'DAO LC TESTER',
          additionalDesignation: 'Decentralized Autonomous Organization'
        },
        detail: {
          periodOfDuration: '08/19/2021',
          expirationDate: 'perpetual',
          delayedEffectiveDate: '(none)'
        },
        agent: {
          firstName: 'Amber',
          middleName: null,
          lastName: 'Mercil',
          organization: null,
          country: 'USA',
          address: {
            line1: '631 Mayoworth Rd',
            line2: null,
            line3: null
          },
          city: 'Kaycee',
          state: 'WY',
          postalCode: '82639',
          phone: '(307) 738-2279',
          email: 'abjones@rtconnect.net'
        },
        addresses: {
          principalAddress: {
            country: null,
            address: {
              line1: '48764 Howard Forge Apt. 421 Vanessaside, PA 19763 PAD1',
              line2: '848 Melissa Springs Suite 947 Kellerstad, MD 80819 PAD2',
              line3: '578 Michael Island New Thomas, NC 34644 PAD3'
            },
            city: 'Changchester',
            state: 'WY',
            postalCode: '50995',
            phone: '(999) 999-9999',
            fax: '(194) 892-4115',
            email: 'icormierw_o41r@xeoty.com'
          },
          mailingAddress: {
            country: 'USA',
            address: {
              line1: '60975 Jessica Squares East Sallybury, FL 71671 MAD1',
              line2: '96593 White View Apt. 094 Jonesberg, FL 05565 MAD2',
              line3: '39916 Mitchell Crescent New Andrewburgh, DE 63315 MAD3'
            },
            city: 'Changchester',
            state: 'WY',
            postalCode: '50995'
          }
        },
        organizers: [
          {
            name: 'Jonathan Sullivan',
            officerType: 'Organizer',
            typeName: null,
            addressInfo: 'East Sallybury, FL 71671'
          },
          {
            name: 'Patrick, Barrera and Collins',
            officerType: 'Organizer',
            typeName: null,
            addressInfo: 'Apt. 302 West Alyssa, PA 58475'
          }
        ],
        additionalArticles: [
          {
            articleNumber: '6',
            articleDetail: 'Quiquia dolore modi eius eius dolor. Aliquam numquam ipsum est est quisquam quaerat. Etincidunt dolore dolor etincidunt labore. Dolorem tempora tempora velit adipisci est magnam est. Ipsum ut amet quiquia aliquam magnam numquam. Sit dolor numquam eius. Adipisci numquam eius dolore. Est quisquam tempora porro dolore quaerat magnam. Aliquam dolorem velit tempora.'
          },
          {
            articleNumber: '6',
            articleDetail: 'Voluptatem est numquam amet non ipsum. Est velit amet porro modi etincidunt quisquam neque. Modi consectetur consectetur neque ipsum voluptatem. Magnam numquam velit aliquam. Labore consectetur voluptatem quaerat etincidunt tempora tempora. Dolor porro neque labore quiquia etincidunt. Eius sed voluptatem dolore sit. Consectetur neque magnam porro porro.'
          }
        ]
      }
    }
  },
  methods: {

  }
}
</script>
<template lang="pug">
div
  .text-h4.q-pb-md
    | Confirmation
  p Please confirm the business entity information is entered correctly.
  p Warning : Please review your filing and click 'Continue' to file your registration electronically.
  .row.justify-center
    .col.left
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
      div.q-py-xl
      div.q-pt-sm
      template
        strong Mailing Address
        div(v-for="(address,index) in form.addresses.mailingAddress.address" )
          | {{address}}
        div
          |kz {{form.addresses.mailingAddress.city}}, {{form.addresses.mailingAddress.state}} {{form.addresses.mailingAddress.postalCode}}
        div
          | {{form.addresses.mailingAddress.country}}
    .col.right
      div
        strong Filing Date
      div {{form.detail.periodOfDuration}}
      div
        strong Delayed Effective Date
      div {{form.detail.delayedEffectiveDate}}
      div
        strong Term of Duration
      div {{form.detail.expirationDate}}
      div.q-py-lg
      div
        strong Formed in
      div {{formedIn}}
      div.q-pt-xl
      template
        strong Principal Office
        div(v-for="(address,index) in form.addresses.principalAddress.address" )
          | {{address}}
        div
          | {{form.addresses.mailingAddress.city}}, {{form.addresses.mailingAddress.state}} {{form.addresses.mailingAddress.postalCode}}
        div
          | {{form.addresses.mailingAddress.country}}
  template
  .q-pa-md
    .text-h6 Organizers
    hr
    div(v-if='form.organizers.length === 0')
      p  No Organizers Currently Assigned...
    div(v-else)
      q-list(bordered class="rounded-borders")
        div.q-pa-md.q-gutter-md(v-for='(organizer, index) in form.organizers')
          template
            q-item(clickable)
              q-item-section(top)
                q-item-label(lines='5')
                  span.text-h6
                    | Name: &nbsp;
                    b {{organizer.name}}
                q-item-label(caption='', lines='1')
                  span.text-subtitle1
                    | type: &nbsp;
                    b {{organizer.officerType}}
                q-item-label.q-mt-xs.text-body2.text-weight-bold.text-primary.text-uppercase(lines='1')
                  span Address:  &nbsp;
                    b {{organizer.addressInfo}}
  template
  .q-pa-md
    .text-h6 Articles Detail
    hr
    div(v-if='form.additionalArticles.length === 0')
      p    No Additional Articles Identified...
    div(v-else)
      q-list(bordered class="rounded-borders")
        div.q-pa-md.q-gutter-md(v-for='(article, index) in form.additionalArticles')
          template
            q-item(clickable)
              q-item-section(top)
                q-item-label(lines='5')
                  span.text-subtitle1
                    strong
                      | Article: &nbsp; #
                    b {{index}}
              q-item-section(top class="col-10")
                q-item-label(caption='', lines='30')
                  span.text-subtitle1
                    strong
                      | Detail: &nbsp;
                    b {{article.articleDetail}}
  template
  .q-pa-md
    .text-h6 Registered Agent
    hr
    .row.justify-left
      .col
        strong Agent Name
        div {{form.agent.firstName}} {{form.agent.middleName}} {{form.agent.lastName}}
        div.q-pt-sm
          strong Email
        div {{form.agent.email}}
        div.q-pt-sm
          strong Phone
        div {{form.agent.phone}}
        div.q-pt-sm
          template
            strong Principal Office
            div(v-for='(address,index) in form.agent.address' )
              | {{address}}
        p {{form.agent.city}}, {{form.agent.state}}{{form.agent.postalCode}}
  template
  .q-pa-MD
    .text-h6 Filing Fee
    hr
    .row.justify-left
      | ${{form.price}}
</template>

<style lang="">

</style>
