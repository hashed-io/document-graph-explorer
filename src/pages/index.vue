<script>
export default {
  name: 'pageIndex'
}
</script>

<template lang="pug">
  .flex.column
    .main-splash
      img.imgSplash(src="../app-splashscreen.png" data-cy="imgSplash")
    div.padding(data-cy="instructions")
      .row.text-body2(align='justify').q-pb-md
        span We’ve created this tool is to allow you to upload a copy of the official DAO LLC form to a public smart contract and help you comply with the DAO LLC requirement of generating a smart contract identifier required in Step 6 -
          a(href='https://wyobiz.wyo.gov/Business/RegistrationLLC.aspx' target='_blank')
            | &nbsp;Additional Articles of the online application.
          | &nbsp;As per the following regulation:
      .row.text-body2
        span
          | “
          a(href='https://sos.wyo.gov/Business/Docs/DAOs_FAQs.pdf' target='_blank') W.S. 17-31-106(b)
          | , a publicly available identifier of any smart contract directly used to manage, facilitate or operate the DAO;”
      .q-py-md
        .row.text-body2
            strong
              | Step 1:
            .q-pl-md
              a(data-cy='linkAnchor' v-if='$q.platform.is.android' href='https://play.google.com/store/apps/details?id=com.greymass.anchor&hl=en&gl=US' target='_blank') Download Anchor on Android
              a(data-cy='linkAnchor' v-if='$q.platform.is.ios' href='https://apps.apple.com/us/app/anchor-wallet/id1487410877' target='_blank') Download Anchor on iOS
              a(data-cy='linkAnchor' v-if='$q.platform.is.linux' href='https://github.com/greymass/anchor/releases/download/v1.2.9/linux-anchor-wallet-1.2.9-amd64.deb' target='_blank') Download Anchor on Linux
              a(data-cy='linkAnchor' v-if='$q.platform.is.mac' href='https://github.com/greymass/anchor/releases/download/v1.2.9/mac-anchor-wallet-1.2.9-x64.dmg' target='_blank') Download Anchor on Mac
              a(data-cy='linkAnchor' v-if='$q.platform.is.win' href='https://github.com/greymass/anchor/releases/download/v1.2.9/win-anchor-wallet-1.2.9.exe' target='_blank') Download Anchor on Windows
              | &nbsp;and Create your Keys and Account
        .row.text-body2
            strong
              | Step 2:
            .q-pl-md
              | Complete the Registration Wizard, which mirrors the data collection form located&nbsp;
              a(href='https://wyobiz.wyo.gov/Business/RegistrationInstr.aspx' target='_blank') here.
        .row.text-body2
            strong
              | Step 3:
            div.q-pl-md
              | Add your Articles of Organization and other docs directly to your newly deployed (and fully upgradable) Smart Contract.
        .row.text-body2
            strong
              | Step 4:
            div.q-pl-md
              | Activate other useful DAO tools, such as tokenization, governance, treasury, and even on-chain legally compliant agreements
              | with other DAOs
      .col-9.flex.flex-center.col-grow.q-px-lg.q-pt-xl
        div
          q-btn.full-width.q-mb-lg(
            to='/login'
            id='redirectButton'
            color="primary"
            :label="$t('pages.index.buttons.login')"
            icon="app:login"
            rounded
            unelevated
            size="lg"
          )
      div.text-caption
        | Further reading:
      ul
        .row.text-caption
          span 1.- &nbsp;
          a(href='https://www.youtube.com/watch?v=ZE2HxTmxfrI' target='_blank') What is a smart contract?
        .row.text-caption
          span 2.- &nbsp;
          a(href='https://wyobiz.wyo.gov/Business/RegistrationLLC.aspx' target='_blank') What needs to be in the smart contract?
      span.text-caption
        | For questions or comments, drop us a message on our&nbsp;
        a(href='https://mobile.twitter.com/TelosKitchen' target='_blank') Twitter account.
</template>

<style lang="sass" scoped>
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
