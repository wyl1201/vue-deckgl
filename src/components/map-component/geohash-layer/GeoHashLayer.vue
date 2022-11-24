<template src="./geohash-layer.html"></template>
<script>
import { GeohashLayer } from '@deck.gl/geo-layers'
import { uniqueId } from 'lodash-es'
import { defaultDeckLayerProps } from '../constants'
import { layerMixins } from '../mixins/layerMixins'

export default {
  name: 'GeohashLayer',
  mixins: [layerMixins],
  created() {
    this.type = GeohashLayer
    this.defaultProps = {
      ...defaultDeckLayerProps,
      id: uniqueId('geohash-layer-'),
    }
  },
}
</script>
