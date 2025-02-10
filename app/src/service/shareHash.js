import {ref} from "vue";

export function useShareHash () {

  const marker = ref('#share')
  const separator = ref('-')

  const create = (data) => {
    return `${marker.value}${separator.value}${btoa(JSON.stringify(data))}`
  }

  const parse = (hash) => {
    const raw = hash.split(separator.value)
    return Object.assign(JSON.parse(atob(raw[1])), {})
  }

  const shareIsValid = (hash) => {
    return hash.startsWith(marker.value)
  }

  return {
    shareIsValid,
    create,
    parse,
  }
}
