<template lang="pug">
div(id="qrcodeMenu")

  //button.button.is-info.is-medium.is-fullwidth.mb-3(@click="openQRScanner")
  //  span.icon
  //    i.fa.fa-camera
  //  span {{$t('copyExistingQRCode')}}

  QRCodeModelOptionsPanel(:options="options" :unit="unit")

  .notification.is-danger.is-light(v-if="generateError" style="margin-top: 20px 0;")
    | {{generateError}}

  .notification.is-warning.is-light(v-if="(blockWidth && blockHeight) && (blockWidth < 2 || blockHeight < 2)")

    strong {{$t('printabilityWarning')}}:
    | {{$t('printabilityWarningBody', { dimensions: `${Number(blockWidth).toFixed(1)}mm x ${Number(blockHeight).toFixed(1)}mm` })}}

  .columns
    .column.is-5
      button.button.is-success.is-large(:class="{'is-loading': isGenerating}" @click="prepareData")
        span.icon
          i.fa.fa-cube
        span {{$t('generateButton')}}

  ScannerModal(v-if="scannerModalVisible" @decode="onDecode")
</template>

<script>
import qrcode from 'qrcode';
import vcardjs from 'vcards-js';
import { diff } from 'deep-object-diff';
import merge from 'deepmerge';
import JSZip from 'jszip';
// 3D settings panel
import QRCodeModelOptionsPanel from './QRCodeModelOptionsPanel.vue';
import ScannerModal from './ScannerModal.vue';
import { save, saveAsString, saveAsArrayBuffer } from '@/utils';
import QRCode3D from "@/qrcode3d";
import {QRCodeModel} from "@/v3d/create/base";
import {Model} from "@/v3d/create/model";
import {useShareHash} from "@/service/shareHash";
import {useExportList} from "@/store/exportList";
import {Share} from "@/entity/share";

const defaultOptions = {
  activeTabIndex: 0,
  border: {
    active: true,
    width: 1,
    depth: 1,
  },
  text: {
    active: false,
    message: '',
    placement: 'center',
    align: 'center',
    margin: 1,
    size: 10,
    depth: 1,
    height: 10,
  },
  keychain: {
    active: false,
    placement: 'left',
    holeDiameter: 6,
    mirror: false,
  },
  icon: {
    active: false,
    name: 'none',
    ratio: 20,
    data: undefined,
    htmlId: 'icon-preview'
  },
  content: '',
  wifi: {
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false,
  },
  email: {
    recipient: '',
    subject: '',
    body: '',
  },
  contact: {
    firstName: '',
    lastName: '',
    organization: '',
    role: '',
    cell: '',
    phone: '',
    fax: '',
    email: '',
    street: '',
    postcode: '',
    city: '',
    state: '',
    country: '',
    website: '',
  },
  sms: {
    recipient: '',
    message: '',
  },
  base: {
    shape: 'roundedRectangle',
    width: 100,
    height: 100,
    depth: 3,
    cornerRadius: 5,
    hasNfcIndentation: false,
    nfcIndentationShape: 'square',
    nfcIndentationSize: 30,
    nfcIndentationDepth: 1,
    nfcIndentationHidden: false,
  },
  code: {
    active: true,
    depth: 1,
    margin: 2,
    blockSizeMultiplier: 100,
    cityMode: false,
    depthMax: 2,
    errorCorrectionLevel: 'M',
    invert: false,
    preview: {
      src: null,
      htmlId: 'qr-image-preview',
    },
  },
};

