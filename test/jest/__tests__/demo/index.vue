<script>
export default {
  name: 'pageIndex'
}
</script>

<template lang="pug">
  .flex.column
    .main-splash
      img.imgSplash(src="../app-splashscreen.png")
    div.padding
      .row.text-body2(align='justify').q-pb-md
        span We’ve created this tool is to allow you to upload a copy of the official DAO LLC form to a public smart contract and help you comply with the DAO LLC requirement of generating a smart contract identifier required in Step 6 -

</template>

<style lang="stylus" scoped>
.main-title
  color: white
  background: $primary
  max-height: 25%
  text-align: center
.main-splash
  max-height: 25%
  text-align: center
.p-title
  margin-top: 10px
  font-size: 18px
.q-btn-item
  /deep/div
    font-size: 14px
  /deep/i
    font-size: 18px
.imgSplash
  min-width: 150px
  max-height: 250px
  margin-top: -10px
.padding
  padding-left: 10rem
  padding-right: 10rem
@media only screen and (max-width: 1024px) and (min-width: 769px)
  .padding
    padding-left: 6rem
    padding-right: 6rem
@media only screen and (max-width: 768px) and (min-width: 481px)
  .padding
    padding-left: 4rem
    padding-right: 4rem
@media only screen and (max-width: 480px) and (min-width: 320px)
  .padding
    padding-left: 2rem
    padding-right: 2rem
  .imgSplash
    min-width: 100px
    max-height: 200px
    margin-top: -10px
@media only screen and (max-width: 319px) and (min-width: 10px)
  .padding
    padding-left: 1rem
    padding-right: 1rem
  .imgSplash
    min-width: 100px
    max-height: 150px
    margin-top: -15px
</style>
