<script setup>
import moment from "moment";

const props = defineProps(['store', 'title'])

let items = []
if (props.store) {
  items = props.store.getCollection()
}

const dateTimeFormat = (dt, format='DD.MM.YY HH:mm:ss') => {
  return moment(dt).format(format)
}
</script>

<template lang="pug">
.panel(v-if="items.length")
  .panel-heading {{ props.title }}
  .panel-block
    table.table.is-striped.is-fullwidth
      tbody
        tr(v-for="item in items", :key="item.date")
          td
            img(v-if="item.img.src" :src="item.img.src" width="100")
          td
            a.button(:href="`/${item.hash}`") {{ $t('expListLoadItem') }}
          td
            span.is-size-6.has-text-grey {{ dateTimeFormat(item.date) }}
</template>

<style scoped>

</style>
