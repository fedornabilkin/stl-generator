<script setup>
import ExportList from "@/components/generator/ExportList.vue";

const props = defineProps(['isActive', 'title', 'store'])
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>
<template lang="pug">
div(:class="{'modal': true, 'is-active': isActive}")
  div.modal-background
  div.modal-card
    header.modal-card-head
      p.modal-card-title История сгенерированных моделей
      button.delete(aria-label="close" @click="close")
    section.modal-card-body
      .message.is-info
        .message-body
          p История сгенерированных моделей доступна в пределах одной вкладки не более {{ props.store.getLimit() }} шт.
      ExportList(:store="props.store" title="История")

    footer.modal-card-foot
      button.button.mr-1(@click="close") Закрыть
</template>
