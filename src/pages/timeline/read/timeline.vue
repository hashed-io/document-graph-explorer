<template lang='pug'>
q-timeline(
  color='secondary'
  layout='dense'
  )
  q-timeline-entry(
    heading
    )
    | Time Line Heading
  q-timeline-entry(
    time="Event Title"
    icon='img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg'
  )
    .container
      .p
        | Amet ipsum aliquam adipisci est magnam
        | Dolore velit est magnam modi neque. Quaerat labore quaerat velit voluptatem dolore modi. Adipisci dolor etincidunt amet tempora amet sit. Labore dolore labore dolorem dolorem consectetur modi. Tempora velit adipisci etincidunt quisquam ipsum. Sed dolorem est adipisci amet sed consectetur. Sed quiquia ipsum neque tempora. Numquam magnam ipsum sit velit eius.
      .p.text-caption.text-grey-6.text-bold.q-pl-md
        | Sep 13
  q-timeline-entry(
    time="Event Title"
    color="orange"
    subtitle="February 22, 2021"
    icon="add"
  )
    | Dolore velit est magnam modi neque. Quaerat labore quaerat velit voluptatem dolore modi. Adipisci dolor etincidunt amet tempora amet sit. Labore dolore labore dolorem dolorem consectetur modi. Tempora velit adipisci etincidunt quisquam ipsum. Sed dolorem est adipisci amet sed consectetur. Sed quiquia ipsum neque tempora. Numquam magnam ipsum sit velit eius.

  q-timeline-entry(
    time="Event Title"
    color="green"
    subtitle="February 22, 2021"
    icon="add"
  )
    | Dolore velit est magnam modi neque. Quaerat labore quaerat velit voluptatem dolore modi. Adipisci dolor etincidunt amet tempora amet sit. Labore dolore labore dolorem dolorem consectetur modi. Tempora velit adipisci etincidunt quisquam ipsum. Sed dolorem est adipisci amet sed consectetur. Sed quiquia ipsum neque tempora. Numquam magnam ipsum sit velit eius.
</template>

<script>
export default {
  name: 'Time-line'
}
</script>

<style lang="stylus" scoped>
.container
  display: flex
  width: 100%
.p
  margin: 10px;
.p:last-of-type
  margin-left: auto
</style>
