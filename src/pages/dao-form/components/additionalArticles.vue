<script>
export default {
  name: 'additionalArticlesComponent',
  data () {
    return {
      articles: [],
      article: {
        articleNumber: '6',
        articleDetail: null
      },
      idEdit: null
    }
  },
  methods: {
    onSubmit () {
      let _article = this.article
      let _articleObj = {
        'articleNumber': _article.articleNumber,
        'articleDetail': _article.articleDetail
      }
      if (this.idEdit === null && this.article.articleDetail !== null) {
        this.articles.push(_articleObj)
      } else {
        this.articles[this.idEdit] = _articleObj
        this.idEdit = null
      }
      this.clearForm()
    },
    clearForm () {
      this.article.articleDetail = null
      this.article.articleNumber = '6'
    },
    onReset () {
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
<template lang="pug">
.q-pa-md
  template
    q-card(flat bordered)
      q-separator
      div.q-px-lg.text-subtitle1.q-pt-md
        | Please use the form below to add additional articles if necessary. Press 'Add' after entering the information for each article.
      div.q-px-lg(style='color:red').text-subtitle1
        | An LLC or any LLC subtype (DAO, Series, Close) does not file an operating agreement with the Secretary of State.
      hr
      span.q-px-lg.text-subtitle1(style='color:red') Important:
      p.q-px-lg.text-subtitle2
        u Additional information is required at this step. Provide the following information required by adding additional articles before moving to the confirmation page:
      div.q-px-xl.text-subtitle2.q-pt-md
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
      q-form(@submit='onSubmit', @reset='onReset' ref="articleForm")
        div.q-pa-xl(style='max-width:100%')
          .row.q-gutter-md.justify-center
            .col-xs-12.col-sm-1
              q-input(v-model='article.articleNumber' input-class='text-center' outlined disable=true label='Article #' )
            .col-xs-12.col-sm-10
              q-input(v-model='article.articleDetail'  outlined counter maxlength='1000' type="textarea" label='Article detail')
          div(v-if='idEdit === null')
            q-btn(label="ADD" type="submit" color="primary")
          div(v-else)
            q-btn(label="UPDATE" @click='onSubmit' color="primary")
          .q-pa-sm
            //- q-btn(label="CLEAR" type="reset" color="primary")
  template
  .q-pa-md
    .text-h6 Articles Detail
    hr
    div(v-if='articles.length === 0')
      p    No Additional Articles Identified...
    div(v-else)
      q-list(bordered class="rounded-borders")
        div.q-pa-md.q-gutter-md(v-for='(article, index) in articles')
          template
            q-item(clickable)
              q-item-section(top)
                q-item-label(lines='5')
                  span.text-subtitle1
                    strong
                      | Article: &nbsp; #
                    b {{index}}
              q-item-section(top class="col-10")
                q-item-label(caption='', lines='30')
                  span.text-subtitle1
                    strong(style='color:black;')
                      | Detail: &nbsp;
                    b {{article.articleDetail}}
              q-item-section(top='', side='')
                .text-grey-8.q-gutter-xs
                  q-btn.gt-xs(size='12px', flat='', dense='', round='', icon='delete' @click='deleteArticle(index)')
                  q-btn.gt-xs(size='12px', flat='', dense='', round='', icon='edit' @click='editArticle(index, article)')

</template>

<style lang="">

</style>
