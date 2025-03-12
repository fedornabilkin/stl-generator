<script setup>
import {ref} from "vue";

const props = defineProps(['isActive'])
const emit = defineEmits(['close'])

let shortLink = ''
let loading = false
let shortActive = ref(false)

const url = 'https://vsqr.ru/' + window.location.hash
const params = new URLSearchParams({ url: url }).toString()
const endpointApi = `https://clck.ru/--?${params}`
const endpoint = `https://clck.ru/?${params}`

const close = () => {
  emit('close')
}

const getShortLink = () => {
  loading = true

  fetch(endpointApi)
    .then((res) => {
      if (res.status !== 200) {
        throw(res.statusText)
      }
      return res
    })
    .then(res => res.text())
    .then((res) => {
      shortLink = res
      shortActive.value = true
    })
    .catch((err) => {
      shortLink = ''
      console.log(err)
    })
    .finally(() => {
      loading = false
    })
}

getShortLink()

</script>

<template lang="pug">
.modal(:class="{'is-active': props.isActive}")
  .modal-background
  .modal-card
    header.modal-card-head
      p.modal-card-title {{$t('s.modalTitle')}}
      button.delete(aria-label='close' @click='close')
    section.modal-card-body
      p
        | {{$t('s.modalBody')}} &nbsp;
        a(href="https://go-link.ru/" target="_blank") go-link.ru

      .field.mt-3(v-if="shortActive")
        label.label {{$t('s.shortLinkLabel')}}
        .control.has-icons-left.has-icons-right
          input.input.is-success(v-model='shortLink' type="url")
          span.icon.is-small.is-left
            i.fab.fa-yandex
          span.icon.is-small.is-right
            i.fas.fa-check
        p.help.is-link
          a(:href="endpoint" target="_blank") {{$t('s.shortServiceLabel')}}

    footer.modal-card-foot
      button.button(@click='close') {{$t('g.close')}}
</template>
