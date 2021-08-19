<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'organizersComponent',
  mixins: [validation],
  data () {
    return {
      idEdit: null,
      disable: {
        fullName: false,
        colorFullname: 'grey-3',
        colorOrganization: 'grey-3',
        organization: false
      },
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
      selectOptions: ['Organizer']
    }
  },
  methods: {
    disableInput (_input) {
      // Se desactiva el input de organización
      if (_input === 'organization') {
        // Se llenan los campos de nombre
        if (this.firstName !== '' || this.middleName !== '' || this.lastName !== '') {
          this.disable.colorOrganization = 'grey-7'
          this.disable.organization = true
          this.organization = null
        // Se reactiva el campo de organización debido a que se vacian los campos
        } else {
          this.disable.colorOrganization = 'grey-3'
          this.disable.organization = false
        }
      // Se desactivan los datos de nombre
      } else {
        // Se llena el campo de organización
        if (this.organization !== '') {
          this.disable.colorFullname = 'grey-8'
          this.firstName = null
          this.middleName = null
          this.lastName = null
          this.disable.fullName = true
        // Se reactivan los campos
        } else {
          this.disable.colorFullname = 'grey-3'
          this.disable.fullName = false
        }
      }
    },
    onSubmit () {
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
      // Editar
      } else {
        // alert(this.idEdit)
        this.organizers[this.idEdit] = _interface
        this.idEdit = null
      }
      this.resetInfo()
    },
    resetInfo () {
      // Reset organizer
      const object = this.organizer
      for (var key in object) {
        if (key === 'officerType') {
          object[key] = 'Organizer'
        } else {
          object[key] = ''
        }
      }
      this.$refs.organizerForm.reset()
      this.firstName = null
      this.middleName = null
      this.lastName = null
      this.organization = null
      this.disable.colorFullname = 'grey-3'
      this.disable.colorOrganization = 'grey-3'
      this.disable.fullName = false
      this.disable.organization = false
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
      this.$refs.organizerForm.reset()
      this.idEdit = _id
      for (var key in _objectOrganizer) {
        this.organizer[key] = _objectOrganizer[key]
      }
      // typeName
      if (_objectOrganizer.typeName === 'fullName') {
        const nameArr = _objectOrganizer.name.split(' ')
        this.firstName = nameArr[0]
        this.middleName = nameArr[1]
        this.lastName = nameArr[2]
      } else {
        this.organization = this.organizer.name
      }
    },
    updateOrganizer (_id) {
      this.onSubmit()
    }
  }
}
</script>
<template lang="pug">
.q-pa-md
  template
    q-card(flat bordered)
      q-separator
      p.q-pa-md
        | Please use the form below to add the name and address of the organizers. Press 'Add' after entering information.
      .container
        q-form(@submit='onSubmit', @reset='onReset' ref="organizerForm")
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-12.col-md-4
              q-input(v-model='firstName', @input="disableInput('organization')", debounce="500", :bg-color="disable.colorFullname",filled, label="First Name: *", label-stacked :disable="disable.fullName" :rules="[rules.required]")
            .col.q-pa-md.col-xs-12.col-sm-12.col-md-4
              q-input(v-model='middleName',@input="disableInput('organization')", debounce="500" , :bg-color="disable.colorFullname",filled, label="Middle Name: ", ,label-stacked, :disable="disable.fullName" )
            .col.q-pa-md.col-xs-12.col-sm-12.col-md-4
              q-input(v-model='lastName',@input="disableInput('organization')", debounce="500", :bg-color="disable.colorFullname",filled, label="Last Name: *", label-stacked, :disable="disable.fullName" :rules="[rules.required]")
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-8.col-md-8
              q-input(v-model='organization',@input="disableInput('fullName')",debounce="500", :bg-color="disable.colorOrganization" ,filled, label="Organization: *", label-stacked, :disable="disable.organization" :rules="[rules.required]")
            .col.q-pa-md.col-xs-12.col-sm-4.col-md-4
              q-select(v-model='organizer.officerType', :options="selectOptions" filled, label="Officer type: *", label-stacked :rules="[rules.required]")
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-12.col-md-12
              q-input(v-model='organizer.addressInfo', filled, label="Address, City, State, and Zip: *", label-stacked, :rules="[rules.required]")
          .row.justify-end.q-pa-md
            div(v-if='idEdit === null')
              q-btn(label="ADD" type="submit" color="primary")
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
