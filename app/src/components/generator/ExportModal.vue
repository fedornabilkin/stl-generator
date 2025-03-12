<template lang="pug">
div(:class="{'modal': true, 'is-active': isActive}")
  div.modal-background
  div.modal-card
    header.modal-card-head
      p.modal-card-title {{ $t('e.modalTitle') }}
      button.delete(aria-label="close" @click="close")
    section.modal-card-body
      p.is-size-4
        span(v-if="seconds > 0") {{ $t('e.downloadStart', [seconds]) }}
        span(v-if="seconds === 0") {{ $t('e.downloadStarted') }}
        progress.progress.is-small.is-primary(max="100" v-if="seconds !== 0")
        progress.progress.is-small.is-primary(max="100" v-if="seconds === 0" value="100")
    section.modal-card-body
      .mb-4.message
        .message-body {{ $t('e.motivationText') }}
      .is-pulled-right
        Yoomoney
      .is-light
        a.button(href="/examples") {{ $t('e.exampleButton') }}
    footer.modal-card-foot
      button.button.mr-1(@click="close") {{ $t('g.close') }}
      span {{ $t('e.thankYouSupport') }}
</template>

<script>

import Yoomoney from "@/components/monetisation/Yoomoney.vue";

export default {
  name: 'ExportModal',
  components: {Yoomoney},
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    seconds: 5
  }),
  mounted() {
    this.seconds = 5
    setInterval(() => {
      if (this.seconds > 0) {
        this.seconds -= 1
      }
    }, 1000)
  },
  methods: {
    close() {
      this.seconds = 5
      this.$emit('close')
    },
  },
}
</script>
