import { defineStore } from 'pinia'
import { actions } from './actions'
import { MODULE_NAME } from './constants'
import { state } from './state'

const useMapStore = defineStore(MODULE_NAME, {
  state,
  actions,
})

export default useMapStore

export { ACTIONS, MODULE_NAME } from './constants'
