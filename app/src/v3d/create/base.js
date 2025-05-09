/**
 * Strategy create model
 */
class Base {
  collectMesh = {}

  addMesh(name, mesh) {
    if(mesh) {
      this.collectMesh[name] = mesh
    }
  }

  getCollectMesh() {
    return this.collectMesh
  }

  create(generator) {
    this.addMesh('base', generator.getBaseMesh())
    this.addMesh('border', generator.getBorderMesh())
    this.addMesh('keychain', generator.getKeychainMesh())
  }

}

/**
 * @deprecated
 */
export class TextModel extends Base {

  create(generator) {
    super.create(generator)
    this.addMesh('text', generator.getTextMesh())
  }
}

export class QRCodeModel extends Base {

  create(generator) {
    super.create(generator)
    this.addMesh('icon', generator.getIconMesh())
    generator.getQRCodeMesh()
    this.addMesh('text', generator.getTextMesh())
  }
}
