<template lang='pug'>
div
  div(v-if="loading" class="center")
    q-spinner-tail(
      color="indigo"
      size="5.5em"
    )

  div(v-if="!loading")
    BackComponent
    div.text-h6.q-pb-md
      | {{$t('pages.documentExplorer.explorer.title')}}
    DocInformation(:docInfo="documentInfo")
    ListContentGroup(:contents_groups="contentsGroups")
    Edges(:edges="edges" :relations="relationsEdges" @edgeData="navigateToEdge" @edgeDataPrev="navigateToEdgePrev")
    .q-py-md.row.q-gutter-md
      q-btn(
        v-if="documentInfo.creator === account"
        @click="extendDocument()",
        class='text-white btnTailwind'
        unelevated
        no-caps
      )
        .row
          .col-4
            q-icon(
              color="white",
              style="width: 24px; height:24px;"
            )
              svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
                path(d="M14.2066 9.79347C16.0737 11.6625 16.0481 14.659 14.2179 16.4994C14.2145 16.5031 14.2104 16.5072 14.2066 16.511L12.1066 18.611C10.2545 20.4631 7.24105 20.4629 5.38914 18.611C3.53695 16.7591 3.53695 13.7453 5.38914 11.8935L6.5487 10.7339C6.8562 10.4264 7.38577 10.6308 7.40164 11.0653C7.42189 11.6192 7.36354 11.515 7.54679 12.0523C7.60885 12.2342 7.56451 12.4355 7.42857 12.5714L7.0196 12.9804C6.14379 13.8562 4.69098 15.3326 6.28571 17.1429C7.25765 18.2461 9.27857 18.797 10.8571 17.7143L12.9571 15.6146C14.4214 14.2179 13.4487 12.3059 12.5714 11.4286C12.4558 11.3131 12.3393 11.2234 12.2483 11.1608C12.1839 11.1166 12.1307 11.0579 12.093 10.9895C12.0554 10.9211 12.0342 10.8449 12.0312 10.7669C12.0188 10.4366 12.1358 10.0964 12.3967 9.83542L12.9221 9.31016C13.0946 9.13763 13.3653 9.11644 13.5653 9.25607C13.7944 9.41605 14.009 9.59588 14.2066 9.79347ZM18.6109 5.38904C16.759 3.53711 13.7456 3.53686 11.8934 5.38904L9.79336 7.48904C9.78961 7.49279 9.78555 7.49685 9.78211 7.5006C7.95192 9.34097 7.92627 12.3375 9.79336 14.2065C9.99095 14.4041 10.2055 14.5839 10.4346 14.7439C10.6347 14.8835 10.9054 14.8623 11.0779 14.6898L11.6516 14.1282C11.9126 13.8673 11.9728 13.819 11.9604 13.4888C11.9575 13.4107 11.9363 13.3345 11.8986 13.2661C11.8609 13.1977 11.8077 13.139 11.7434 13.0948C11.6524 13.0322 10.9728 12.2219 10.8571 12.1065C9.97986 11.2292 10.1969 9.58779 11.0779 8.70683L13.1779 6.60714C14.0604 5.72468 15.7937 5.1041 17.1429 6.28571C18.6109 7.57143 18.5901 9.4099 17.7143 10.2857L16.6896 11.4809C16.5537 11.6168 16.5094 11.8181 16.5714 12C16.6352 12.1065 16.585 12.5714 16.5983 12.9346C16.6142 13.3692 17.1438 13.5736 17.4513 13.2661L18.6108 12.1065C20.4631 10.2547 20.4631 7.24092 18.6109 5.38904Z" fill="white")        .col-9
          .col-8
            div(style='margin-top:2px;') Extend
      q-btn(
        v-if="documentInfo.creator === account"
        @click="eraseDocument()",
        class='text-white btnTailwind'
        unelevated
        no-caps
      )
        .row
          .col-4
            q-icon(
              color="white",
              style="width: 24px; height:24px;"
              data-cy="editContracts"
            )
              svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
                path(d="M13.375 17H14.125C14.3125 17 14.5 16.8438 14.5 16.625V9.875C14.5 9.6875 14.3125 9.5 14.125 9.5H13.375C13.1563 9.5 13 9.6875 13 9.875V16.625C13 16.8438 13.1563 17 13.375 17ZM18.5 6.5H15.9062L14.8437 4.75C14.5937 4.3125 14.0937 4 13.5625 4H10.4062C9.875 4 9.375 4.3125 9.125 4.75L8.0625 6.5H5.5C5.21875 6.5 5 6.75 5 7V7.5C5 7.78125 5.21875 8 5.5 8H6V18.5C6 19.3438 6.65625 20 7.5 20H16.5C17.3125 20 18 19.3438 18 18.5V8H18.5C18.75 8 19 7.78125 19 7.5V7C19 6.75 18.75 6.5 18.5 6.5ZM10.3437 5.59375C10.375 5.5625 10.4375 5.5 10.5 5.5C10.5 5.5 10.5 5.5 10.5312 5.5H13.4687C13.5312 5.5 13.5937 5.5625 13.625 5.59375L14.1562 6.5H9.8125L10.3437 5.59375ZM16.5 18.5H7.5V8H16.5V18.5ZM9.875 17H10.625C10.8125 17 11 16.8438 11 16.625V9.875C11 9.6875 10.8125 9.5 10.625 9.5H9.875C9.65625 9.5 9.5 9.6875 9.5 9.875V16.625C9.5 16.8438 9.65625 17 9.875 17Z" fill="white")        .col-8
          .col-8
            div(style='margin-top:2px;') Erase
      q-btn(
        v-if="documentInfo.creator === account"
        @click="editDocument()",
        class='text-white btnTailwind'
        unelevated
        no-caps
      )
        .row
          .col-4
            q-icon(
              color="white",
              left
              style="width: 24px; height:24px;"
            )
              svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
                path(d="M15.5789 14.7736C15.5163 14.8362 15.5163 14.8988 15.5163 14.9614V18.4978H4.50196V7.48166H12.043C12.1056 7.48166 12.1682 7.48166 12.2308 7.41907L13.2321 6.4176C13.3885 6.26112 13.2634 5.97946 13.0443 5.97946H4.50196C3.65711 5.97946 3 6.66797 3 7.48166V18.4978C3 19.3428 3.65711 20 4.50196 20H15.5163C16.3299 20 17.0183 19.3428 17.0183 18.4978V13.9599C17.0183 13.7408 16.7366 13.6156 16.5802 13.7721L15.5789 14.7736ZM20.4602 8.48313C21.1799 7.76333 21.1799 6.60538 20.4602 5.88557L19.1147 4.53985C18.395 3.82005 17.2373 3.82005 16.5176 4.53985L8.31943 12.7394L8.00652 15.5873C7.91265 16.401 8.60104 17.0895 9.4146 16.9956L12.2621 16.6826L20.4602 8.48313ZM17.3937 9.422L11.5737 15.243L9.50847 15.4934L9.7588 13.4279L15.5789 7.60685L17.3937 9.422ZM19.3964 6.94963C19.5528 7.07482 19.5528 7.26259 19.4276 7.41907L18.4576 8.38924L16.6428 6.54279L17.5815 5.60391C17.7066 5.44743 17.9257 5.44743 18.0508 5.60391L19.3964 6.94963Z" fill="white")        .col-8
          .col-8
            div(style='margin-top:2px;') Edit
      q-dialog(
        v-model='deleteDoc'
      ).eraseDialog
        EraseBox(
          :docTitle="documentInfo.docId"
          :systemNodeLabel="documentInfo.systemNodeLabel"
        )
