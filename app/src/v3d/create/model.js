export class Model {
  strategy = undefined

  setStrategy(strategy) {
    this.strategy = strategy
  }

  create(generator) {
    return this.strategy.create(generator)
  }

  collection() {
    return this.strategy.getCollectMesh()
  }

  export(generator) {
    return this.strategy.export(generator)
  }
}
