import * as THREE from 'three';
import fontInterSemiBold from './assets/fonts/Inter_SemiBold.json';
import fontInterSemiBoldItalic from './assets/fonts/Inter_SemiBold_Italic.json';
import fontInterExtraBold from './assets/fonts/Inter_ExtraBold.json';
import fontInterExtraBoldItalic from './assets/fonts/Inter_ExtraBold_Italic.json';
import {subtractMesh, unionMesh, getBoundingBoxSize} from './utils';
import {RectangleRoundedCornerShape, RectangleRoundedShape} from "@/v3d/primitives/shape";
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";

const LINE_HEIGHT = 1.5
const lineSpacing = 2

class BaseTag3D {

  collectMesh = {}

  constructor(options) {
    const defaultOptions = {
      baseColor: 0xffffff,
      qrcodeColor: 0x000000,
    };

    this.options = { ...defaultOptions, ...options }

    // default material for the base
    this.materialBase = new THREE.MeshPhongMaterial({
      color: this.options.baseColor,
    });
    // default material for qr code, border, etc.
    this.materialDetail = new THREE.MeshPhongMaterial({
      color: this.options.qrcodeColor,
    });

    // total available width without margin and borders for the inner part
    this.availableWidth = this.options.base.width - 2 * this.options.code.margin;
    if (this.options.border.active) {
      // subtract border width
      this.availableWidth -= 2 * this.options.border.width
    }

    this.iconMesh = null
    // reset meshes
    this.baseMesh = null;
    this.borderMesh = null;
    this.subtitleMesh = null;
    this.keychainAttachmentMesh = null;
    this.combinedMesh = null;
    this.exportedMeshes = {}
    this.collectMesh = {}

    console.log('options', options)
  }

  createMaterial(color) {
    return new THREE.MeshBasicMaterial({
      color: color,
    })
  }

  /**
   * @return {THREE.Mesh|undefined} the mesh of the base
   */
  getBaseMesh() {
    if (!this.options.base.active) {
      return undefined
    }

    const shape = new RectangleRoundedShape({
      x: -this.options.base.width / 2,
      y: -this.options.base.height / 2,
      r: this.options.base.cornerRadius,
      w: this.options.base.width,
      h: this.options.base.height,
    })

    const model = new THREE.ExtrudeGeometry(shape.create(), {
      steps: 1,
      depth: this.options.base.depth,
      bevelEnabled: false,
    })

    let baseMesh = new THREE.Mesh(model, this.materialBase)
    baseMesh.updateMatrix()

    if (this.options.magnet.active) {
      const width = this.options.magnet.size
      const height = this.options.magnet.size
      const depth = this.options.magnet.depth

      let holeMesh;
      if (this.options.magnet.shape === 'round') {
        const geometryMagnet = new THREE.CylinderGeometry(width / 2, height / 2, depth, 32)
        holeMesh = new THREE.Mesh(geometryMagnet, this.materialBase)
        holeMesh.rotation.x = -Math.PI / 2
      } else {
        // shape = square
        const geometryMagnet = new THREE.BoxGeometry(width, height, depth)
        holeMesh = new THREE.Mesh(geometryMagnet, this.materialBase)
      }
      holeMesh.position.z = depth / 2
      if (this.options.magnet.hidden) {
        holeMesh.position.z += 1
      }

      holeMesh.position.x = baseMesh.position.x
      holeMesh.updateMatrix()

      baseMesh = subtractMesh(baseMesh, holeMesh)
      baseMesh.updateMatrix()
    }

    return baseMesh
  }