</template>

<script>
import DocInformation from '../page-components/info/DocInformation.vue'
import ListContentGroup from '../page-components/List/list-content-group.vue'
import Edges from '../page-components/edges/edges.vue'
import EraseBox from '../page-components/erase/eraseBox.vue'
import { documentExplorer } from '~/mixins/documentExplorer'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import BackComponent from '~/components/backButton/backComponent.vue'
export default {
  name: 'DocumentExplorer',
  mixins: [documentExplorer],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    EraseBox,
    BackComponent
  },
  watch: {
    $route (to, from) {
      this.loadData()
    }
  },
  data () {
    return {
      deleteDoc: false
    }
  },
  async mounted () {
  },
  computed: {
    ...mapGetters('accounts', ['account']),
    ...mapState('documentGraph', ['isHashed', 'documentInterface'])
  },
  methods: {
    ...mapActions('documentGraph', ['getDocumentsByDocId']),
    ...mapMutations('documentGraph', ['pushDocNavigation', 'popDocNavigation', 'addInformation']),
    ...mapMutations('documentGraph', ['setContractInfo']),
    navigateToEdge (edgeData) {
      this.setDocument(edgeData)
      this.pushDocNavigation(this.documentInfo)
      this.addInformation({
        label: 'edgeName',
        value: edgeData.edgeName
      })
      if (this.isHashed) {
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: edgeData.hash, endpoint: this.endpoint } })
      } else {
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: edgeData.docId, endpoint: this.endpoint } })
      }
    },
    navigateToEdgePrev (edgeData) {
      this.popDocNavigation()
      this.setDocument(edgeData)
      if (this.isHashed) {
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: edgeData.hash, endpoint: this.endpoint } })
      } else {
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: edgeData.docId, endpoint: this.endpoint } })
      }
    },
    extendDocument () {
      this.setIsEdit(true)
      this.$router.push({ name: 'extendDoc', query: { document_id: this.$route.query.document_id } })
    },
    editDocument () {
      this.setIsEdit(true)
      this.$router.push({ name: 'editDoc', query: { document_id: this.$route.query.document_id } })
    },
    eraseDocument () {
      this.deleteDoc = true
      // CALL ACTION TO DELETE ALL DOCUMENT
    }
  }
}
</script>

<style lang='stylus' scoped>
.center
  position: absolute;
  top: 45%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
.btnTailwind
  width: 120px
  font-size: 14px !important
</style>
