<template lang="pug">
q-card(flat)
  q-card-section.bg-primary.text-white.text-subtitle1
    | Business Name
  div.q-px-xs.q-pt-md
    strong
      u Warning:
    label &nbsp; If you have not conducted a search for your business entity name
    a(href='https://sos.wyo.gov/Forms/WyoBiz/LLC%20-%20Name%20Statutes%2017-29-108%20-%2017-16-401.pdf' target="_blank").blackRedColor
        |(Business Entity Name Statutory Requirements)
    label to ensure that there are no entities on record which contain the singular or plural form of the name you wish to register, please visit the
    a(href='https://wyobiz.wyo.gov/Business/FilingSearch.aspx' target='_blank').blackRedColor
        | Search Tool
    label before proceeding.
    div.q-pa-sm
    label Please be advised that subtype designations (DAO, LAO, L3C) are not considered distinguishable. Please visit
    a(href='http://sos.wyo.gov/Business/Docs/HowToChooseACompanyName.pdf' target="_blank").blackRedColor
      |How To Choose a Company Name
    label for information.
    div.q-pa-sm
    label
      b
        u(style="color:red;") IMPORTANT:
    label  &nbsp;If you are forming a Decentralized Autonomous Organization (DAO) or a Series LLC,&nbsp;
    strong
      u.
        you must make the appropriate designation in the "Additional Designation" field below.
    q-form(
      @submit="onSubmit"
      class=q-gutter-md
      ref="myForm"
    )
      div.q-pa-sm
      q-input(
          outlined
          stack-label
          v-model="formData.businessName"
          label="Business Entity Name: *"
          :rules="[rules.required, v => containsDesignations || 'Does not contain any required terms']"
        )
        template(v-slot:prepend)
          q-icon(name='business')
      div.q-pa-sm
      q-input(
          stack-label
          outlined
          v-model="confirmName"
          label="Confirm Name: *"
          :rules="[rules.required, v => v === this.formData.businessName || 'The Business Entity Name and Confirm Name must match exactly.']"
        )
        template(v-slot:prepend)
          q-icon(name='check')
      div.q-pa-sm
      strong(v-if="errorBusinessName" style="color:red").
        The Entity Name must contain one of the following designations: DAO L.C., DAO L.L.C., DAO LC, DAO LIMITED COMPANY, DAO LIMITED LIABILITY CO., DAO LIMITED LIABILITY COMPANY, DAO LIMITED LIABILITY COMPANY, DAO LLC, DAO LTD. LIABILITY CO., DAO LTD. LIABILITY COMPANY, DECENTRALIZED AUTONOMOUS ORGANIZATION L.C., DECENTRALIZED AUTONOMOUS ORGANIZATION L.L.C., DECENTRALIZED AUTONOMOUS ORGANIZATION LC, DECENTRALIZED AUTONOMOUS ORGANIZATION LLC, LAO L.C., LAO L.L.C., LAO LC, LAO LIMITED COMPANY, LAO LIMITED LIABILITY CO., LAO LIMITED LIABILITY COMPANY, LAO LLC, LAO LTD. LIABILITY CO., LAO LTD. LIABILITY COMPANY
    br
</template>
<style lang="sass" scoped>
.blackRedColor
  color: #AC2734
  font-weight: bold
  text-decoration: none
  padding: 0.5%

</style>
<script>
// import { validation } from './mixins/validation'
import { validation } from '../../../../mixins/validation'
export default {
  name: 'businessname',
  mixins: [validation],
  props: {
    bussinessObject: Object
  },
  beforeMount () {
    this.matchData()
  },
  data () {
    return {
      formData: {
        businessName: null,
        additionalDesination: 'DAO'
      },
      confirmName: null,
      errorBusinessName: false
    }
  },
  computed: {
    containsDesignations () {
      const str = this.formData.businessName
      const substrings = ['DAO L.C.', 'DAO L.L.C.', 'DAO LC', 'DAO LIMITED COMPANY', 'DAO LIMITED LIABILITY CO.', 'DAO LIMITED LIABILITY COMPANY', 'DAO LIMITED LIABILITY COMPANY', 'DAO LLC', 'DAO LTD. LIABILITY CO.', 'DAO LTD. LIABILITY COMPANY', 'DECENTRALIZED AUTONOMOUS ORGANIZATION L.C.', 'DECENTRALIZED AUTONOMOUS ORGANIZATION L.L.C.', 'DECENTRALIZED AUTONOMOUS ORGANIZATION LC', 'DECENTRALIZED AUTONOMOUS ORGANIZATION LLC', 'LAO L.C.', 'LAO L.L.C.', 'LAO LC', 'LAO LIMITED COMPANY', 'LAO LIMITED LIABILITY CO.', 'LAO LIMITED LIABILITY COMPANY', 'LAO LLC', 'LAO LTD. LIABILITY CO.', 'LAO LTD. LIABILITY COMPANY']
      var flag = false
      this.changeStateError(true)
      for (const element of substrings) {
        let boolCheck = str.includes(element)
        if (boolCheck) {
          flag = true
          this.changeStateError(false)
          break
        }
      }
      return flag
    }
  },
  methods: {
    matchData () {
      this.formData = Object.assign({}, this.bussinessObject)
      this.confirmName = this.bussinessObject.businessName
    },
    changeStateError (state) {
      this.errorBusinessName = state
    },
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit('dataFromBusinessName', this.confirmName)
        }
      })
    }
  }
}
</script>
