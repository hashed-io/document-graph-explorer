<template lang="pug">
#container
  p {{dao.dao}}
  p {{dao.ipfs}}
  p {{dao.creator}}
</template>

<script>
export default {
  name: 'managecontract',
  props: {
    dao: {
      type: Object,
      required: true
    }
  }
}
</script>
