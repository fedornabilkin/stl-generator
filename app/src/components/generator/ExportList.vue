<script setup>
import {useExportList} from "@/store/exportList";
import moment from "moment";

const exportList = useExportList()
const dateTimeFormat = (dt, format='DD.MM.YY HH:mm:ss') => {
  return moment(dt).format(format)
}
</script>

<template lang="pug">
.panel(v-if="exportList.getCollection().length")
  .panel-heading {{$t('expList')}}
  .panel-block
    table.table.is-striped.is-fullwidth
      thead
        tr
          th {{ $t('expListTableImg') }}
          th {{ $t('expListTableLink') }}
          th {{ $t('expListTableDate') }}
      tbody
        tr(v-for="item in exportList.getCollection()", :key="item.date")
          td
            img(v-if="item.img.src" :src="item.img.src" width="100")
          td
            a(:href="`/${item.hash}`" target="_blank") {{ $t('expListLoadItem') }}
          td
            span.is-size-6.has-text-grey {{ dateTimeFormat(item.date) }}
</template>

<style scoped>

</style>
