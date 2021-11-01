<template lang='pug'>
div
  DocInformation(:docInfo="documentInfo")
  ListContentGroup(:contents_groups="contentsGroups")
  Edges(:edges="edges")
</template>

<script>
import { cssClasses } from 'src/mixins/css-class.js'
import DocInformation from './info/DocInformation.vue'
import ListContentGroup from './List/list-content-group.vue'
import Edges from './edges/edges.vue'
export default {
  name: 'DocumentExplorer',
  mixins: [cssClasses],
  components: {
    DocInformation,
    ListContentGroup,
    Edges
  },
  data () {
    return {
      documentInfo: {
        name: undefined,
        docID: undefined,
        hash: undefined,
        owner: undefined,
        documentType: undefined,
        createdDate: undefined,
        updatedDate: undefined
      },
      contentsGroups: [],
      edges: []
    }
  },
  mounted () {
    this.getDocumentInfo()
    this.getContentGroup()
    this.getEdges()
  },
  methods: {
    getDocumentInfo () {
      this.documentInfo.name = 'Girl Scount Cookies Cannabis'
      this.documentInfo.docID = '689298'
      this.documentInfo.hash = '96530c1eae6d106457ddf8ebee7c7d08ce6200e333bf27eaf6bf2df9be616d5f'
      this.documentInfo.owner = 'telosacct'
      this.documentInfo.documentType = 'item'
      this.documentInfo.createdDate = '2021 Feb 14 15:03:21'
      this.documentInfo.updatedDate = '2021 Feb 14 15:03:21'
    },
    getContentGroup () {
      this.contentsGroups.push({
        data: [
          {
            key: 'content_group_label',
            value: 'system',
            dataType: 'eosio:name'
          },
          {
            key: 'node_label',
            value: 'Girl Scount Cookies Cannabis (54543233)',
            dataType: 'string'
          },
          {
            key: 'type',
            value: 'item',
            dataType: 'eosio:name'
          }
        ]
      },
      {
        data: [
          {
            key: 'content_group_label',
            value: 'details',
            dataType: 'eosio:name'
          },
          {
            key: 'carrier',
            value: 'Fedex',
            dataType: 'string'
          },
          {
            key: 'tracking_number',
            value: 'MjJasdUIeriusdadfcvnmfgdjkldfer',
            dataType: 'string'
          },
          {
            key: 'shipped_date',
            value: '14 Sep 2021 12:23:33 EST',
            dataType: 'timestamp'
          },
          {
            key: 'weight (kg)',
            value: '1.239',
            dataType: 'numeric'
          },
          {
            key: 'photo_1',
            value: 'Open',
            dataType: 'file'
          },
          {
            key: 'photo_2',
            value: 'Open',
            dataType: 'file'
          }
        ]
      })
    },
    getEdges () {
      this.edges.push(
        {
          direction: 'prev',
          name: 'Hashed Partner Forms',
          label: 'Facility',
          edge: 'produced'
        },
        {
          direction: 'next',
          name: 'Item created on 12 sep 2021',
          label: 'Checkpoint',
          edge: 'scanned'
        },
        {
          direction: 'next',
          name: 'Harvested in Upstate NY on 12 sep 2021',
          label: 'Checkpoint',
          edge: 'scanned'
        },
        {
          direction: 'next',
          name: 'Packed and shipped on 14 sep 2021',
          label: 'Checkpoint',
          edge: 'scanned'
        },
        {
          direction: 'next',
          name: 'Arrived at Dispensary on 18 sep 2021',
          label: 'Checkpoint',
          edge: 'scanned'
        }
      )
    }
  }
}
</script>

<style lang='sass'>
</style>
