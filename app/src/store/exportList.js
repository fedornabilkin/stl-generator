import {ref} from "vue";

const collection = ref([])
const keyStore = 'exportList'

export function useExportList () {

  const getCollection = () => {
    return collection.value
  }
  const fillCollection = (items) => {
    return collection.value = items
  }

  const add = (item) => {
    collection.value.unshift(item)
    if(collection.value.length > 5) {
      collection.value.pop()
    }
  }

  return {
    getCollection,
    fillCollection,
    add,
    keyStore,
  }
}