export default {
  name: 'QRCodeMenu',
  props: {
    initData: Object,
    scene: Object,
    renderer: Object,
    exporter: Object,
  },
  components: {
    QRCodeModelOptionsPanel,
    ScannerModal,
  },
  data() {
    return {
      options: JSON.parse(JSON.stringify(defaultOptions)),
      diffOptions: {},
      qrCodeBitMask: null,
      unit: 'mm',
      mesh: null,
      blockWidth: null,
      blockHeight: null,
      isGenerating: false,
      generateError: null,
      scannerModalVisible: false,
      addedMeshes: [],
      generator: undefined,
      model3d: undefined,
    };
  },
  async mounted() {
    if (this.initData) {
      this.options = merge(this.options, this.initData)
      await this.prepareData()
    }
  },

  methods: {
    async render3d() {
      for(const item of this.addedMeshes) {
        this.scene.remove(item)
      }

      this.generator = new QRCode3D(this.qrCodeBitMask, this.options)

      const strategy = new QRCodeModel()
      this.model3d = new Model()
      this.model3d.setStrategy(strategy)


      const addPromise = new Promise((resolve) => {
        const parts = this.model3d.create(this.generator)
        resolve(parts)
      })

      addPromise
          .then((result) => {
            for(const key in result) {
              this.scene.add(result[key])
              this.addedMeshes.push(result[key])
            }
          })
          .then(() => {
            this.diffOptions = diff(defaultOptions, this.options)
            this.$emit('exportReady', this.diffOptions, this.addedMeshes)
            this.isGenerating = false
          })

    },
    async prepareData() {
      this.$emit('generating')

      this.generateError = null
      this.isGenerating = true

      const txt = this.getQRText()
      if (this.options.code.active && txt === '') {
        this.isGenerating = false
        this.generateError = 'You have not entered any text.'
        return
      }

      if (this.options.icon.active) {
        this.options.code.errorCorrectionLevel = 'H'
      }

      if (this.options.code.active) {
        try {
          const qrConfig = {errorCorrectionLevel: this.options.code.errorCorrectionLevel}
          const qrCodeObject = await qrcode.create(txt, qrConfig)
          this.qrCodeBitMask = qrCodeObject.modules.data

          qrConfig.margin = 1
          qrcode.toDataURL(txt, qrConfig, (err, src) => {
            if (err) {
              throw err
            }
            this.options.code.preview.src = src
          })
        } catch (e) {
          this.generateError = `Error during generation: ${e.message}`
          this.isGenerating = false
          return
        }
      }

      await this.render3d()
    },
    async exportSTL(stlType, multipleParts) {
      const timestamp = new Date().getTime()
      const exportAsBinary = stlType === 'binary'
      const expConfig = {binary: exportAsBinary}

      if (multipleParts) {
        const parts = await this.model3d.create(this.generator)
        const zip = new JSZip()

        for(const key in parts) {
          const data = this.exporter.parse(parts[key], expConfig)
          zip.file(`${key}-${timestamp}.stl`, data.buffer)
        }

        zip.generateAsync({ type: 'blob' }).then((content) => {
          save(new Blob([content]), `vsqr-3d-${timestamp}.zip`)
        })
      } else {
        const mesh = this.model3d.export(this.generator)
        const filename = `vsqr-3d-${timestamp}.stl`
        const result = this.exporter.parse(mesh, expConfig)

        if (exportAsBinary) {
          saveAsArrayBuffer(result, filename)
        } else {
          saveAsString(result, filename)
        }
      }
      this.addLastExport()
    },
    addLastExport() {
      const shareHash = useShareHash()
      const hash = shareHash.create(this.diffOptions)
      const exportList = useExportList()
      const imgDataUrl = this.renderer.domElement.toDataURL()

      exportList.add(new Share({hash: hash, img: {src: imgDataUrl}, date: new Date().getTime()}))
      window.localStorage.setItem(exportList.keyStore, JSON.stringify(exportList.getCollection()))
    },
    openQRScanner() {
      this.scannerModalVisible = true;
    },
    onDecode(decodedText) {
      this.options.content = decodedText
      this.options.activeTabIndex = 0
    },
    wifiQREscape(str) {
      const regex = /([:|\\|;|,|"])/gm
      const subst = '\\$1'
      return str.replace(regex, subst)
    },
    getQRText() {

      let ret = '';
      switch (this.options.activeTabIndex) {
        case 0: // Text
          ret = this.options.content
          break;
        case 1: // Wifi
          if (this.options.wifi.password === '') {
            this.options.wifi.security = 'nopass';
          }
          if (this.options.wifi.security === 'nopass') {
            this.options.wifi.password = '';
          }
          ret = `WIFI:S:${this.wifiQREscape(
            this.options.wifi.ssid,
          )};T:${this.wifiQREscape(this.options.wifi.security)};P:${this.wifiQREscape(
            this.options.wifi.password,
          )};H:${this.options.wifi.hidden ? 'true' : 'false'};`;
          break;
        case 2: // E-Mail
          ret = `mailto:${this.options.email.recipient
            .split(',')
            .map((x) => x.trim())
            .join(',')}?subject=${encodeURI(
            this.options.email.subject,
          )}&body=${encodeURI(this.options.email.body)}`;
          break;
        case 3: // Contact
          const vCard = vcardjs()
          vCard.firstName = this.options.contact.firstName;
          vCard.lastName = this.options.contact.lastName;
          vCard.organization = this.options.contact.organization;
          vCard.url = this.options.contact.website;
          vCard.role = this.options.contact.role;

          vCard.homePhone = this.options.contact.phone;
          vCard.cellPhone = this.options.contact.cell;
          vCard.homeFax = this.options.contact.fax;

          vCard.email = this.options.contact.email;

          vCard.homeAddress.street = this.options.contact.street;
          vCard.homeAddress.city = this.options.contact.city;
          vCard.homeAddress.stateProvince = this.options.contact.state;
          vCard.homeAddress.postalCode = this.options.contact.postcode;
          vCard.homeAddress.countryRegion = this.options.contact.country;

          // vCard.socialUrls.facebook = 'https://...';
          // vCard.socialUrls.linkedIn = 'https://...';
          // vCard.socialUrls.twitter = 'https://...';
          // vCard.socialUrls.flickr = 'https://...';
          // vCard.socialUrls.custom = 'https://...';

          vCard.version = '3.0'; // can also support 2.1 and 4.0, certain versions only support certain fields

          ret = vCard.getFormattedString();
          break;
        case 4: // SMS
          ret = `SMSTO:${this.options.sms.recipient}:${this.options.sms.message}`;
          break;
        default:
          break;
      }

      return ret
    },
  },
};
</script>

<style scoped>
#mode-buttons>button {
  margin-right: 20px;
}
</style>
