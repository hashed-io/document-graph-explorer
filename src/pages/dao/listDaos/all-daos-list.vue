<template lang="pug">
q-table(
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
    no-data-label="There aren't any DAOs"
    ref="table"
    :loading='loading'
    @virtual-scroll="onScroll"
    table-header-class="hdTable"
    :hide-pagination="true"
    :filter="params.search"
  )
    template(v-slot:top-right)
      q-input.q-mb-sm(
        ref="inputSearch"
        clearable
        :label="$t('pages.general.search')"
        v-model.trim="params.search"
        debounce="1000"
        maxlength="12"
      )
        template(v-slot:append)
          q-icon(name="search")
    template(v-slot:body="props")
      q-tr(:props="props")
        q-td(
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        ) {{col.value}}
          template(v-if="col.name == 'website'")
            q-icon.animated-icon(
              v-show="props.row.attributes.length > 0"
              name="language"
              v-ripple
              size="sm"
              color="positive"
              @click="openWebSite(props.row)"
            )
              q-tooltip {{ $t('pages.daos.goWebsite') }}
          template(v-if="col.name == 'details'")
            q-icon.animated-icon(
              name="info"
              v-ripple
              size="sm"
              :color="props.row.ipfs? 'positive' : 'teal-8'"
              @click="goToDetails(props.row)"
            )
              q-tooltip {{ $t('pages.daos.seeDetails') }}
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'all-daos-list',
  data () {
    return {
      loading: false,
      pageSize: 5,
      nextPage: 2,
      initialPagination: {
        rowsPerPage: 0
      },
      daos: {
        more: true,
        rows: []
      },
      columns: [
        {
          name: 'dao',
          label: this.$t('pages.daos.daoName'),
          field: row => {
            if (row.attributes.length > 0) { return row.attributes[0].second[1] } else { return [] }
          },
          align: 'center',
          sortable: true
        },
        {
          name: 'creator',
          label: this.$t('pages.daos.creator'),
          field: row => row.creator,
          align: 'center',
          sortable: true
        },
        {
          name: 'website',
          label: this.$t('pages.daos.goWebsite'),
          align: 'center',
          sortable: true
        },
        {
          name: 'details',
          label: this.$t('pages.daos.seeDetails'),
          align: 'center',
          sortable: true
        }
      ],
      params: {
        offset: 0,
        limit: 10,
        search: undefined,
        customOffset: undefined,
        nextKey: undefined
      }
    }
  },
  methods: {
    ...mapActions('dao', ['getAllDaos']),
    async onScroll ({ to, ref, index, direction }) {
      try {
        if (!this.loading && this.daos.more && index > (to - 15) && direction === 'increase') {
          console.log('scroll')
          this.loading = true
          let newRows = await this.getAllDaos({ ...this.params })
          this.daos.rows = this.daos.rows.concat(newRows.rows)
          console.log(this.daos.rows)
          this.daos.more = newRows.more
          this.nextPage = this.nextPage + 1
          this.loading = false
          this.params.offset = this.params.offset + this.pageSize
          this.params.nextKey = newRows.next_key
          await this.$nextTick()
        }
      } catch (e) {
        // this.params.search = undefined
        this.loading = false
        await this.$nextTick()
        console.error('An error occurred while trying to getAccounts onScroll', e)
      }
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
    openWebSite (dao) {
      if (dao.attributes.length > 0) {
        window.open(dao.attributes[1].second[1])
      }
    },
    goToDetails (dao) {
      let _website = dao.attributes[1].second[1]
      if (!dao.ipfs) {
        this.$router.push({ name: 'dhoPage', params: { daoName: dao.dao, website: _website } })
      } else {
        this.$router.push({ name: 'daoPage', params: { daoName: dao.dao, website: _website } })
      }
    }
  },
  computed: {
    daosFreeze () {
      return Object.freeze(this.daos.rows.slice(0, this.pageSize * (this.nextPage - 1)))
    }
  }
}
</script>

<style>

</style>
