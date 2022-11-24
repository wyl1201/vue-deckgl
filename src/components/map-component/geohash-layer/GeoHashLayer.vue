<template src="./geohash-layer.html"></template>
<script>
import { GeohashLayer } from '@deck.gl/geo-layers'
import { uniqueId } from 'lodash-es'
import { layerMixins } from '../mixins/layerMixins'

export default {
  name: 'GeoHashLayer',
  mixins: [layerMixins],
  data() {
    return {
      type: GeohashLayer,
      defaultProps: {
        id: uniqueId('geohash-layer-'),
      },
    }
  },
}
</script>
