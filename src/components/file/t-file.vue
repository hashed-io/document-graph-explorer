<template lang="pug">
div
  q-file(:label="label", outlined, bottom-slots, dense)
    template(v-slot:before)
      div(style="width: 20px; height: 20px")
        svg.h-5.w-5(
          xmlns="http://www.w3.org/2000/svg",
          viewbox="0 0 20 20",
          fill="currentColor"
        )
          path(
            d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
          )
</template>
<script>
export default {
  name: 'TFile',
  props: ['title', 'label']
}
</script>
<style lang="stylus"></style>
