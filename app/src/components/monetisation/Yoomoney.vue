<script setup>
import {ref} from "vue"

const showingThankYou = ref(false)
</script>

<template lang="pug">
  a.button(
    v-if="!showingThankYou"
    href="https://yoomoney.ru/fundraise/187LKGIJ2GT.250205"
    target="_blank"
    @click="showingThankYou=true"
  )
    span.icon
      i.fa.fa-credit-card
    span {{ $t('moneySupportProject') }}

  a.button.is-danger(
    v-if="showingThankYou"
    href="https://yoomoney.ru/fundraise/187LKGIJ2GT.250205"
    target="_blank"
  )
    span.icon
      i.fa.fa-heart
    span {{ $t('moneyThankYou') }}
</template>

<style scoped>

</style>
