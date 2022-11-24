<template src="./geohash-layer.html"></template>
<script>
import { SolidPolygonLayer } from '@deck.gl/layers'
import { uniqueId } from 'lodash-es'
import { defaultDeckLayerProps } from '../constants'
import { layerMixins } from '../mixins/layerMixins'

export default {
  name: 'SolidPolygonLayer',
  mixins: [layerMixins],
  created() {
    this.defaultProps = {
      ...defaultDeckLayerProps,
      type: SolidPolygonLayer,
      id: uniqueId('solid-polygon-layer-'),
      filled: true,
      extruded: false,
      wireframe: false,
      elevationScale: 1,
      material: true,
      getFillColor: [0, 0, 0, 255],
      getLineColor: [0, 0, 0, 255],
      getElevation: 1000, // Only applies if extruded: true
    }
  },
}
</script>
