<script setup>
const props = defineProps(['expSettings'])
</script>

<template lang="pug">
  .field.is-horizontal
    .field-label.is-small
      label.label {{ $t("expTypeLabel") }}
    .field-body
      .field
        .control
          .select
            select(v-model="props.expSettings.type")
              option(value="binary") binary
              option(value="ASCII") ASCII

  .field.is-horizontal
    .field-label.is-small
      label.label {{ $t("expMultipleLabel") }}
    .field-body
      .field
        .control
          .select
            select(v-model="props.expSettings.multiple")
              option(:value="false") {{$t('no')}}
              option(:value="true") {{$t('yes')}}

</template>

<style scoped>

</style>