  /**
   * @return {THREE.Mesh|undefined} the mesh of the text
   */
  getTextMesh() {
    if (!this.options.text.active) {
      return undefined
    }
    const textGeometry = new THREE.Geometry();

    const correctText = (text) => {
      let font = new THREE.Font(fontInterSemiBold)
      if (text.startsWith('*') && text.endsWith('*')) {
        font = new THREE.Font(fontInterSemiBoldItalic)
        text = text.slice(1, -1)
      }
      if (text.startsWith('**') && text.endsWith('**')) {
        font = new THREE.Font(fontInterExtraBold)
        text = text.slice(2, -2)
      }
      if (text.startsWith('***') && text.endsWith('***')) {
        font = new THREE.Font(fontInterExtraBoldItalic)
        text = text.slice(3, -3)
      }
      return {text, font}
    }

    const textLines = this.options.text.message.trim().split('\n')
    let numLines = textLines.length
    this.options.text.height = (this.options.text.size + this.options.text.margin) * numLines + lineSpacing * (numLines - 1) - this.options.text.margin

    for (let i = 0; i < numLines; i++) {
      const {text, font} = correctText(textLines[i])

      const tempTextGeometry = new THREE.TextGeometry(text, {
        font: font,
        size: this.options.text.size,
        height: this.options.text.depth,
      })
      const subtitleMesh = new THREE.Mesh(tempTextGeometry, this.materialDetail)
      const textSize = getBoundingBoxSize(subtitleMesh)

      const lineSpacingCurrent = (i < numLines && numLines > 1 ) ? lineSpacing : 0
      const oneHeight = this.options.text.size + lineSpacingCurrent
      const posBase = this.options.text.height - oneHeight * i
      let posY = posBase - this.options.text.size
      const alignment = -textSize.x / 2

      subtitleMesh.position.set(alignment, posY, this.options.base.depth)

      subtitleMesh.updateMatrix()
      textGeometry.merge(subtitleMesh.geometry, subtitleMesh.matrix)
    }

    const mesh = new THREE.Mesh(textGeometry, this.materialDetail)
    mesh.position.y = -this.options.text.height / 2

    if (this.options.code.active && this.options.base.width < this.options.base.height) {
      mesh.position.y = this.options.base.height / 2 - this.options.base.width - this.options.text.height
    }

    mesh.updateMatrix()
    return mesh
  }

  /**
   * @return {THREE.Mesh|undefined} the mesh of the border
   */
  getBorderMesh() {
    if (!this.options.border.active) {
      return undefined
    }
    let shape = new RectangleRoundedShape({
      x: -this.options.base.width / 2,
      y: -this.options.base.height / 2,
      r: this.options.base.cornerRadius,
      w: this.options.base.width,
      h: this.options.base.height,
    })

    const model = new THREE.ExtrudeGeometry(shape.create(), {
      steps: 1,
      depth: this.options.border.depth,
      bevelEnabled: false,
    })

    const mesh = new THREE.Mesh(model, this.materialDetail)

    const shapeHole = new RectangleRoundedShape({
      x: -(this.options.base.width - this.options.border.width * 2) / 2,
      y: -(this.options.base.height - this.options.border.width * 2) / 2,
      r: this.options.base.cornerRadius,
      w: (this.options.base.width - this.options.border.width * 2),
      h: (this.options.base.height - this.options.border.width * 2),
    })

    const modelHole = new THREE.ExtrudeGeometry(shapeHole.create(), {
      steps: 1,
      depth: this.options.border.depth,
      bevelEnabled: false,
    })

    const meshHole = new THREE.Mesh(modelHole, this.materialDetail)

    const meshFrame = subtractMesh(mesh, meshHole)
    meshFrame.position.z = this.options.base.depth
    meshFrame.updateMatrix()

    return meshFrame
  }

  /**
   * @return {THREE.Mesh|undefined} the mesh of the keychain attachment hole
   */
  getKeychainMesh() {
    if (!this.options.keychain.active) {
      return undefined
    }
    const holeRadius = this.options.keychain.holeDiameter / 2
    const keyChainBorder = 3
    const height = this.options.keychain.holeDiameter + keyChainBorder
    const width = this.options.keychain.holeDiameter + keyChainBorder

    const shape = new RectangleRoundedCornerShape({
      x: -width / 2,
      y: -height / 2,
      rA: 0,
      rB: 0,
      rC: height / 2,
      rD: height / 2,
      w: width,
      h: height,
    })

    const model = new THREE.ExtrudeGeometry(shape.create(), {
      steps: 1,
      depth: this.options.base.depth,
      bevelEnabled: false,
    })

    const mesh = new THREE.Mesh(model, this.materialBase)
    mesh.position.z = 0
    mesh.updateMatrix()

    const modelHole = new THREE.CylinderGeometry(holeRadius, holeRadius, this.options.base.depth, 32)
    const meshHole = new THREE.Mesh(modelHole, this.materialBase)

    meshHole.rotation.x = -Math.PI / 2
    meshHole.position.z = this.options.base.depth / 2
    meshHole.position.x = 0
    meshHole.position.y = 0
    meshHole.updateMatrix()

    let finalMesh = subtractMesh(mesh, meshHole)
    let x = -this.options.base.width / 2 - width / 2 + keyChainBorder / 2
    let y = finalMesh.position.y
    let zR = -Math.PI / 2

    if (this.options.keychain.placement === 'top') {
      x = finalMesh.position.x
      y = this.options.base.height / 2 + height / 2 - keyChainBorder / 2
      zR = -Math.PI
    }
    if (this.options.keychain.placement === 'topLeft') {
      y = this.options.base.height / 2 + height / 2 - keyChainBorder * 1.5
      x = -this.options.base.width / 2 - width / 2 + keyChainBorder * 1.5
      zR = -Math.PI / 4 + -Math.PI / 2
    }

    finalMesh.position.y = y
    finalMesh.position.x = x
    finalMesh.rotation.z = zR
    finalMesh.updateMatrix()

    if (this.options.keychain.mirror) {
      const mirror = subtractMesh(mesh, meshHole)
      if (this.options.keychain.placement === 'left') {
        x = -x
        zR = zR + Math.PI
      } else if (this.options.keychain.placement === 'top') {
        y = -y
        zR = zR + Math.PI
      } else if (this.options.keychain.placement === 'topLeft') {
        x = -x
        y = -y
        zR = zR + Math.PI
      }

      mirror.position.y = y
      mirror.position.x = x
      mirror.rotation.z = zR
      mirror.updateMatrix()

      finalMesh = unionMesh(finalMesh, mirror)
    }

    return finalMesh
  }

