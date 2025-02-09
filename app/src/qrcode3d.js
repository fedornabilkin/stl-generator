import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import BaseTag3D from './base';
import { getRoundedRectShape, getBoundingBoxSize, subtractMesh } from './utils';
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";

/**
 * Class used for generating the 3D model from a bitmask that contains the QR Code Data.
 * qrCodeBitmask must be a square number (QR Code of dimensions 21x21 => Bitmask of length 441 (21*21)).
 */
class QRCode3D extends BaseTag3D {
  constructor(qrCodeBitmask, options) {
    super(options)
    this.bitMask = qrCodeBitmask
  }

  /**
   * @return {THREE.Mesh} the mesh of the actual QR-Code segment
   */
  getQRCodeMesh() {
    if (!this.options.code.active) {
      return undefined
    }

    this.maskWidth = Math.sqrt(this.bitMask.length)
    this.xCountPosition = this.maskWidth
    this.yCountPosition = this.maskWidth
    this.blockWidth = (this.availableWidth / this.maskWidth) * (this.options.code.blockSizeMultiplier / 100)

    const geometry = new THREE.Geometry()
    const mesh = new THREE.Mesh(geometry, this.materialDetail)
    let bspQRMesh = CSG.fromMesh(mesh)

    // if icon
    const safetyMargin = Math.min(this.blockWidth * 1.5, 4)
    let iconSize = {x: 20, y: 20}
    if (this.options.icon.active && this.iconMesh) {
      iconSize = getBoundingBoxSize(this.iconMesh)
    }

    // iterate through pixels in QR Code Bitmask
    for (let x = 0; x < this.maskWidth; x++) {
      for (let y = 0; y < this.maskWidth; y++) {
        const isBlack = !!this.bitMask[y * this.maskWidth + x]
        if (isBlack) {
          // if pixel is black create a block
          let blockDepth = this.options.code.depth;
          if (this.options.code.cityMode) {
            blockDepth = Math.min(this.options.code.depth, this.options.code.depthMax) + Math.random() * Math.abs(this.options.code.depthMax - this.options.code.depth)
          }

          const meshBlock = this.createMeshBlock(this.blockWidth, this.blockWidth, blockDepth)

          const posX = this.correctPositionX(this.availableWidth, this.xCountPosition, this.blockWidth, x)
          let posY = this.correctPositionY(this.availableWidth, this.yCountPosition, this.blockWidth, y)
          const posZ = this.correctPositionZ(this.options.base.depth, blockDepth)

          if (this.options.icon.active && this.iconMesh) {
            if ((posX > -iconSize.x / 2 - safetyMargin
              && posX < iconSize.x / 2 + safetyMargin)
              && (posY > -iconSize.y / 2 - safetyMargin
              && posY < +iconSize.y / 2 + safetyMargin)
            ) {
              continue
            }
          }

          // add qr code blocks to qrcode and combined model
          meshBlock.position.set(posX, posY, posZ)
          meshBlock.updateMatrix()

          const bspBlockMesh = CSG.fromMesh(meshBlock)
          bspQRMesh = bspQRMesh.union(bspBlockMesh)
        }
      }
    }

    const finalBlockMesh = CSG.toMesh(bspQRMesh, mesh.matrix)
    finalBlockMesh.material = this.materialDetail

    if (this.options.base.width < this.options.base.height) {
      finalBlockMesh.position.y = (this.options.base.height - this.options.base.width) / 2
    }

    if (this.options.code.invert) {
      const cornerRadius = this.getCornerRadius();
      const textBaseOffset = this.getTextBaseOffset();
      const topOffset = this.getTextTopOffset();
      const leftOffset = this.getTextLeftOffset();
      const isOffsetTopBottom = this.options.base.textPlacement === 'top' || this.options.base.textPlacement === 'bottom' || this.options.base.textPlacement === 'center';
      const isOffsetLeftRight = this.options.base.textPlacement === 'left' || this.options.base.textPlacement === 'right';

      // const innerAreaShape = getRoundedRectShape(
      //   -(this.options.base.width + topOffset - this.options.base.borderWidth * 2) / 2,
      //   -(this.options.base.width - this.options.base.borderWidth * 2) / 2,
      //   this.options.base.width + textBaseOffset - this.options.base.borderWidth * 2,
      //   this.options.base.width - this.options.base.borderWidth * 2,
      //   Math.max(0, cornerRadius - this.options.base.borderWidth),
      // );
      let innerAreaShape;
      if (isOffsetTopBottom) {
        innerAreaShape = getRoundedRectShape(
          -(this.options.base.height + topOffset - this.options.base.borderWidth * 2) / 2,
          -(this.options.base.width - this.options.base.borderWidth * 2) / 2,
          this.options.base.height + textBaseOffset - this.options.base.borderWidth * 2,
          this.options.base.width - this.options.base.borderWidth * 2,
          Math.max(0, cornerRadius - this.options.base.borderWidth),
        );
      } else if (isOffsetLeftRight) {
        innerAreaShape = getRoundedRectShape(
          -(this.options.base.height - this.options.base.borderWidth * 2) / 2,
          -(this.options.base.width + leftOffset - this.options.base.borderWidth * 2) / 2,
          this.options.base.height - this.options.base.borderWidth * 2,
          this.options.base.width + textBaseOffset - this.options.base.borderWidth * 2,
          Math.max(0, cornerRadius - this.options.base.borderWidth),
        );
      }

      const innerAreaMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(innerAreaShape, {
        steps: 1,
        depth: this.options.code.depth,
        bevelEnabled: false,
      }), this.materialDetail);
      innerAreaMesh.position.z = 0;
      innerAreaMesh.updateMatrix();

      finalBlockMesh.position.z = -this.options.base.depth;
      finalBlockMesh.updateMatrix();

      const invertedMesh = subtractMesh(innerAreaMesh, finalBlockMesh);
      invertedMesh.position.z = this.options.base.depth;
      invertedMesh.updateMatrix();
      return invertedMesh;
    }

