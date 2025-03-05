import {ref} from "vue";

const collection = ref([])
const keyStore = 'exportList'
let syncCallback = undefined

export function useExportList () {

  const getCollection = () => {
    return collection.value
  }
  const fillCollection = (items) => {
    return collection.value = items
  }

  const setCallback = (cb) => {
    syncCallback = cb
  }

  const add = (item) => {
    collection.value.unshift(item)
    if(collection.value.length > 5) {
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
    removeItem,
    setCallback,
  }
}
