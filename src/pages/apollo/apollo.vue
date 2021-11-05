<template lang="pug">
div(class="q-pa-md items-start")
  .row.container
    .col
      .row
        q-btn(
          color="primary"
          label="Get Documents"
          size="md"
          @click="onClickButton"
        )
      .row.q-mt-sm(v-if="documents")
        .col(v-for="{ creator, type, createdDate } in documents" flat bordered)
          q-card.q-ma-xs
            q-card-section
              .text-h5 Creator: {{ creator }}
            q-separator
            q-card-section
              .text-bold.q-ml-sm Type: {{ type }}
              .text-bold.q-ml-sm Created date: {{ createdDate }}
  .row.container
    .col
      .row
        q-btn(
          color="primary"
          label="Get Documents"
          size="md"
          @click="onClickAssignment"
        )
      .row.q-mt-sm(v-if="assignment")
        .col(v-for="{ creator, type, details_description_s } in assignment")
          q-card(flat bordered).q-ma-xs
            q-card-section
              .text-h5 Creator: {{ creator }}
              .text-bold.q-ml-sm Type: {{ type }}
            q-separator
            q-card-section
              .text-bold.q-mb-sm Detail:
              .text-caption {{ smallText(details_description_s) }}
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'apollo-example',
  data () {
    return {
      documents: undefined,
      assignment: undefined
    }
  },
  methods: {
    ...mapActions('apollo', ['getDocuments', 'getAssignment']),
    async onClickButton () {
      const data = await this.getDocuments()
      this.documents = data.queryDocument
    },
    async onClickAssignment () {
      const data = await this.getAssignment()
      this.assignment = data.queryAssignment
    },
    smallText (text) {
      return text.slice(0, 250) + '...'
    }
  }
}
</script>

<styles lang="scss" scope>
.container {
  height: 200px;
}
</styles>
