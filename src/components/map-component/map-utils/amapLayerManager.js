import DeckAMap from './DeckAMap'

export default {
  layers: {},
  deckInstance: null,

  init(deckProps) {
    this.deckInstance = new DeckAMap(deckProps)
  },

  destroy() {
    this.deckInstance.finalize()
    delete this.deckInstance
  },

  hasLayer(id) {
    return !!this.layers[id]
  },

  getLayers() {
    return !!this.layers
  },

  isVisible(id) {
    return this.layers[id] && this.layers[id].props.visible !== false
  },

  updateDeckInstance() {
    if (!this.deckInstance) {
      return
    }
    const layers = [...Object.values(this.layers)]

    if (this.deckInstance) {
      this.deckInstance.setProps({ layers })
    }
  },

  addLayer(layer) {
    if (!layer.id) {
      throw new Error(
        `[layerManager.addLayer] layer id must defined. Receive "${layer.id}" instead`
      )
    }
    this.layers[layer.id] = layer
    this.updateDeckInstance()
  },

  removeLayer(id) {
    if (this.hasLayer(id)) {
      delete this.layers[id]
      this.updateDeckInstance()
    }
  },

  updateLayer(id, props) {
    if (!this.layers[id]) {
      return
    }
    const layer = this.layers[id]
    this.layers[id] = layer.clone(props)
    this.updateDeckInstance()
  },

  hideLayer(id) {
    if (this.hasLayer(id)) {
      this.updateLayer(id, { visible: false })
    }
  },

  showLayer(id) {
    if (this.hasLayer(id)) {
      this.updateLayer(id, { visible: true })
    }
  },
}
