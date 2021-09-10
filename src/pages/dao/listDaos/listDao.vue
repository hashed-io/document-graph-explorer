<template lang="pug">
#container.q-pa-md
  skeleton-table(v-if="!daos")
  q-table.q-mb-sm(
    v-else
    title: 'Daos'
    :data="daosFreeze"
    :columns="columns"
    row-key="account"
    flat
    dense
    :pagination="initialPagination"
    virtual-scroll
    :rows-per-page-options="[0]"
    class="sticky-virtscroll-table"
    :virtual-scroll-item-size="pageSize - 2"
    :virtual-scroll-sticky-size-start="pageSize - 2"
    ref="table"
    @virtual-scroll="onScroll"
    table-header-class="hdTable"
    :hide-pagination="true"
    :filter="params.search"
  )
    template(v-slot:top-right v-if="!selectable")
      q-input.q-mb-sm(
        ref="inputSearch"
        :label="$t('pages.general.search')"
        v-model.trim="params.search"
        debounce="1000"
        maxlength="12"
      )
        template(v-slot:append)
          q-icon(name="search")
    template(v-slot:top-left v-if="selectable")
      q-input.q-mb-sm(
        ref="inputSearch"
        :label="$t('pages.general.search')"
        v-model="params.search"
        debounce="1000"
        maxlength="12"
      )
        template(v-slot:append)
          q-icon(name="search")
    template(v-slot:body="props")
      q-tr.cursor-pointer(:props="props")
        q-td(
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        ) {{col.value}}
          template(v-if="col.name == 'actions'")
            q-icon.animated-icon(
              name="edit"
              v-ripple
              size="sm"
              color="positive"
              @click="onClickEdit(props.row)"
              v-if="!selectable"
            )
              q-tooltip {{ $t('common.buttons.edit') }}
          template(v-if="col.name == 'editDao'")
            q-icon.animated-icon(
              name="edit"
              v-ripple
              size="sm"
              color="positive"
              @click="onClickEditDao(props.row)"
              v-if="!selectable"
            )
              q-tooltip {{ $t('common.buttons.editDao') }}
          template(v-if="col.name == 'viewData'")
            q-icon.animated-icon(
              name="search"
              v-ripple
              size="sm"
              color="positive"
              @click="onClickSee(props.row)"
              v-if="!selectable"
            )
              q-tooltip {{ $t('common.buttons.viewData') }}
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { validation } from '~/mixins/validation'
import axios from 'axios'
export default {
  name: 'listdao',
  mixins: [validation],
  props: {
    selectable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    daosFreeze () {
      return Object.freeze(this.daos.rows.slice(0, this.pageSize * (this.nextPage - 1)))
    }
  },
  mounted () {
    this.setIsEdit(false)
    this.setDataForm(null)
    this.setDaoName(null)
  },
  watch: {
    // 'params.search' (value) {
    //   // if (value && value.length <= 12) {
    //   //   }
    //   console.log('search changing')
    //   if (value) {
    //     this.params.search = value.toLowerCase()
    //   }
    //   this.resetPagination()
    // }
  },
  data () {
    return {
      loading: false,
      pageSize: 5,
      nextPage: 2,
      initialPagination: {
        // page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      daos: {
        more: true,
        rows: []
      },
      columns: [
        {
          name: 'dao',
          label: this.$t('pages.general.dao'),
          align: 'center',
          field: row => row.dao,
          sortable: true
        },
        {
          name: 'ipfs',
          label: this.$t('pages.general.ipfs'),
          align: 'center',
          field: row => row.ipfs,
          sortable: true
        },
        {
          name: 'actions',
          label: this.$t('pages.general.actions'),
          align: 'center',
          field: row => row.actions,
          sortable: false
        },
        {
          name: 'editDao',
          label: this.$t('pages.general.editDao'),
          align: 'center',
          field: row => row.editDao,
          sortable: false
        },
        {
          name: 'viewData',
          label: this.$t('pages.general.viewData'),
          align: 'center',
          field: row => row.viewData,
          sortable: false
        }
      ],
      params: {
        offset: 0,
        limit: 5,
        search: undefined,
        customOffset: undefined,
        nextKey: undefined
      }
    }
  },
  methods: {
    ...mapActions('dao', ['getDaos', 'deployContract']),
    ...mapMutations('dao', ['setIsEdit', 'setDataForm', 'setDaoName']),
    onClickEdit (row) {
      // Send toggle modal
      this.$emit('onManageContract', row)
    },
    resetPagination () {
      // this.$refs.table.resetVirtualScroll()
      console.log('resetPagination')
      this.daos.rows = []
      this.daos.more = true
      this.params.offset = 0
      this.nextPage = 2
      this.params.customOffset = this.params.search
      // this.$refs.table.resetVirtualScroll()
      this.onScroll({ to: -1, ref: this.$refs.table, index: 0, direction: 'increase' })
    },
    async onScroll ({ to, ref, index, direction }) {
      try {
        console.log('scroll start')
        if (!this.loading && this.daos.more && index > (to - 15) && direction === 'increase') {
          console.log('scroll')
          this.loading = true
          let newRows = await this.getDaos({
            ...this.params,
            search: this.params.search ? this.params.search.toLowerCase() : undefined
          })
          // if (this.nextPage > 2) {
          //   newRows.rows.shift()
          // }
          this.daos.rows = this.daos.rows.concat(newRows.rows)
          this.daos.more = newRows.more
          this.nextPage = this.nextPage + 1
          this.loading = false
          this.params.offset = this.params.offset + this.pageSize
          this.params.nextKey = newRows.next_key
          if (this.daos.rows.length > 0) {
            this.params.customOffset = this.daos.rows[this.daos.rows.length - 1].account || undefined
          }
          await this.$nextTick()
        }
      } catch (e) {
        // this.params.search = undefined
        this.loading = false
        await this.$nextTick()
        // this.resetPagination()
        console.error('An error occurred while trying to getAccounts onScroll', e)
      }
    },
    async onClickEditDao (row) {
      // this.loading = true
      var self = this
      let daoName = row.dao
      var url = 'https://ipfs.io/ipfs/' + row.ipfs
      this.showIsLoading(true)
      await axios({
        method: 'get',
        url: url
      }).then(function (response) {
        self.loading = false
        self.changeStateDAO(response.data.data, daoName)
        self.showIsLoading(false)
      })
    },
    changeStateDAO (_form, daoName) {
      this.setIsEdit(true)
      this.setDataForm(_form)
      this.setDaoName(daoName)
      this.$router.push('/registerDAO')
    },
    async onClickSee (row) {
      let url = 'https://ipfs.io/ipfs/' + row.ipfs
      window.open(url, '_blank')
    }
  }
}
</script>
