<script setup>
import QRCodeTabs from "@/components/forms/QRCodeTabs.vue";
import Wifi from "@/components/forms/Wifi.vue";
import Email from "@/components/forms/Email.vue";
import Contact from "@/components/forms/Contact.vue";
import SMS from "@/components/forms/SMS.vue";

const props = defineProps(['options', 'unit'])
const setActiveTab = (idx) => {
  props.options.activeTabIndex = idx
}
</script>

<template lang="pug">
.field.is-horizontal
  .field-label.is-small
    label.label {{ $t("QR") }}

  .field-body
    .field
      .control
        label.checkbox
          input(type="checkbox" v-model="props.options.code.active")
          span.is-size-7
            i.fa.fa-qrcode &nbsp;
            | {{ $t("qrHelp") }}

.box(v-if="props.options.code.active")
  QRCodeTabs(:active-tab-index='options.activeTabIndex' @change='setActiveTab')
  // Text
  .option-pane(v-if='options.activeTabIndex === 0')
    textarea.textarea(:placeholder="$t('qrCodeTextPlaceholder')" v-model='options.content' rows="2" style='width: 100%')
  // Wifi
  .option-pane(v-if='options.activeTabIndex === 1')
    Wifi(:wifi='options.wifi')
  // E-Mail
  .option-pane(v-if='options.activeTabIndex === 2')
    Email(:email='options.email')
  // Contact
  .option-pane(v-if='options.activeTabIndex === 3')
    Contact(:contact='options.contact')
  // SMS
  .option-pane(v-if='options.activeTabIndex === 4')
    SMS(:sms='options.sms')

.box(v-if="props.options.code.active")
  .columns.is-multiline
    .column
      // Download
      //.field.is-horizontal
        .field-label.is-small
          label.label {{$t('invert')}}
        .field-body
          .field
            .control
              label.checkbox
                input(type='checkbox' v-model='props.options.code.invert')
                span.is-size-7
                  i.fa.fa-retweet
                  |  {{$t('invertText')}}
      .field.is-horizontal
        .field-label.is-small
          label.label {{$t('depth')}}
        .field-body
          .field.has-addons
            .control
              input.input.is-small(type='number' v-model.number='props.options.code.depth')
            p.control
              a.button.is-static.is-small {{unit}}
      .field.is-horizontal
        .field-label.is-small
          label.label {{$t('margin')}}
        .field-body
          .field.has-addons
            .control
              input.input.is-small(type='number' v-model.number='props.options.code.margin')
            p.control
              a.button.is-static.is-small {{unit}}

      // Error Correction
      .field.is-horizontal
        .field-label.is-small
          label.label {{$t('errorCorrection')}}
        .field-body
          .field
            .control
              .select.is-small
                select(v-model='props.options.code.errorCorrectionLevel')
                  option(value='L') L (Low, 7% redundant)
                  option(value='M') M (Medium, 15% redundant)
                  option(value='Q') Q (Quartile, 25% redundant)
                  option(value='H') H (High, 30% redundant)
              p.help {{$t('errorCorrectionHelp')}}

    .column
      .field.is-horizontal
        .field-label.is-small
          label.label {{$t('block')}} {{$t('size')}}
        .field-body
          .field.has-addons
            .control
              input.input.is-small(type='number' v-model.number='props.options.code.block.ratio')
            p.control
              a.button.is-static.is-small %
            span.help-icon.icon.has-text-info(:title="$t('blockSizeHelp')")
              i.fas.fa-info-circle

      .field.is-horizontal
        .field-label.is-small
          label.label {{$t('block')}} {{$t('shape')}}
        .field-body
          .field.has-addons
            .control
              .select.is-small
                select(v-model='props.options.code.block.shape')
                  option(value='classic') Классика
                  option(value='rotation') Ромб
                  option(value='round') Круг

      // Skyscraper Mode
      .field.is-horizontal(v-if='!props.options.code.invert')
        .field-label.is-small
          label.label {{$t('cityMode')}}
        .field-body
          .field
            .control
              label.checkbox
                input(type='checkbox' v-model='props.options.code.block.cityMode')
                span.is-size-7
                  i.fa.fa-city
                  |  {{$t('cityModeText')}}

      div(v-if='props.options.code.block.cityMode')
        .field.is-horizontal
          .field-label.is-small
            label.label {{$t('depth')}} {{$t('min')}}
          .field-body
            .field.has-addons
              .control
                input.input.is-small(type='number' v-model.number='props.options.code.depth')
              p.control
                a.button.is-static.is-small {{unit}}
        .field.is-horizontal
          .field-label.is-small
            label.label {{$t('depth')}} {{$t('max')}}
          .field-body
            .field.has-addons
              .control
                input.input.is-small(type='number' v-model.number='props.options.code.block.depth')
              p.control
                a.button.is-static.is-small {{unit}}

  .box.mt-1(style="width: fit-content")
    figure.image.is-64x64(:class="{'is-skeleton': !props.options.code.preview.src}")
      img(:src="props.options.code.preview.src")

</template>

<style scoped>
</style>
