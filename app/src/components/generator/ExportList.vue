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

const removeItem = (item) => {
  props.store.removeItem(item)
}
</script>

<template lang="pug">
table.table.is-striped.is-fullwidth(v-if="items.length")
  thead
    tr
      th(colspan="4") {{ props.title }}
  tbody
    tr(v-for="item in items", :key="item.date")
      td
        img(v-if="item.img.src" :src="item.img.src" width="100")
      td
        a.button(:href="`/${item.hash}`" target="_blank") {{ $t('e.loadItem') }}
      td
        span.is-size-6.has-text-grey {{ dateTimeFormat(item.date) }}
      td
        span.delete.pulled-right(aria-label="close" @click="removeItem(item)" :title="$t('g.remove')")
</template>

<style scoped>

</style>
