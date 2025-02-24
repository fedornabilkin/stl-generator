<template lang="pug">
nav.navbar(role='navigation' aria-label='main navigation')
  //.container
  .navbar-brand
    a.navbar-item(href='/')
      img(src='../../assets/logo.png' alt='vsqr 3d генератор stl')
    p.is-hidden-mobile.navbar-item(v-if='showShareNotice')
      i.fa.fa-arrow-up.shake-vertical
      span.mx-2 {{$t('headerShareNotice')}}
      i.fa.fa-arrow-up.shake-vertical
    a.navbar-burger.burger(role='button' :class="{ 'is-active': navbarOpen }" aria-label='menu' aria-expanded='false' @click='toggleNavigation')
      span(aria-hidden='true')
      span(aria-hidden='true')
      span(aria-hidden='true')
  .navbar-menu(:class="{ 'is-active': navbarOpen }")
    .navbar-end
      .navbar-item
        LanguageSelector
      .navbar-item
        ShareButtons
      .navbar-item(v-if='!showThankYou')
        .buttons
          Yoomoney
</template>

<script>
import ShareButtons from './ShareButtons.vue';
import LanguageSelector from './LanguageSelector.vue';
import Yoomoney from "@/components/monetisation/Yoomoney.vue";

export default {
  name: 'Header',
  components: {
    Yoomoney,
    ShareButtons,
    LanguageSelector,
  },
  data() {
    return {
      navbarOpen: false,
      showThankYou: false,
      newVersion: false,
      showShareNotice: false,
      headerAd: '',
    };
  },
  methods: {
    toggleNavigation() {
      this.navbarOpen = !this.navbarOpen;
    },
    showThanks() {
      this.showThankYou = true;
    },
    openChangelogModal() {
      window.localStorage.setItem('lastViewedVersion', this.appVersion);
      this.newVersion = false;
    },
  },
  created() {
    const lastViewedVersion = window.localStorage.getItem('lastViewedVersion') || ''
    if (lastViewedVersion !== this.appVersion) {
      this.newVersion = true
    }
  },
};
</script>

<style>

.unread {
  animation: shake-horizontal 1s cubic-bezier(.645,.045,.355,1.000) 1.5s 4;
}

.shake-vertical {
  animation: shake-vertical 2s linear infinite;
}

@keyframes shake-horizontal {
  0%,
  50% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  5%,
  15%,
  25%,
  35% {
    -webkit-transform: translateX(-3px);
            transform: translateX(-3px);
  }
  10%,
  20%,
  30% {
    -webkit-transform: translateX(3px);
            transform: translateX(3px);
  }
  40% {
    -webkit-transform: translateX(2px);
            transform: translateX(2px);
  }
  45% {
    -webkit-transform: translateX(-2px);
            transform: translateX(-2px);
  }
}

@keyframes shake-vertical {
  0%, 40%{
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  10%{
    -webkit-transform: translateY(2px);
            transform: translateY(2px);
  }
  30%{
    -webkit-transform: translateY(-5px);
            transform: translateY(-5px);
  }
}
</style>
