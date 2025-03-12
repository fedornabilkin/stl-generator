<template lang="pug">
nav.navbar(role='navigation' aria-label='main navigation')
  //.container
  .navbar-brand
    a.navbar-item(href='/')
      img(src='../../assets/logo.png' alt='vsqr.ru 3d генератор stl')
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

</style>
