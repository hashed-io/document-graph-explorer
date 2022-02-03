<template lang="pug">
.absolute-center.text-center
  div(class=" text-caption text-brand-primary text-bold error") 404 ERROR
  div(class="h1 notFound") Page not found
  div(class="message") Sorry, we couldn’t find the page you’re looking for.
  q-btn( class="btnTailwind q-mt-md", to='/', label='Go back')
</template>

<script>
export default {
  name: 'page-404'
}
</script>
<style lang='stylus' scoped>
.message
  font-size: 16px !important
  color: grey !important
.notFound
  font-size: 48px !important
  font-weight: 700 !important
.error
  font-size: 14px !important
</style>
