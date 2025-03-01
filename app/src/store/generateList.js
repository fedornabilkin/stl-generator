import {ref} from "vue";

const collection = ref([])
const keyStore = 'generateList'

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

  const add = (item, max = getLimit()) => {
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
    getLimit,
  }
}
