import {ref} from "vue";

const collection = ref([])
const keyStore = 'generateList'

export function useGenerateList () {

  const getCollection = () => {
    return collection.value
  }
  const fillCollection = (items) => {
    return collection.value = items
  }

  const add = (item, max = 20) => {
    collection.value.unshift(item)
    if(collection.value.length > max) {
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
