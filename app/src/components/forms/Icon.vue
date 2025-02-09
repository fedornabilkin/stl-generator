<script setup>
const props = defineProps(['options'])

const selected = (name) => {
  props.options.icon.active = false
  props.options.icon.name = name

  if (name !== 'none') {
    props.options.icon.active = true

    const promise = new Promise((resolve, reject) => {
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
          .dropdown.is-hoverable
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
                  .column.is-4
                    .no-icon.icon-item.dropdown-item.is-vcentered(@click="selected('none')")
                      span.title.is-size-7 {{$t('noIcon')}}
                  .column.is-4(v-for='icon in icons' :key='icon')
                    .icon-item.dropdown-item.is-vcentered(@click='selected(icon)')
                      img(width='18' height='18' :src="'icons/' + icon + '.svg'" loading='lazy')

          object(
            v-if="props.options.icon.active"
            :id="props.options.icon.htmlId"
            type='image/svg+xml'
            width='32'
            height='32'
            :data="'icons/' + props.options.icon.name + '.svg'"
          )
          .is-size-7(v-if="props.options.icon.name !== 'none'")
            | Icons by Fontawesome&nbsp;
            a(href='https://fontawesome.com/license/free' target='_blank') CC BY 4.0
            p.has-text-danger(v-if="props.options.code.active") {{$t('errorCorrectionChange')}}
  .field.is-horizontal(v-if="props.options.icon.name !== 'none'")
    .field-label.is-small
      label.label {{$t('size')}}
    .field-body
      .field.has-addons
        .control
          input.input.is-small(type='number' v-model.number='props.options.icon.ratio')
        p.control
          a.button.is-static.is-small %
        span.help-icon.icon.has-text-info(:title="$t('iconSizeHelp')")
          i.fas.fa-info-circle
</template>

<style scoped>

</style>
