<template lang="pug">
div
  p [Component List dao]
</template>

<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'listdao',
  mixins: [validation],
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
      daos: []
    }
  }
}
</script>
