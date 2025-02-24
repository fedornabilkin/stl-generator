<script setup>
import ShareButtons from './ShareButtons.vue';
import Yoomoney from "@/components/monetisation/Yoomoney.vue";
</script>

<template lang="pug">
footer.footer
  .container
    .columns
      .column
        Yoomoney
      .column
        a.button.is-info(href="/examples") Смотреть примеры

      .column
        ShareButtons

    .box
      .is-pulled-right
        a(href="/") vsqr.ru
        | &nbsp;&copy; 2025
      .button.is-light
        a(href="https://t.me/+dSgck2GM29syZTQ6" target="_blank")
          i.fab.fa-telegram
          | &nbsp;обсудить
</template>

<style scoped>
footer.footer {padding-bottom: .5rem}
</style>
