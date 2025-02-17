<template lang="pug">
nav.panel
  p.panel-heading {{$t('modelOptions')}}
  .panel-block
    .columns(style='width: 100%')
      .column.is-12-widescreen.is-12-fullhd.is-8
        // Base Settings
        Base(:options='options' :unit='unit')

        // QR Settings
        Qr(:options='options' :unit='unit')

        // Text Settings
        Text(:options='options' :unit='unit')
        // Border Settings
        Border(:options='options' :unit='unit')
        // Keychain Settings
        Keychain(:options='options' :unit='unit')
        // Icon Settings
        Icon(:options='options')
        // NFC Tag Section
        Magnet(:options='options' :unit='unit')

</template>

<script>
import Border from "@/components/forms/Border.vue";
import Keychain from "@/components/forms/Keychain.vue";
import Icon from "@/components/forms/Icon.vue";
import Qr from "@/components/forms/Qr.vue";
import Text from "@/components/forms/Text.vue";
import Base from "@/components/forms/Base.vue";
import Magnet from "@/components/forms/Magnet.vue";

export default {
  name: 'QRCodeModelOptionsPanel',
  components: {Magnet, Base, Text, Qr, Icon, Keychain, Border},
  props: {
    options: Object,
    unit: String,
  },
  data() {
    return {

    };
  },
  methods: {
  },
}
</script>

<style>
.help-icon {
  margin-top: 3px;
  margin-left: 5px;
}

.model-options-title {
  margin: 0 0 10px 5px;
  padding-bottom: 7px;
  border-bottom: 2px solid whitesmoke;
}

#icon-preview {
  margin-left: 15px;
}

.icon-item {
  border-radius: 10px;
}

.icon-item>img {
  width: 18px;
  height: 18px;
}

.icon-item:hover {
  background: whitesmoke;
  cursor: pointer;
}

.icon-item.no-icon {
  padding: 5px;
}

#dropdown-content2 {
  width: 240px;
  padding: 20px;
}
</style>
