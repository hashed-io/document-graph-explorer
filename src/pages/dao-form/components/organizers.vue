<template lang="pug">
.q-pa-md
  template
    q-card(flat bordered)
      .text-h4.q-pa-md
        | Organizers
      p.q-pa-md.text-subtitle1
        | Please use the form below to add the name and address of the organizers. Press 'Add' after entering information.
      .container
        q-form(@submit='onSubmitOrganizer', ref="organizerForm")
          div.q-px-md Choose one type of person
          q-field(ref='toggle' borderless v-model="checkbox" :rules="[v => !!v || 'Choose one option']").q-pl-md
            template(v-slot:control)
              q-option-group(v-model='checkbox' :options='options' color='primary' @input='deleteData' :rules="[rules.required]" inline)
          div(v-if="checkbox === 'physical'")
            .row.justify-center
              .col.q-px-md.col-xs-12.col-sm-12.col-md-4
                q-input(v-model='firstName',filled, label="First Name: *" ,label-stacked :rules="[rules.required]")
              .col.q-px-md.col-xs-12.col-sm-12.col-md-4
                q-input(v-model='middleName',filled, label="Middle Name: ",label-stacked).q-pb-md
              .col.q-px-md.col-xs-12.col-sm-12.col-md-4
                q-input(v-model='lastName',filled, label="Last Name: *",label-stacked, :rules="[rules.required]")
          .row.justify-center
            .col.q-px-md.col-xs-12.col-sm-12.col-md-12
              div(v-if="checkbox === 'legal'")
                q-input(v-model='organization', filled, label="Organization: *", label-stacked, :rules="[rules.required]")
            .col.q-px-md.col-xs-12.col-sm-12.col-md-12
              q-select(v-model='organizer.officerType', :options="selectOptions" filled, label="Officer type: *", label-stacked :rules="[rules.required]")
          .row.justify-center
            .col.q-px-md.col-xs-12.col-sm-12.col-md-12
              q-input(v-model='organizer.addressInfo', filled, label="Address, City, State, and Zip: *", label-stacked, :rules="[rules.required]")
          .row.justify-end.q-pa-md
            div(v-if='idEdit === null')
              q-btn(label="ADD" @click='onSubmit' color="primary")
            div(v-else)
              q-btn(label="UPDATE" @click='onSubmit' color="primary")
            .q-pa-sm
            //- q-btn(label="CLEAR" type="reset" color="primary")
  template
    .q-pa-md
      .text-h6 Organizers
      hr
      div(v-if='organizers.length === 0')
        p  No Organizers Currently Assigned...
      div(v-else)
        q-list(bordered class="rounded-borders")
          div.q-pa-md.q-gutter-md(v-for='(organizer, index) in organizers')
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
                q-item-section(top='', side='')
                  .text-grey-8.q-gutter-xs
                    q-btn.gt-xs(size='12px', flat='', dense='', round='', icon='delete' @click='deleteOrganizer(index)')
                    q-btn.gt-xs(size='12px', flat='', dense='', round='', icon='edit' @click='editOrganizer(index, organizer)')

</template>

<style lang="">

</style>

<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'organizersComponent',
  mixins: [validation],
  data () {
    return {
      idEdit: null,
      checkbox: null,
      firstName: null,
      middleName: null,
      lastName: null,
      organization: null,
      organizers: [],
      organizer: {
        name: null,
        officerType: 'Organizer',
        typeName: null,
        addressInfo: null
      },
      options: [
        {
          label: 'physical person',
          value: 'physical'
        },
        {
          label: 'Legal person',
          value: 'legal'
        }
      ],
      selectOptions: ['Organizer']
    }
  },
  methods: {
    deleteData () {
      if (this.checkbox === 'physical') {
        this.organization = null
      } else {
        this.firstName = null
        this.middleName = null
        this.lastName = null
      }
    },
    onSubmitOrganizer () {
      if (this.organizers.length === 0) {
        this.$q.notify({
          type: 'negative',
          message: `At least one organizer`
        })
      } else {
        this.$emit('dataFromOrganizers', this.organizers)
      }
    },
    onSubmit () {
      var self = this
      this.$refs.organizerForm.validate().then(success => {
        if (success) {
          self.addOrEditAgent()
        }
      })
    },
    addOrEditAgent () {
      let _typeName = null
      if (this.organization === null) {
        if (this.middleName === null) {
          this.organizer.name = this.firstName + ' ' + this.lastName
        } else {
          this.organizer.name = this.firstName + ' ' + this.middleName + ' ' + this.lastName
        }
        _typeName = 'fullName'
      } else {
        this.organizer.name = this.organization
        _typeName = 'organization'
      }
      let _interface = {
        'name': this.organizer.name,
        'officerType': this.organizer.officerType,
        'typeName': _typeName,
        'addressInfo': this.organizer.addressInfo
      }
      // Crear
      if (this.idEdit === null) {
        this.organizers.push(_interface)
        this.resetInfo()
      // Editar
      } else {
        // alert(this.idEdit)
        // console.log(_interface)
        this.organizers[this.idEdit] = _interface
        this.idEdit = null
        this.resetInfo()
      }
    },
    resetInfo () {
      // Reset organizer
      const object = this.organizer
      for (var key in object) {
        if (key === 'officerType') {
          object[key] = 'Organizer'
        } else {
          object[key] = null
        }
      }
      this.firstName = null
      this.middleName = null
      this.lastName = null
      this.organization = null
      this.$refs.organizerForm.reset()
    },
    onReset () {
      // this.$refs.organizerForm.reset()
    },
    deleteOrganizer (_id) {
      const organizerArray = this.organizers
      organizerArray.splice(_id, 1)
      this.organizers = organizerArray
      this.$refs.organizerForm.reset()
    },
    editOrganizer (_id, _objectOrganizer) {
      this.idEdit = _id
      for (var key in _objectOrganizer) {
        this.organizer[key] = _objectOrganizer[key]
      }
      // typeName
      if (_objectOrganizer.typeName === 'fullName') {
        this.checkbox = 'physical'
        const nameArr = _objectOrganizer.name.split(' ')
        this.firstName = nameArr[0]
        this.middleName = nameArr[1]
        this.lastName = nameArr[2]
      } else {
        this.checkbox = 'legal'
        this.organization = this.organizer.name
      }
      // this.$refs.organizerForm.reset()
    },
    updateOrganizer (_id) {
      this.onSubmit()
    }
  }
}
</script>
