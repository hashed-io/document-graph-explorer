<template lang="pug">
div
  .text-h4.q-pb-md
    | Signature
  p BY CHECKING THE BOXES BELOW AND ENTERING MY ELECTRONIC SIGNATURE, I HEREBY CERTIFY UNDER PENALTY OF PERJURY THAT:
  hr
  q-form(@submit='onSubmit', @reset='onReset' ref="signatureForm")
    .row.justify-left
      q-field(ref='toggle' borderless v-model="checkbox.personSignature" :rules="[rules.required]")
        template(v-slot:control)
          q-checkbox(v-model="checkbox.personSignature" :label='checkboxMessage.personSignature')
    .row.justify-left
      q-field(ref='toggle' borderless v-model="checkbox.fillingAgree" :rules="[rules.required]")
        template(v-slot:control)
          q-checkbox(v-model="checkbox.fillingAgree" :label='checkboxMessage.fillingAgree' :rules="[rules.required]")
    .row.justify-left
      q-field(ref='toggle' borderless v-model="checkbox.understandAgree" :rules="[rules.required]")
        template(v-slot:control)
          q-checkbox(v-model="checkbox.understandAgree" :label='checkboxMessage.understandAgree' :rules="[rules.required]")
    .row.justify-left
      q-field(ref='toggle' borderless v-model="checkbox.intendAgree" :rules="[rules.required]")
        template(v-slot:control)
          q-checkbox(v-model="checkbox.intendAgree" :label='checkboxMessage.intendAgree' :rules="[rules.required]")
    .row.justify-left
      q-field(ref='toggle' borderless v-model="checkbox.appropriateSearchAgree" :rules="[rules.required]")
        template(v-slot:control)
          q-checkbox(v-model="checkbox.appropriateSearchAgree" :label='checkboxMessage.appropriateSearchAgree' :rules="[rules.required]")
    .row.justify-left
      q-field(ref='toggle' borderless v-model="checkbox.consentAgree" :rules="[rules.required]")
        template(v-slot:control)
          q-checkbox(v-model="checkbox.consentAgree" :label='checkboxMessage.consentAgree' :rules="[rules.required]")
    .row.justify-center.q-py-md.text-subtitle1
      p(style='color:red;')
        u
          strong Notice Regarding False Filings: Filing a false document could result in criminal penalty and prosecution pursuant to W.S. 6-5-308.
    div.q-px-xl.main-border
      strong W.S. 6-5-308. Penalty for filing false document.
      p  (a) A person commits a felony punishable by imprisonment for not more than two (2) years, a fine of not more than two thousand dollars ($2,000.00), or both, if he files with the secretary of state and willfully or knowingly:
      div.q-px-xl
        p (i) Falsifies, conceals or covers up by any trick, scheme or device a material fact;
        p (ii) Makes any materially false, fictitious or fraudulent statement or representation; or
        p (iii) Makes or uses any false writing or document knowing the same to contain any materially false, fictitious or fraudulent statement or entry.
    .row.justify-left.q-py-md
      q-field(ref='toggle' borderless v-model="checkbox.ack" :rules="[rules.required]")
        template(v-slot:control)
          q-checkbox(v-model="checkbox.ack" :label='checkboxMessage.ack' :rules="[rules.required]")
    .row.justify-left.q-py-md
      p Filer is: *
      q-field(ref='toggle' borderless v-model="checkbox.filerIs" :rules="[v => !!v || 'Choose one option']")
        template(v-slot:control)
          q-option-group(v-model='fillerInformation.filerIs' :options='options' color='primary' :rules="[rules.required]" inline)
      div.row.justify-center(v-if="fillerInformation.filerIs === 'organization'")
        strong(style='color:blue')
          | The Wyoming Secretary of State requires a natural person to sign on behalf of a business entity acting as an incorporator, organizer, or partner. The following individual is signing on behalf of all Organizers, Incorporators, or Partners.
    p
      strong
        u Filer Information:
    p
      strong
        | By submitting this form I agree and accept this electronic filing as legal submission of my Articles of Organization.
    template.filerInformation
    .row.justify-center
      .col.q-pa-md
        q-input(v-model='fillerInformation.firstName', filled, label="First Name *", label-stacked :rules="[rules.required]")
      .col.q-pa-md
        q-input(v-model='fillerInformation.middleName', filled, label="Middle Name", label-stacked)
      .col.q-pa-md
        q-input(v-model='fillerInformation.lastName', filled, label="Last Name *", label-stacked :rules="[rules.required]")
    .row
      .col.q-pa-md
        q-input(v-model='fillerInformation.title', filled, label="Title *", label-stacked :rules="[rules.required]")
    .row
      .col.q-pa-md
        q-input(v-model='fillerInformation.phone', filled, label="Contact Phone *", mask="phone" label-stacked :rules="[rules.required]")
      .col.q-pa-md
        q-input(v-model='confirmPhone', filled, label="Confirm Phone *", mask="phone" label-stacked :rules="[rules.required, v => v === this.fillerInformation.phone || 'The phone must match exactly.']")
    .row
      .col.q-pa-md
        q-input(v-model='fillerInformation.email', filled, label="Contact Email *", label-stacked :rules="[rules.required, rules.isEmail]")
      .col.q-pa-md
        q-input(v-model='confirmEmail', filled, label="Confirm Email *", label-stacked :rules="[rules.required,rules.isEmail, v => v === this.fillerInformation.email || 'The email must match exactly.']")
    p(style='color:red;')
      | Disclaimer:
    p(style='color:red;')
      strong
        | This form and any related instructions are not intended to provide legal, business or tax advice, and are furnished without representation or warranty. While this form is believed to satisfy minimum legal requirements as of its revision date, compliance with applicable law, as the same may be amended from time to time, remains the responsibility of the user of this form. Questions should be addressed to the user's legal, business or tax advisor(s).
