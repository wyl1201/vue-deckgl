<template src="./arc-layer.html"></template>
<script>
import { ArcLayer } from '@deck.gl/layers'
import { uniqueId } from 'lodash-es'
import { defaultDeckLayerProps } from '../constants'
import { layerMixins } from '../mixins/layerMixins'
export default {
  name: 'ArcLayer',
  mixins: [layerMixins],
  created() {
    this.type = ArcLayer
    this.defaultProps = {
      ...defaultDeckLayerProps,
      id: uniqueId('arc-layer-'),
      // Render Options
      greatCircle: false,
      widthUnits: 'pixels',
      widthScale: 1,
      widthMinPixels: 0,
      widthMaxPixels: Number.MAX_SAFE_INTEGER,
      // Data Accessors
      getSourcePosition: (object) => object.sourcePosition,
      getTargetPosition: (object) => object.targetPosition,
      getSourceColor: [0, 0, 0, 255],
      getTargetColor: [0, 0, 0, 255],
      getWidth: 1,
      getHeight: 1,
      getTilt: 0,
    }
  },
}
</script>
