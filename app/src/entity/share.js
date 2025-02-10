export class Share {
  hash = ''
  date = undefined
  img = {
    src: null,
  }

  constructor(config = {}) {
    Object.assign(this, config)
  }
}
