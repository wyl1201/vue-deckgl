<template src="./geohash-layer.html"></template>
<script>
import { GeoJsonLayer } from '@deck.gl/layers'
import { uniqueId } from 'lodash-es'
import { defaultDeckLayerProps } from '../constants'
import { layerMixins } from '../mixins/layerMixins'

export default {
  name: 'GeoJsonLayer',
  mixins: [layerMixins],
  created() {
    this.type = GeoJsonLayer
    this.defaultProps = {
      ...defaultDeckLayerProps,
      id: uniqueId('geojson-layer-'),
    }
  },
}
</script>
