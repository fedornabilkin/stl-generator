<script setup>
import {ref} from "vue"

const showingThankYou = ref(false)
</script>

<template lang="pug">
  a.button.is-light.jello-horizontal(
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
/*
https://xsgames.co/animatiss
https://cssreference.io/
https://cssmasterclass.io/
https://jgthms.com/web-design-in-4-minutes
*/
.jello-horizontal{
  animation:jello-horizontal 10s linear both;
  animation-iteration-count: infinite;
  animation-delay: 3s;
}
@keyframes jello-horizontal{
  0%{transform:scale3d(1,1,1)}
  3%{transform:scale3d(1.25,.75,1)}
  4%{transform:scale3d(.75,1.25,1)}
  5%{transform:scale3d(1.15,.85,1)}
  6%{transform:scale3d(.95,1.05,1)}
  7%{transform:scale3d(1.05,.95,1)}
  100%{transform:scale3d(1,1,1)}
}
</style>