    return finalBlockMesh
  }

  /**
   * @param w
   * @param h
   * @param d
   * @returns {THREE.Mesh}
   */
  createMeshBlock(w, h, d) {
    const geometry = new THREE.BoxGeometry(w, h, d)
    return new THREE.Mesh(geometry, this.materialDetail)
  }

  /**
   * @param width {number}
   * @param countPosition {number}
   * @param widthBlock {float}
   * @param current {number}
   * @returns {number}
   */
  correctPositionX(width, countPosition, widthBlock, current) {
    // Допустимую ширину делим на количество позиций в маске и умножаем на текущую позицию
    let position = width / countPosition * current
    // Смещаем влево на половину допустимой ширины и еще на половину ширины блока
    position -= width / 2 - widthBlock / 2
    return position
  }

  /**
   * @param height {number}
   * @param countPosition {number}
   * @param widthBlock {float}
   * @param current {number}
   * @returns {number}
   */
  correctPositionY(height, countPosition, widthBlock, current) {
    // От допустимой высоты отнимаем допустимую высоту, деленную на количество позиций в маске и умноженную на текущую позицию
    let position = height - height / countPosition * current
    // Смещаем вниз на половину допустимой высоты и поднимаем вверх на половину ширины блока
    position -= height / 2 + widthBlock / 2
    return position
  }

  /**
   * @param depth {number}
   * @param addon {number}
   * @returns {number}
   */
  correctPositionZ(depth, addon = 0) {
    return depth + addon / 2
  }

  /**
   * Returns one merged mesh of all part meshes
   */
  getCombinedMesh() {
    const baseCombinedGeometry = super.getCombinedMesh().geometry;
    if (!this.qrcodeMesh) {
      return new THREE.Mesh(baseCombinedGeometry, this.materialBase);
    }

    baseCombinedGeometry.merge(this.qrcodeMesh.geometry, this.qrcodeMesh.matrix);
    if (this.iconMesh && !this.options.code.invert) {
      baseCombinedGeometry.merge(this.iconMesh.geometry, this.iconMesh.matrix);
    }
    return new THREE.Mesh(baseCombinedGeometry, this.materialBase)
  }

  /**
   * Generates all required meshes of the 3D model and combines them
   */
  generate3dModel() {
    super.generate3dModel()

    if (this.options.code.iconName !== 'none') {
      this.iconMesh = this.getIconMesh();
    }

    this.qrcodeMesh = this.getQRCodeMesh();

    if (this.options.code.invert) {
      if (this.subtitleMesh) {
        this.qrcodeMesh = subtractMesh(this.qrcodeMesh, this.subtitleMesh);
      }
      if (this.iconMesh) {
        this.qrcodeMesh = subtractMesh(this.qrcodeMesh, this.iconMesh);
      }
    } else if (this.iconMesh) {
      this.exportedMeshes.icon = this.iconMesh;
    }

    this.exportedMeshes.qrcode = this.qrcodeMesh;
    this.exportedMeshes.combined = this.getCombinedMesh();
  }
}

export default QRCode3D;
