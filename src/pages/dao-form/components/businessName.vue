<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'businessname',
  mixins: [validation],
  props: {
    validateprop: {
      type: Boolean
    }
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
      if (substrings.some(function (v) { return str.indexOf(v) >= 0 })) {
        this.changeStateError(false)
        return true
      } else {
        this.changeStateError(true)
        return false
      }
    }
  },
  methods: {
    changeStateError (state) {
      this.errorBusinessName = state
    },
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.$emit('dataFromBusinessName', this.confirmName, true)
          // this.$emit('validateChild', true)
          // alert('Send')
        } else {
          this.$emit('dataFromBusinessName', this.confirmName, false)
        }
      })
    }
  },
  watch: {
    'validateprop': function () {
      this.onSubmit()
    }
  }
}
</script>
<template lang="pug">
div.container
  strong
    u.
      Warning:
  label.
    If you have not conducted a search for your business entity name
  label.blackRedColor
    b (Business Entity Name Statutory Requirements)
  label to ensure that there are no entities on record which contain the singular or plural form of the name you wish to register, please visit the
  label.blackRedColor
    b Search Tool
  label before proceeding.
  div.q-pa-md
  label Please be advised that subtype designations (DAO, LAO, L3C) are not considered distinguishable. Please visit How To Choose a Company Name for information.
  div.q-pa-md
  label
    b
      u(style="color:red;") IMPORTANT:
  label.
    If you are forming a Decentralized Autonomous Organization (DAO) or a Series LLC,
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
    div.q-pa-sm
    q-input(
        stack-label
        outlined
        v-model="confirmName"
        label="Confirm Name: *"
        :rules="[rules.required, v => v === this.formData.businessName || 'The Business Entity Name and Confirm Name must match exactly.']"
      )
    div.q-pa-sm
    p(v-if="errorBusinessName" style="color:red").
      The Entity Name must contain one of the following designations: DAO L.C., DAO L.L.C., DAO LC, DAO LIMITED COMPANY, DAO LIMITED LIABILITY CO., DAO LIMITED LIABILITY COMPANY, DAO LIMITED LIABILITY COMPANY, DAO LLC, DAO LTD. LIABILITY CO., DAO LTD. LIABILITY COMPANY, DECENTRALIZED AUTONOMOUS ORGANIZATION L.C., DECENTRALIZED AUTONOMOUS ORGANIZATION L.L.C., DECENTRALIZED AUTONOMOUS ORGANIZATION LC, DECENTRALIZED AUTONOMOUS ORGANIZATION LLC, LAO L.C., LAO L.L.C., LAO LC, LAO LIMITED COMPANY, LAO LIMITED LIABILITY CO., LAO LIMITED LIABILITY COMPANY, LAO LLC, LAO LTD. LIABILITY CO., LAO LTD. LIABILITY COMPANY
    //- q-btn(
    //-   label="Save"
    //-   type="submit"
    //-   color="primary"
    //- )
  br
</template>
<style lang="sass" scoped>
.blackRedColor
  color: #AC2734

</style>
