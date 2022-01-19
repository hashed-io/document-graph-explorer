<template lang='pug'>
div
  .row.justify-start
      div.text-h6.q-py-md.q-pr-md Content Groups
      q-icon(
        class="keyIcon q-py-md"
      )
        template(v-if="keyToEncrypt")
          svg(xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor")
            path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z")
  CryptoDialog(:openDialog="openCryptoDialog" @close-dialog="onCloseDialog")
  ContentGroup(
    v-for="(content_group, index) in contents_groups",
    :content_group_data="content_group",
    ref="content_group"
    :index_content_group="index"
    :key="content_group+`${index}`"
    @openDialog="onOpenDialog"
    @deleteTitle="onDeleteTitle"
    @elementChanged='onChange'
    :cryptoKey="keyToEncrypt"
  )
  q-btn(
    data-cy="newContentButton"
    v-if="isEdit"
    unelevated
    label='New content group'
    no-caps
    class='btnTailwind'
    @click="onAddContentGroup"
  )
</template>

<script>
import ContentGroup from './Element/content-group.vue'
import { mapGetters } from 'vuex'
import CryptoDialog from './Element/crypto-dialog.vue'
export default {
  name: 'ListContentsGroup',
  props: {
    /**
     * Contain all the tables to be render
     * Each key in the object is an table.
     * The following is the structure of this prop
     * {
     *  system: Array,
     *  lorem: Array
     * }
     */
    contents_groups: {
      type: Object,
      required: true
    }
  },
  components: {
    ContentGroup,
    CryptoDialog
  },
  mounted () {
    if (this.getIsEdit) {
      this.isEdit = true
    } else {
      this.isEdit = false
    }
  },
  computed: {
    ...mapGetters('documentGraph', ['getIsEdit'])
  },
  data () {
    return {
      isEdit: false,
      openCryptoDialog: false,
      keyToEncrypt: undefined,
      textEncrypted: undefined,
      fileNotEncrypted: undefined
    }
  },
  methods: {
    onChange (obj) {
      let key = obj.key
      this.contents_groups[key] = obj.data
      this.$forceUpdate()
    },
    titleIsRepeated (obj) {
      let { prev, current } = obj
      let keys = Object.keys(this.contents_groups)
      let count = keys.filter((element) => element === current).length
      if (count === 0 && prev !== 'content_group') {
        this.contents_groups[current] = this.contents_groups[prev]
        delete this.contents_groups[prev]
      } else if (count === 0 && prev === 'content_group') {
        this.contents_groups[current] = this.contents_groups['Content_group']
        delete this.contents_groups['Content_group']
      } else {
        this.showErrorMsg('Label duplicated')
        return false
      }
      this.$forceUpdate()
      return true
      // delete this.contents_groups[prev]
    },
    onDeleteTitle (title) {
      delete this.contents_groups[title]
      this.$forceUpdate()
    },
    onOpenDialog (bool) {
      this.openCryptoDialog = bool
    },
    onAddContentGroup () {
      this.contents_groups['Content_group'] = [
        {
          title: 'content_group',
          key: 'Key',
          value: 'Value',
          dataType: 's'
        }
      ]
      this.$forceUpdate()
    },
    onCloseDialog (cryptoKey) {
      this.openCryptoDialog = false
      this.keyToEncrypt = cryptoKey
    }
  }
}
</script>
<style lang="stylus" scoped>
.btnTailwind
  width: 170px !important
.keyIcon
  font-size: 24px
  color: #4338CA !important
</style>
