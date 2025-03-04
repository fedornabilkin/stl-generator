export class Entity {
  active = false

  constructor(config = {}) {
    Object.assign(this, config)
  }

  change() {
    console.log(this)
  }
}

export class Base extends Entity {
  active = true
  shape = 'roundedRectangle'
  width = 100
  height = 100
  depth = 3
  cornerRadius = 5

  constructor(config = {}) {
    super(config)
    Object.assign(this, config)
  }
}

export class Border extends Entity {
  width = 1
  depth = 1

  constructor(config = {}) {
    super(config)
    Object.assign(this, config)
  }
}

export class Code extends Entity {
  depth = 1
  margin = 2
  cityMode = false
  depthMax = 2
  errorCorrectionLevel = 'M'
  invert = false
  block = {
    ratio: 100,
    cityMode: false,
    depth: 2,
    shape: 'classic',
  }
  preview = {
    src: undefined,
    htmlId: 'qr-image-preview'
  }

  constructor(config = {}) {
    super(config)
    Object.assign(this, config)
  }

  clearPreview() {
    this.preview.src = undefined
  }

  eventActive() {
    if (!this.active) {
      this.clearPreview()
    }
  }
}

export class Text extends Entity {
  message = ''
  placement = 'center'
  align = 'center'
  margin = 1
  size = 8
  height = 10
  depth = 1

  constructor(config = {}) {
    super(config)
    Object.assign(this, config)
  }
}

export class Icon extends Entity {
  name = 'none'
  ratio = 20
  inverted = false
  offsetX = 0
  offsetY = 0
  data = undefined
  src = undefined
  srcCustom = undefined
  htmlId = 'icon-preview'
  temp = {
    src: undefined,
    srcCustom: undefined
  }

  constructor(config = {}) {
    super(config)
    Object.assign(this, config)
  }

  setSrc(src) {
    this.src = src
  }

  setSrcCustom(src) {
    this.srcCustom = src
  }

  clearSrc() {
    this.temp.src = this.src ? this.src : this.temp.src
    this.src = undefined
  }

  clearSrcCustom() {
    this.temp.srcCustom = this.srcCustom ? this.srcCustom : this.temp.srcCustom
    this.srcCustom = undefined
  }

  restoreSource() {
    this.setSrc(this.temp.src)
    this.setSrcCustom(this.temp.srcCustom)
  }

  clearSource() {
    this.name = 'none'
    this.clearSrc()
    this.clearSrcCustom()
  }

  eventActive() {
    if (!this.active) {
      this.clearSource()
    }
    if (this.active) {
      this.restoreSource()
    }
  }
}

export class Keychain extends Entity {
  placement = 'left'
  holeDiameter = 6
  mirror = false

  constructor(config = {}) {
    super(config)
    Object.assign(this, config)
  }
}

export class Magnet extends Entity {
  shape =  'round'
  size =  10
  depth =  1
  hidden =  false

  constructor(config = {}) {
    super(config)
    Object.assign(this, config)
  }
}
