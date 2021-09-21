<template lang="pug">
div
  template
    q-card(flat)
      .text-subtitle1.q-pa-md.bg-primary.text-white
        | Additional Articles
      q-separator
      div.q-px-xs.text-subtitle2.q-pt-md
        | Please use the form below to add additional articles if necessary. Press 'Add' after entering the information for each article.
      div.q-px-xs(style='color:red').text-subtitle2
        | An LLC or any LLC subtype (DAO, Series, Close) does not file an operating agreement with the Secretary of State.
        hr
      span.q-px-xs.text-subtitle1(style='color:red') Important:
      p.q-px-xs.text-subtitle2
        u Additional information is required at this step. Provide the following information required by adding additional articles before moving to the confirmation page:
      div.q-px-xs.text-subtitle2.q-pt-md
        strong Required
        ul
          li Pursuant to W.S. 17-31-106(a), a statement that the entity is a decentralized autonomous organization;
          li Pursuant to W.S. 17-31-106(b), a publicly available identifier of any smart contract directly used to manage, facilitate or operate the DAO;
          li Pursuant to W.S. 17-31-104(c), a Notice of Restrictions on Duties and Transfers if it will not appear in the operating agreement;
          li If the Notice of Restrictions on Duties and Transfers appears, or will appear, in the operating agreement, a statement of such.
        strong Optional
        ul
          li Pursuant to W.S. 17-31-104(e), whether the DAO is member managed or algorithmically managed; and
          li Any additional provisions related to W.S. 17-31-106(c).
      q-form(@submit='onSubmit'  ref="articleForm")
        div.q-px-xs(style='max-width:100%')
          .row.q-gutter-xs.justify-left
            .col-xs-12.col-sm-1
              q-input(v-model='article.number'  mask='##' input-class='text-center' outlined  label='Article #' :rules="[rules.required]" )
            .col-xs-12.col-sm-10
              q-input(v-model='article.detail'  outlined counter maxlength='1000' autogrow type="textarea" label='Article detail' :rules="[rules.required]")
          div(v-if='idEdit === null').q-pb-md
            q-btn(label="ADD" type="submit" color="primary")
          div(v-else)
            q-btn(label="UPDATE" type='submit' color="primary")
    ArticlesListComponent(:elementsObj='articles' :actions='actionsBool' @editElement='editArticle' @deleteElement='deleteArticle' )
</template>

<style lang="">

</style>

<script>
import { validation } from '~/mixins/validation'
import ArticlesListComponent from './listOfElements/articlesListComponent.vue'
export default {
  name: 'additionalArticlesComponent',
  mixins: [validation],
  components: { ArticlesListComponent },
  props: {
    articlesArray: Array
  },
  data () {
    return {
      actionsBool: true,
      articles: [],
      article: {
        number: null,
        detail: null
      },
      idEdit: null
    }
  },
  created () {
    this.articles = JSON.parse(JSON.stringify(this.articlesArray))
  },
  methods: {
    onSubmitArticles () {
      if (this.articles.length === 0) {
        this.showErrorMsg('At least one article')
      } else {
        this.$emit('dataFromAdditionalArticles', this.articles)
      }
    },
    onSubmit () {
      let _article = this.article
      let _articleObj = {
        'number': _article.number,
        'detail': _article.detail
      }
      if (this.idEdit === null && this.article.detail !== null) {
        this.articles.push(_articleObj)
      } else {
        this.articles[this.idEdit] = _articleObj
        this.idEdit = null
      }
      this.article.detail = null
      this.article.number = null
      this.$refs.articleForm.reset()
    },
    editArticle (index, data) {
      // Load data
      this.idEdit = index
      this.article = data
    },
    deleteArticle (index) {
      this.articles.splice(index, 1)
    }
  }
}
</script>
