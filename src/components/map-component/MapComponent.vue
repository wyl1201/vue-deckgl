/* * MapComponent.vue */ /* template import */
<template src="./map-component.html"></template>

/** style import */
<style scoped src="./map-component.css"></style>

<script>
import useMapStore, { ACTIONS, MODULE_NAME } from '@/store/map'
import { mapStores } from 'pinia'
import layerManager from './map-utils/layerManager'

export default {
  name: 'MapComponent',
  computed: {
    ...mapStores(useMapStore),
  },
  mounted() {
    this.layerManager = layerManager
    this.setupDeck()
  },
  beforeUnmount() {
    this[`${MODULE_NAME}Store`][ACTIONS.RESET_VIEWSTATE]()
    layerManager.destroy()
  },
  methods: {
    setupDeck() {
      const mapStore = this[`${MODULE_NAME}Store`]
      const { basemap, credentials, viewState } = mapStore
      if (layerManager.deckInstance) {
        return
      }

      layerManager.init({
        container: '#map',
        mapStyle: basemap,
        accessToken: credentials.accessToken,
        baseApiUrl: credentials.apiBaseUrl,
        viewState,
        onViewStateChange: ({ viewState }) => {
          mapStore[ACTIONS.SET_VIEWSTATE](viewState)
        },
        onLoad: () => {
          mapStore[ACTIONS.SET_MAP_LOADED](true)
        },
      })
    },
  },
}
</script>
