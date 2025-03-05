<template lang="pug">
.px-1.py-0.button.is-warning.is-small.share-button-shake(v-if='expSettings.active')
  i.fa.fa-arrow-up.shake-vertical
  span.mx-2 {{$t('headerShareNotice')}}
  i.fa.fa-arrow-up.shake-vertical
.container
  .columns.is-multiline
    .column
      h1.title {{ $t("title") }}
      //h2.subtitle {{ $t("subtitle") }}

      QRCodeMenu(v-if="mode === 'QR'"
        ref="qrcode"
        :box="box"
        :exporter="exporter"
        :initData="shareData"
        @generating="generating"
        @exportReady="exportReady"
      )

      button.button(v-if="hasGenerateList" @click="historyModalVisible=true")
        span.icon
          i.fa.fa-calendar-day(aria-hidden="true")
        span История

      HistoryModal(
        v-if="historyModalVisible"
        :isActive="historyModalVisible"
        :store="storeGenerate"
        title="История"
        @close="historyModalVisible=false"
      )

    .column
      .columns
        .column
          p.title {{$t('preview')}}
          p.subtitle {{ $t("controlsHint") }}
        .column
          //.field.has-addons
            .control
              span.button
                input.checkbox(type='checkbox' v-model='autoRotation')
            .control
              span.button.is-static.is-small {{$t('autoRotation')}}

      .mb-5(id="container3d" :class="{ 'is-loading': isGenerating }")


      .panel(v-if="expSettings.active")
        .panel-heading {{$t('expSettings')}}
        .panel-block
          .columns
            .column.is-half
              Export(:expSettings="expSettings")

            .column.is-half
              button.button.export-button.is-primary.is-medium(@click="exportSTL")
                span.icon
                  i.fa.fa-cube
                span {{$t('expStlButton')}}
              //button.button.export-button.is-primary.is-medium(@click="renderPNG")
                span.icon
                  i.fa.fa-image
                span {{$t('expPngButton')}}

      ExportList(:store="storeExport" title="История загрузок")

      ExportModal(v-if="exportModalVisible" :isActive="exportModalVisible" @close="exportModalVisible=false")
</template>

<script>
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import ExportModal from '../generator/ExportModal.vue';
import QRCodeMenu from '../generator/QRCodeMenu.vue';
import { saveAsArrayBuffer, trimCanvas } from '@/utils';
import {Box} from "@/v3d/box";
import Export from "@/components/forms/Export.vue";
import {useShareHash} from "@/service/shareHash";
import {useExportList} from "@/store/exportList";
import {Share} from "@/entity/share";
import ExportList from "@/components/generator/ExportList.vue";
import {BaseRotation} from "@/v3d/animation/baseRotation";
import {useGenerateList} from "@/store/generateList";
import HistoryModal from "@/components/generator/HistoryModal.vue";

const shareHash = useShareHash()
const exportList = useExportList()
const generateList = useGenerateList()
const box = new Box({debug: false, animation: new BaseRotation()})
box.createScene()

