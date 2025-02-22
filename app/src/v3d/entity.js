class Entity {
  active = false

  constructor(config = {}) {
    Object.assign(this, config)
  }
}

export class Base extends Entity {
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
  name = 'border'
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
  data = undefined
  htmlId = 'icon-preview'

  constructor(config = {}) {
    super(config)
    Object.assign(this, config)
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
