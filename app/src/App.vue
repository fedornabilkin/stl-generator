<template lang="pug">
  div(id="app")
    Header
    Main
    Footer
</template>

<script>
import Header from './components/template/Header.vue';
import Main from './components/template/Main.vue';
import Footer from './components/template/Footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Main,
    Footer,
  },
};
</script>

<style>

</style>
