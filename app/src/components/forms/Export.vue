<script setup>
const props = defineProps(['expSettings'])
</script>

<template lang="pug">
  .field.is-horizontal
    .field-label.is-small
      label.label {{ $t("e.typeLabel") }}
    .field-body
      .field
        .control
          .select
            select(v-model="props.expSettings.type")
              option(value="binary") binary
              option(value="ASCII") ASCII

  .field.is-horizontal
    .field-label.is-small
      label.label {{ $t("e.multipleLabel") }}
    .field-body
      .field
        .control
          .select
            select(v-model="props.expSettings.multiple")
              option(:value="false") {{$t('g.no')}}
              option(:value="true") {{$t('g.yes')}}

</template>

<style scoped>

</style>
