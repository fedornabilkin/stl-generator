<script setup>
import ShareButtons from './ShareButtons.vue';
import Yoomoney from "@/components/monetisation/Yoomoney.vue";
</script>

<template lang="pug">
footer.footer
  .columns
    .column
      Yoomoney
    .column
      a(href="/examples") Примеры

    .column
      ShareButtons

  .box
    .is-pulled-right
      a(href="/") vsqr.ru
      | &nbsp;&copy; 2025
    .is-dark
      a(href="https://t.me/+dSgck2GM29syZTQ6" target="_blank")
        i.fab.fa-telegram
        | &nbsp;обсудить
</template>

<style scoped>
footer.footer {padding-bottom: .5rem}
</style>