export default {
  name: 'Main',
  components: {
    HistoryModal,
    ExportList,
    Export,
    QRCodeMenu,
    ExportModal,
  },
  data() {
    return {
      mode: 'QR',
      expSettings: {
        active: false,
        type: 'binary',
        multiple: false,
      },
      box: undefined,
      autoRotation: false,
      changelogModalVisible: false,
      // changelog: changelog.split('\n').slice(3).join('\n'),
      changelog: '',
      historyModalVisible: false,
      exportModalVisible: false,
      shareData: null,
      storeExport: null,
      storeGenerate: null,
      hasGenerateList: false,
      isGenerating: false,
      exporter: null,
      scene: null,
      camera: null,
      renderer: null,
      grid: null,
      addedMeshes: [],
    };
  },
  created() {
    this.parseUrlShareHash()
    this.fillExportList()
    this.fillGenerateList()
    this.box = box
    this.storeExport = exportList
    this.storeGenerate = generateList
  },
  mounted() {
    this.initScene()
    this.startAnimation()
    this.exporter = new STLExporter()
  },
  methods: {
    initScene() {
      const container = document.getElementById('container3d')

      this.camera = box.createCamera(container.clientWidth, container.clientHeight)
      this.renderer = box.createRenderer(container.clientWidth, container.clientHeight, window.devicePixelRatio)

      box.createControl()
      container.appendChild(this.renderer.domElement)

    },
    generating() {
      this.isGenerating = true
    },
    startAnimation() {
      const animate = (time) => {
        time *= 0.001
        box.animate(this.autoRotation, time)
        box.render()
        requestAnimationFrame(animate)
      };
      requestAnimationFrame(animate)
    },
    exportSTL() {
      this.exportModalVisible = true
      this.autoRotation = false

      setTimeout(() => {
        this.$refs.qrcode.exportSTL(this.expSettings.type, this.expSettings.multiple)
      }, 5000);
    },
    renderPNG() {
      this.exportModalVisible = true;
      setTimeout(() => {
        const container = document.getElementById('container3d');
        // remove grid from scene
        this.scene.remove(this.grid);
        // remove background color
        this.scene.background = null;
        // make background transparent
        this.renderer.setClearColor(0x000000, 0);
        // set camera to be orthographic for 2D rendering, set position to center and zoom in
        this.camera = new THREE.OrthographicCamera(
          container.clientWidth / -2,
          container.clientWidth / 2,
          container.clientHeight / 2,
          container.clientHeight / -2,
          1,
          10000,
        );
        this.camera.position.set(0, 0, 100);
        this.camera.zoom = 2;
        this.camera.updateProjectionMatrix();
        // scale to 3x resolution
        this.renderer.setPixelRatio(window.devicePixelRatio * 3);
        this.renderer.setSize(container.clientWidth, container.clientHeight);

        // render scene
        this.renderer.render(this.scene, this.camera);

        // renders three.js scene to PNG and triggers download
        const canvas = this.renderer.domElement;
        // copy canvas to new temporary canvas
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(canvas, 0, 0);
        trimCanvas(tempCanvas).toBlob((blob) => {
          const filename = `image-${new Date().getTime()}.png`;
          // write to temp
          setTimeout(() => {
            saveAsArrayBuffer(blob, filename);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }, 4000);
        });
      }, 1000);
    },
    parseUrlShareHash() {
      if (shareHash.shareIsValid(window.location.hash)) {
        try {
          this.shareData = shareHash.parse(window.location.hash)
        } catch (error) {
          this.shareData = null
          console.error('Invalid Sharing URL')
          window.location.hash = ''
        }
      }
    },
    fillExportList() {
      const list = JSON.parse(window.localStorage.getItem(exportList.keyStore)) || []
      const collection = list.map((item) => {
        return new Share(item)
      })
      exportList.fillCollection(collection)
      exportList.setCallback((collection) => {
        window.localStorage.setItem(exportList.keyStore, JSON.stringify(collection))
      })
    },
    fillGenerateList() {
      const list = JSON.parse(window.sessionStorage.getItem(generateList.keyStore)) || []
      const collection = list.map((item) => {
        return new Share(item)
      })
      this.hasGenerateList = collection.length > 0
      generateList.fillCollection(collection)
      generateList.setCallback((collection) => {
        window.sessionStorage.setItem(generateList.keyStore, JSON.stringify(collection))
      })
    },
    exportReady(options) {
      this.expSettings.active = true
      this.hasGenerateList = true
      try {
        window.location.hash = shareHash.create(options)
      } catch (error) {
        console.error(error)
      } finally {
        this.isGenerating = false
      }
    },
  },

}
</script>

<style>

#container3d {
  width: 100%;
  height: 600px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  opacity: 1;
}

#container3d.is-loading {
  animation: breathing 2s linear infinite;
}

@keyframes breathing {
  0% {
    opacity: 0.3;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.3;
  }
}

.export-button {
  margin: 0 10px;
}

#mode-buttons>button {
  margin-right: 20px;
}

.highlight {
  position: relative;
  display: inline-block;
  overflow: visible;
}

.highlight>.highlight-text {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 0 5px;
  background-color: hsl(348, 100%, 61%);
  color: #fff;
  font-weight: bold;
  border-radius: 3px;
  z-index: 30;
}

div.share-button-shake {
  position:fixed;
  left:15%;
  top:0;
  z-index:100;
}

.share-button-shake .shake-vertical {
  animation: shake-vertical 2s linear infinite;
}

@keyframes shake-vertical {
  0%, 40%{transform: translateY(0)}
  10%{transform: translateY(2px)}
  30%{transform: translateY(-5px)}
}
</style>
