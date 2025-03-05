import {ref} from "vue";

const collection = ref([])
const keyStore = 'generateList'
let syncCallback = undefined

export function useGenerateList () {

  const getCollection = () => {
    return collection.value
  }

  const getLimit = () => {
    return 20
  }

  const fillCollection = (items) => {
    return collection.value = items
  }

  const setCallback = (cb) => {
    syncCallback = cb
  }

  const add = (item, max = getLimit()) => {
    collection.value.unshift(item)
    if(collection.value.length > max) {
      collection.value.pop()
    }
  }

  const removeItem = (item) => {
    collection.value.splice(collection.value.indexOf(item), 1)
    if (syncCallback !== undefined) {
      syncCallback(collection.value)
    }
  }

  return {
    getCollection,
    fillCollection,
    add,
    keyStore,
    getLimit,
    removeItem,
    setCallback,
  }
}
