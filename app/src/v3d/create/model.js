export class Model {
  strategy = undefined

  setStrategy(strategy) {
    this.strategy = strategy
  }

  create(generator) {
    return this.strategy.create(generator)
  }

  collection(generator) {
    return this.strategy.getCollectMesh(generator)
  }

  export(generator) {
    return this.strategy.export(generator)
  }
}