</template>

<style lang="sass">
.main-border
  border-style : solid;
  border-width: 2px;
  border-color: black;
</style>

<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'signatureComponent',
  mixins: [validation],
  props: {
    signatureObject: Object
  },
  data () {
    return {
      confirmPhone: null,
      confirmEmail: null,
      checkbox: {
        personSignature: false,
        fillingAgree: false,
        understandAgree: false,
        intendAgree: false,
        appropriateSearchAgree: false,
        consentAgree: false,
        ack: false
      },
      checkboxMessage: {
        personSignature: '* I am the person whose signature appears on the filing; that I am authorized to file these documents on behalf of the business entity to which they pertain; and that the information I am submitting is true and correct to the best of my knowledge.',
        fillingAgree: '* I am filing in accordance with the provisions of the Wyoming Limited Liability Company Act, (W.S. 17-29-101 through 17-29-1105) and Registered Offices and Agents Act (W.S. 17-28-101 through 17-28-111).',
        understandAgree: '* I understand that the information submitted electronically by me will be used to generate Articles of Organization that will be filed with the Wyoming Secretary of State.',
        intendAgree: '* I intend and agree that the electronic submission of the information set forth herein constitutes my signature for this filing.',
        appropriateSearchAgree: '* I have conducted the appropriate name searches to ensure compliance with W.S. 17-16-401.',
        consentAgree: '* I consent on behalf of the business entity to accept electronic service of process at the email address provided with Article IV, Principal Office Address, under the circumstances specified in W.S. 17-28-104(e).',
        ack: '* I acknowledge having read W.S. 6-5-308.'
      },
      options: [
        {
          label: 'An individual',
          value: 'individual'
        },
        {
          label: 'An organization',
          value: 'organization'
        }
      ],
      fillerInformation: {
        filerIs: null,
        firstName: null,
        middleName: null,
        lastName: null,
        title: null,
        phone: null,
        email: null
      }
    }
  },
  created () {
    this.fillerInformation = this.signatureObject
    this.confirmPhone = this.signatureObject.phone
    this.confirmEmail = this.signatureObject.email
    this.fillerInformation.filerIs = this.signatureObject.filerIs
  },
  methods: {
    onSubmit () {
      this.$refs.toggle.validate()
      this.$refs.signatureForm.validate().then(success => {
        if (success) {
          this.$emit('dataFromSignature', this.fillerInformation)
        }
      })
    },
    onReset () {

    }
  }
}
</script>
