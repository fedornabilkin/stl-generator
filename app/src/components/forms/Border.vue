<script setup>
const props = defineProps(['options', 'unit'])
</script>

<template lang="pug">
.field.is-horizontal
  .field-label.is-small
    label.label {{ $t("border") }}

  .field-body
    .field
      .control
        label.checkbox
          input(type="checkbox" v-model="props.options.border.active")
          span.is-size-7
            i.fa.fa-border-all &nbsp;
            | {{ $t("borderAroundBase") }}

.subsection(v-if="props.options.border.active")
  .field.is-horizontal
    .field-label.is-small
      label.label {{ $t("width") }}
    .field-body
      .field.has-addons
        .control
          input.input.is-small(type="number" v-model.number="props.options.border.width")
        p.control
          a.button.is-static.is-small {{ props.unit }}

  .field.is-horizontal
    .field-label.is-small
      label.label {{ $t("depth") }}

    .field-body
      .field.has-addons
        .control
          input.input.is-small(type="number" v-model.number="props.options.border.depth")
        p.control
          a.button.is-static.is-small {{ props.unit }}
</template>

<style scoped>

</style>
