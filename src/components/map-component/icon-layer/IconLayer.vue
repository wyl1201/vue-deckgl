<template src="./icon-layer.html"></template>

<script>
import { IconLayer } from '@deck.gl/layers'
import { uniqueId } from 'lodash-es'
import layerManager from '../map-utils/layerManager'
import { layerMixins } from '../mixins/layerMixins'

export default {
  name: 'IconLayer',
  mixins: [layerMixins],
  data() {
    return {
      defaultProps: {
        id: uniqueId('icon-layer-'),
      },
    }
  },

  mounted() {
    const layer = new IconLayer({
      ...this.defaultProps,
      ...this.layerProps,
    })
    layerManager.addLayer(layer)
    this.layer = layer
  },
}
</script>