  /**
   * @return {THREE.Mesh|undefined} the 3D mesh of the icon
   */
  getIconMesh() {
    if (!this.options.icon.active) {
      return undefined
    }

    const svgLoader = new SVGLoader()
    const svgData = svgLoader.parse(this.options.icon.src)
    const shapesS = svgData.paths.map((p) => p.toShapes(true, true)).flat()
    const shapesX = shapesS.map((s) => s.toJSON())

    const iconGeometry = new THREE.Geometry();
    const shapes = shapesX.map((sj) => new THREE.Shape().fromJSON(sj));
    // Each path has array of shapes
    shapes.forEach((shape) => {
      // Finally we can take each shape and extrude it
      const pathGeometry = new THREE.ExtrudeGeometry(shape, {
        steps: 1,
        depth: this.options.code.depth,
        bevelEnabled: false,
      });

      const pathMesh = new THREE.Mesh(pathGeometry, this.materialDetail);
      pathMesh.position.set(0, 0, 0)
      pathMesh.updateMatrix()
      iconGeometry.merge(pathMesh.geometry, pathMesh.matrix);
    });

    const iconMesh = new THREE.Mesh(iconGeometry, this.materialDetail);

    // scale icon to correct size
    let iconSize = getBoundingBoxSize(iconMesh);

    const iconSizeRatio = this.options.icon.ratio / 100;
    const scaleRatioY = iconSize.y / (this.availableWidth * iconSizeRatio);
    const scaleRatioX = iconSize.x / (this.availableWidth * iconSizeRatio);

    const scaleRatio = scaleRatioX > scaleRatioY ? scaleRatioX : scaleRatioY;
    iconMesh.scale.x /= scaleRatio;
    iconMesh.scale.y /= scaleRatio;
    iconMesh.rotation.x = Math.PI;

    // move icon to center
    iconSize = getBoundingBoxSize(iconMesh)

    iconMesh.position.x = -iconSize.x / 2
    iconMesh.position.y = iconSize.y / 2
    iconMesh.position.z = this.options.base.depth + this.options.code.depth
    iconMesh.updateMatrix()

    if (this.options.code.active && this.options.base.width < this.options.base.height) {
      iconMesh.position.y += (this.options.base.height - this.options.base.width) / 2
      iconMesh.updateMatrix()
    }

    this.iconMesh = iconMesh

    return iconMesh
  }

  /**
   * @deprecated
   * @returns {number|string|number|*}
   */
  getCornerRadius() {
    if (this.options.base.shape === 'roundedRectangle') {
      return this.options.base.cornerRadius;
    }
    return 0;
  }

  /**
   * @deprecated
   * Returns the offset of the text in the 3D model
   */
  getTextBaseOffset() {
    if (this.options.base.hasText) {
      if (this.options.base.textPlacement === 'top' || this.options.base.textPlacement === 'bottom') {
        const numLines = this.options.base.textMessage.trim().split('\n').length;
        return (this.options.base.textSize * numLines * LINE_HEIGHT) + (2 * this.options.base.textMargin);
      }
      if (this.options.base.textPlacement === 'left') {
        return this.getTextRenderWidth() + (2 * this.options.base.textMargin);
      }
      if (this.options.base.textPlacement === 'right') {
        return this.getTextRenderWidth() + (2 * this.options.base.textMargin);
      }
    }
    return 0;
  }

