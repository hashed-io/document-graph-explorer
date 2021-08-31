<template lang="pug">
#container
  //- p {{dao.dao}}
  //- p {{dao.ipfs}}
  //- p {{dao.creator}}
  q-toolbar-title
    span.text-weight-bold Manage Contracts
  q-card-section
  q-item.q-pb-md
    q-item-section(top)
      q-item-label
        strong.text-subtitle1 Field Name
    q-item-section(top)
      q-item-label
        strong.text-subtitle1 Type
    q-item-section(top)
      q-item-label
        strong.text-subtitle1 Value
  #contracts(v-for='(contract, index) in this.manageContract')
    q-item.q-pb-md
      q-item-section(top)
        q-input(v-model='contract.label' outlined label='Field Name')
      q-item-section(top)
        q-select(v-model='contract.value[0]' :options='options' emit-value map-options outlined label='Type')
      q-item-section(top)
        div(v-if="contract.value[0] === 'time_point'")
          q-input(filled v-model='contract.value[1]' lazy-model)
            template(v-slot:append='')
              q-icon.cursor-pointer(name='event')
                q-popup-proxy(ref='qDateProxy', transition-show='scale', transition-hide='scale')
                  q-date(v-model='date', today-btn, mask='YYYY/MM/DD' @input='changesDate(index)')
                    .row.items-center.justify-end
                      q-btn(v-close-popup, label='Close', color='primary', flat='flat')

        div(v-else-if="contract.value[0] === 'file'")
          q-file(v-model='contract.value[1]' filled bottom-slots label='Upload file')
            template(v-slot:before)
              q-icon(name='folder_open')
        q-input(v-else v-model='contract.value[1]' outlined label='Value')

  .row.justify-end.q-gutter-md
    q-btn(label='Add Field' @click='addRow()' color="primary")
    q-btn(label='Save' @click='saveData()' color="primary")
</template>

<script>
export default {
  name: 'managecontract',
  props: {
    dao: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // load information
  },
  data () {
    return {
      date: null,
      manageContract: [
        {
          label: null,
          value: [
            null,
            null
          ]
        }
      ],
      options: [
        {
          label: 'String',
          value: 'string'
        },
        {
          label: 'Asset',
          value: 'asset'
        },
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Int64',
          value: 'int64'
        },
        {
          label: 'Time point',
          value: 'time_point'
        },
        {
          label: 'Checksum256',
          value: 'checsum256'
        },
        {
          label: 'File',
          value: 'file'
        }
      ]
    }
  },
  methods: {
    addRow () {
      this.manageContract.push(
        {
          label: null,
          value: [
            null,
            null
          ]
        }
      )
    },
    saveData () {
      this.$q.notify({
        message: 'Dato guardados [por implementar]'
      }
      )
    },
    changesDate (index) {
      const arr = this.date.split('/')
      let dateFormatted = arr[1] + '/' + arr[2] + '/' + arr[0]
      this.manageContract[index].value[1] = dateFormatted
      this.$forceUpdate()
    }
  }
}
</script>
