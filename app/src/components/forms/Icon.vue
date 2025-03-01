<script setup>
import SpotifyModelOptionsPanel from "@/components/SpotifyModelOptionsPanel.vue";

const props = defineProps(['options', 'unit'])

const getSrc = () => {
  let src = '/icons/' + props.options.icon.name + '.svg'
  if (props.options.icon.srcCustom) {
    src = props.options.icon.srcCustom
  }
  return src
}

const change = () => {
  selected('none')
  props.options.icon.src = props.options.icon.srcCustom
}

const selected = (name) => {
  props.options.icon.name = name

  if (name !== 'none') {
    props.options.icon.srcCustom = ''

    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })

    promise.then(() => {
      const preview = document.querySelector('#' + props.options.icon.htmlId)
      props.options.icon.src = preview.contentDocument.querySelector('svg').outerHTML
    })
  }
}

if (props.options.icon.name !== 'none') {
  selected(props.options.icon.name)
}

const icons = [
  'wifi',
  'telegram',
  'user',
  'user-plus',
  'key',
  'mouse-pointer',
  'globe',
  'bookmark',
  'bubble',
  'marker',
  'map',
  'envelope',
  'facebook',
  'linkedin',
  'twitter',
  'paypal',
  'share',
  'share-alt',
  'calendar',
  'phone',
  'music',
  'play',
  'exclamation',
  'info',
  'home',
  'heart',
  'check',
  'lightbulb',
  'star',
  'thumbs-up',
  'thumbs-down',
  'bolt',
  'moon',
]
</script>

<template lang="pug">
.field.is-horizontal
  .field-label.is-small
    label.label {{$t('icon')}}

  .field-body
    .field
      .control
        label.checkbox
          input(type="checkbox" v-model="props.options.icon.active")
          span.is-size-7
            i.fa.fa-icons &nbsp;
            | Выбрать иконку или указать свой svg

.box(v-if="props.options.icon.active")
  .field.is-horizontal
    .field-label.is-small
      label.label Выбрать
    .field-body
      .field
        .control
          .dropdown.is-hoverable.mr-2
            .dropdown-trigger
              button.button.is-small(aria-haspopup='true' aria-controls='dropdown-menu2')
                span.icon.is-small
                  i.fa.fa-icons(aria-hidden='true')
                span {{props.options.icon.name}}
                span.icon.is-small
                  i.fas.fa-angle-down(aria-hidden='true')
            #dropdown-menu2.dropdown-menu(role='menu')
              #dropdown-content2.dropdown-content
                .columns.is-multiline
                  .column.is-12
                    .no-icon.icon-item.dropdown-item.is-vcentered(@click="selected('none')")
                      span.title.is-size-7 {{$t('noIcon')}}
                  .column.is-4(v-for='icon in icons' :key='icon')
                    .icon-item.dropdown-item.is-vcentered(@click='selected(icon)')
                      img(width='18' height='18' :src="'/icons/' + icon + '.svg'" loading='lazy')

          object(
            v-if="props.options.icon.name !== 'none'"
            :id="props.options.icon.htmlId"
            type='image/svg+xml'
            width='32'
            height='32'
            :data="'/icons/' + props.options.icon.name + '.svg'"
          )

  .field
    .control
      label.label.is-small Свой SVG
      textarea.textarea.is-small(
        v-model='props.options.icon.srcCustom'
        @keyup="change"
        rows='3'
        placeholder="svg"
      )

  .columns
    .column
      .field.is-horizontal
        .field-label.is-small
          label.label {{$t('size')}}
        .field-body
          .field.has-addons
            .control
              a.button.is-static.is-small %
            .control
              input.input.is-small(type='number' v-model.number='props.options.icon.ratio')
            .control(:title="$t('iconSizeHelp')")
              .button.is-static.is-small
                span.has-text-info
                  i.fas.fa-info-circle

      .field.is-horizontal
        .field-label.is-small
          label.label Инвертировать
        .field-body
          .field
            .control
              input(type="checkbox" v-model.number='props.options.icon.inverted')

    .column
      .field.is-horizontal
        .field-body
          .field.has-addons
            p.control(title="Сдвинуть по горизонтали")
              .button.is-static.is-small
                span
                  i.fa.fa-arrow-right
            .control
              input.input.is-small(type='number' v-model.number='props.options.icon.offsetX')
            p.control
              a.button.is-static.is-small {{unit}}

      .field.is-horizontal
        .field-body
          .field.has-addons
            p.control(title="Сдвинуть по вертикали")
              .button.is-static.is-small
                span
                  i.fa.fa-arrow-up
            .control
              input.input.is-small(type='number' v-model.number='props.options.icon.offsetY')
            p.control
              a.button.is-static.is-small {{unit}}

  .tag.is-light
    | Иконки Fontawesome&nbsp;
    a(href='https://fontawesome.com/license/free' target='_blank') CC BY 4.0
  p.is-size-7.has-text-danger(v-if="props.options.code.active") {{$t('errorCorrectionChange')}}
</template>

<style scoped>

</style>
