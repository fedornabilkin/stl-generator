<script setup>
const props = defineProps(['options', 'unit'])
</script>

<template lang="pug">
.field.is-horizontal
  .field-label.is-small
    label.label {{ $t("keychain") }}
  .field-body
    .control
      label.checkbox
        .field
          input(type='checkbox' v-model='props.options.keychain.active')
          span.is-size-7
            i.fa.fa-key &nbsp;
            | {{ $t("keychainHelp") }}
.box(v-if='props.options.keychain.active')
  .field.is-horizontal
    .field-label.is-small
      label.label {{ $t("placement") }}
    .field-body
      .field
        .control.has-icons-left
          .select.is-small
            select(v-model='props.options.keychain.placement')
              option(value='top') {{ $t("top") }}
              option(value='left') {{ $t("left") }}
              option(value='topLeft') {{ $t("top") }}-{{ $t("left") }}
            span.icon.is-small.is-left
              i.fa.fa-arrows-alt-v
  .field.is-horizontal
    .field-label.is-small
      label.label {{ $t("keychainHoleDiameter") }}
    .field-body
      .field.has-addons
        .control
          input.input.is-small(type='number' v-model.number='props.options.keychain.holeDiameter')
        p.control
          a.button.is-static.is-small {{ unit }}
  .field.is-horizontal
    .field-label.is-small
      label.label {{ $t("mirrorHoles") }}
    .field-body
      .control
        label.checkbox
          .field
            input(type='checkbox' v-model='props.options.keychain.mirror')
            span.is-size-7 {{ $t("mirrorHolesHelp") }}
  //.field.is-horizontal
  //  .field-label.is-small
  //    label.label {{ $t("color") }}
  //  .field-body
  //    .field
  //      .control.has-icons-left
  //        input.input.is-small(type='color' v-model='props.options.keychain.color')
  //        span.icon.is-small.is-left
  //          i.fas.fa-palette
</template>

<style scoped>

</style>
