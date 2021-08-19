<script>
export default {
  name: 'additionalArticlesComponent',
  data () {
    return {
      articles: [],
      article: {
        articleNumber: null,
        articleDetail: null
      },
      idEdit: null
    }
  },
  methods: {
    onSubmit () {

    },
    onReset () {

    }
  }
}
</script>
<template lang="pug">
.q-pa-md
  template
    q-card(flat bordered)
      q-separator
      p.q-pa-md
        | Please use the form below to add additional articles if necessary. Press 'Add' after entering the information for each article.
      .q-pa-md(style='color:red')
        | An LLC or any LLC subtype (DAO, Series, Close) does not file an operating agreement with the Secretary of State.
      .container
        q-form(@submit='onSubmit', @reset='onReset' ref="organizerForm")
            div(v-if='idEdit === null')
              q-btn(label="ADD" type="submit" color="primary")
            div(v-else)
              q-btn(label="UPDATE" @click='onSubmit' color="primary")
            .q-pa-sm
            //- q-btn(label="CLEAR" type="reset" color="primary")
</template>

<style lang="">

</style>
