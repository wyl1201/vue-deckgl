import layerManager from '@/components/map-component/map-utils/layerManager.js'
import { debounce } from 'lodash-es'
import { ACTIONS } from './constants'
import { initialViewState } from './state'

export const actions = {
  [ACTIONS.SET_MAP_LOADED](isMapLoaded) {
    this.mapLoaded = isMapLoaded
  },
  [ACTIONS.SET_VIEWSTATE](viewState) {
    const _this = this
    setDelayedViewState(_this, viewState)
    layerManager.deckInstance.setProps({ viewState: { ...viewState } })
  },
  [ACTIONS.RESET_VIEWSTATE]() {
    const viewState = initialViewState()
    this.viewState = viewState
    layerManager.deckInstance.setProps({ viewState: { ...viewState } })
  },
  [ACTIONS.SET_VIEWPORT_FEATURES](data) {
    this.viewportFeatures = data
  },
}

const setDelayedViewState = debounce((store, v) => {
  store.viewState = v
}, 500)
