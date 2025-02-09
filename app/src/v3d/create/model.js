export class Model {
  strategy = undefined

  setStrategy(strategy) {
    this.strategy = strategy
  }

  create(generator) {
    return this.strategy.create(generator)
  }

  export(generator) {
    return this.strategy.export(generator)
  }
}
