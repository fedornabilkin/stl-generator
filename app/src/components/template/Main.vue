<template lang="pug">
div.container.is-fluid(id="main")
  div.columns.is-multiline
    div.column.is-6-widescreen.is-6-fullhd.is-12
      h1.title {{ $t("title") }}
      //h2.subtitle {{ $t("subtitle") }}
      //div(id="mode-buttons")
        //button.button.is-large(:class="{'is-primary': mode === 'QR'}" @click="changeMode('QR')")
        //  span.icon.is-medium
        //    i.fa.fa-qrcode
        //  span QR Code
        //button.button.is-large(:class="{'is-primary': mode === 'Spotify'}" @click="changeMode('Spotify')")
        //  span.icon.is-medium
        //    i.fab.fa-spotify
        //  span Spotify Code
        //button.button.is-large(:class="{'is-primary': mode === 'Text'}" @click="changeMode('Text')")
        //  span.icon.is-medium
        //    i.fa.fa-font
        //  span Text
      //hr

      QRCodeMenu(v-if="mode === 'QR'" ref="qrcode" :scene="scene" :exporter="exporter" :initData="shareData" @generating="generating" @exportReady="exportReady")
      //SpotifyMenu(v-if="mode === 'Spotify'" ref="spotifycode" :scene="scene" :exporter="exporter" :initData="shareData" @generating="generating" @exportReady="exportReady")
      //TextMenu(v-if="mode === 'Text'" ref="text" :scene="scene" :exporter="exporter" :initData="shareData" @generating="generating" @exportReady="exportReady")

    .column.is-6-widescreen.is-6-fullhd.is-12
      .columns
        .column
          p.title {{$t('preview')}}
          p.subtitle {{ $t("controlsHint") }}

      hr
      .has-text-centered(v-if="isGenerating")
        p.title {{$t('isGenerating')}}
        hr

      div(id="container3d" :class="{ 'is-loading': isGenerating }")

      hr

      .panel(v-if="expSettings.active")
        .panel-heading {{$t('expSettings')}}
        .panel-block
          .columns
            .column.is-11-widescreen.is-11-fullhd.is-12
              Export(:expSettings="expSettings")

            .column.is-10-widescreen.is-10-fullhd.is-12
              button.button.export-button.is-primary.is-medium(@click="exportSTL")
                span.icon
                  i.fa.fa-cube
                span {{$t('expStlButton')}}
              button.button.export-button.is-primary.is-medium(@click="renderPNG")
                span.icon
                  i.fa.fa-image
                span {{$t('expPngButton')}}


<!--    <PrintGuide />-->
<!--    <div.content container">-->
<!--      <h2.title">Changelog</h2>-->
<!--      <hr>-->
<!--      <vue-markdown :source="changelog".content"></vue-markdown>-->
<!--    </div>-->
<!--    <ChangelogModal v-if="changelogModalVisible"/>-->
      ExportModal(v-if="exportModalVisible" :isActive="exportModalVisible" @close="exportModalVisible=false")
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
// import VueMarkdown from 'vue-markdown';
// import changelog from 'raw-loader!../../../CHANGELOG.md';
import ChangelogModal from '../ChangelogModal.vue';
import ExportModal from '../ExportModal.vue';
import QRCodeMenu from '../QRCodeMenu.vue';
import PrintGuide from '../PrintGuide.vue';
import { getRandomBanner, saveAsArrayBuffer, trimCanvas } from '../../utils';
import { toRaw } from '@vue/reactivity'
import {Box} from "@/v3d/box";
import Export from "@/components/forms/Export.vue";

const shareHashMarker = '#share';

export default {
  name: 'Main',
  components: {
    Export,
    QRCodeMenu,
    PrintGuide,
    ChangelogModal,
    ExportModal,
    // VueMarkdown,
  },
  data() {
    return {
      mode: 'QR',
      expSettings: {
        active: false,
        type: 'binary',
        multiple: false,
      },
      stlType: 'binary',
      multipleParts: false,
      changelogModalVisible: false,
      // changelog: changelog.split('\n').slice(3).join('\n'),
      changelog: '',
      exportModalVisible: false,
      shareData: null,
      isGenerating: false,
      exporter: null,
      scene: null,
      camera: null,
      renderer: null,
      grid: null,
      mesh: null,
      addedMeshes: [],
    };
  },
  created() {
    // bus.$on('openChangelogModal', () => { this.changelogModalVisible = true; });
    // bus.$on('closeChangelogModal', () => { this.changelogModalVisible = false; });
    // bus.$on('openExportModal', () => { this.exportModalVisible = true; });
    // bus.$on('closeExportModal', () => { this.exportModalVisible = false; });

    this.parseUrlShareHash()
  },
  mounted() {
    this.initScene()
    this.startAnimation()
    this.exporter = new STLExporter()
    // this.exportModalVisible = true
  },
  methods: {
    changeMode(mode) {
      window.location.hash = ''
      this.shareData = null
      this.mode = mode
      this.clearScene()
    },
    initScene() {
      const container = document.getElementById('container3d')

      const box = new Box({debug: false})
      this.scene = box.createScene()
      this.camera = box.createCamera(container.clientWidth, container.clientHeight)
      this.renderer = box.createRenderer(container.clientWidth, container.clientHeight, window.devicePixelRatio)

      container.appendChild(this.renderer.domElement)
      const controls = new OrbitControls(this.camera, this.renderer.domElement)
      controls.target.set(0, 0, 0)
      controls.update()
    },
    clearScene() {
      for(const item of this.addedMeshes) {
        this.scene.remove(item)
      }
    },
    generating() {
      this.isGenerating = true
    },
    startAnimation() {
      const animate = () => {
        this.renderer.render(toRaw(this.scene), toRaw(this.camera))
        requestAnimationFrame(animate)
      };
      requestAnimationFrame(animate)
    },
    exportSTL() {
      this.exportModalVisible = true

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
      if (window.location.hash.startsWith(shareHashMarker)) {
        try {
          const rawShareData = window.location.hash.split('-')
          this.shareData = Object.assign(JSON.parse(atob(rawShareData[1])), {})
        } catch (error) {
          this.shareData = null
          console.error('Invalid Sharing URL')
          window.location.hash = ''
        }
      }
    },
    exportReady(options, meshes) {
      this.expSettings.active = true
      this.addedMeshes = meshes
      try {
        window.location.hash = `${shareHashMarker}-${btoa(JSON.stringify(options))}`
      } catch (error) {
        console.error(error)
      } finally {
        this.isGenerating = false
      }
      // bus.$emit('exportReady')
    },
  },

};
</script>

<style>
#main {
  margin-top: 20px;
  padding-bottom: 20px;
}

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

#notifications {
  margin-top: 10px;
}

.field-label {
  text-align: left !important;
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
  padding: 0px 5px;
  background-color: hsl(348, 100%, 61%);
  color: #fff;
  font-weight: bold;
  border-radius: 3px;
  z-index: 30;
}

.subsection {
  border-radius: 6px;
  background: #fbfbfb;
  border: 1px solid #ededed;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
