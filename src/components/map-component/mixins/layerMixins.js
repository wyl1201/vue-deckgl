import layerManager from '../map-utils/layerManager'

export const layerMixins = {
  inheritAttrs: false,
  props: {
    layerProps: {
      type: Object,
      require: true,
      default: () => {},
    },
  },

  watch: {
    layerProps: {
      handler(props) {
        layerManager.updateLayer(this.layer.id, props)
      },
      deep: true,
    },
  },

  mounted() {
    const Layer = this.type
    const layer = new Layer({
      ...this.defaultProps,
      ...this.layerProps,
    })
    this.layer = layer
    layerManager.addLayer(layer)
  },

  beforeUnmount() {
    layerManager.removeLayer(this.layer.id)
  },
}