  /**
   * @deprecated
   * Returns the size of the rendered text in the 3D model
   * used in getTextMesh to calculate the line breaks
   */
  getTextRenderWidth() {
    if (!this.options.base.hasText) {
      return 0;
    }

    const textLines = this.options.base.textMessage.trim().split('\n');
    const numLines = textLines.length;

    let maxWidth = 0;
    for (let i = 0; i < numLines; i += 1) {
      let text = textLines[i];
      let emphLevel = 0;
      while (text[0] === '*' && text[text.length - 1] === '*') {
        text = text.substr(1, text.length - 2);
        emphLevel += 1;
        if (emphLevel === 3) {
          break;
        }
      }

      let subtitleMesh = null;
      let textSize = null;

      const tempTextGeometry = new THREE.TextGeometry(text, {
        font: new THREE.Font(fontInterSemiBold),
        size: this.options.base.textSize,
        height: this.options.base.textDepth,
      });
      subtitleMesh = new THREE.Mesh(tempTextGeometry, this.materialDetail);
      textSize = getBoundingBoxSize(subtitleMesh);
      // Check if text width is larger than available width
      // if true snip off the last character one at a time until it fits
      if (textSize.x > maxWidth) {
        maxWidth = textSize.x;
      }
    }

    return maxWidth;
  }

  /**
   * @deprecated
   * @returns {number}
   */
  getTextTopOffset() {
    if (this.options.base.textPlacement === 'top') {
      return 2 * this.getTextBaseOffset() - 0.1; // TODO: does not work without the -0.1. Find out what's wrong here.
    }
    return 0;
  }

  /**
   * @deprecated
   * @returns {number}
   */
  getTextLeftOffset() {
    if (this.options.base.textPlacement === 'left') {
      return 2 * this.getTextBaseOffset();
    }
    if (this.options.base.textPlacement === 'right') {
      return 0;
    }
    return 0;
  }

  combined(collection) {
    const combined = new THREE.Geometry()
    for (const key in collection) {
      if (key === 'qr') {
        for (const mesh of collection[key].children) {
          combined.merge(mesh.geometry, mesh.matrix)
        }
      }
      else {
        combined.merge(collection[key].geometry, collection[key].matrix)
      }
    }
    return new THREE.Mesh(combined, this.materialBase)
  }

  /**
   * Returns a list of meshes of all modelled parts
   * @deprecated
   */
  getPartMeshes() {
    return this.exportedMeshes;
  }

  /**
   * Returns one merged mesh of all part meshes
   * @deprecated
   */
  getCombinedMesh() {
    const combinedGeometry = new THREE.Geometry();
    combinedGeometry.merge(this.baseMesh.geometry, this.baseMesh.matrix);

    if (this.borderMesh) {
      combinedGeometry.merge(this.borderMesh.geometry, this.borderMesh.matrix);
    }

    if (this.subtitleMesh && !this.options.code.invert) {
      combinedGeometry.merge(this.subtitleMesh.geometry, this.subtitleMesh.matrix);
    }

    if (this.keychainAttachmentMesh) {
      combinedGeometry.merge(this.keychainAttachmentMesh.geometry, this.keychainAttachmentMesh.matrix)
    }

    return new THREE.Mesh(combinedGeometry, this.materialBase)
  }

  /**
   * Generates all required meshes of the 3D model
   * @deprecated
   */
  generate3dModel() {
    if (this.options.base.hasText) {
      this.subtitleMesh = this.getTextMesh()
      if (!this.options.code.invert) {
        this.exportedMeshes.subtitle = this.subtitleMesh
      }
    }

    this.baseMesh = this.getBaseMesh()
    this.exportedMeshes.base = this.baseMesh
    if (this.options.border.active) {
      this.borderMesh = this.getBorderMesh()
      this.exportedMeshes.border = this.borderMesh
    }

    if (this.options.base.hasKeychainAttachment) {
      this.keychainAttachmentMesh = this.getKeychainMesh(this.baseMesh)
      this.exportedMeshes.keychainAttachment = this.keychainAttachmentMesh
    }

    this.exportedMeshes.combined = this.getCombinedMesh()
  }
}

export default BaseTag3D
