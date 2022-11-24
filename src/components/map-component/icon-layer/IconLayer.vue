<template src="./icon-layer.html"></template>

<script>
import { IconLayer } from '@deck.gl/layers'
import { uniqueId } from 'lodash-es'
import { defaultDeckLayerProps } from '../constants'
import { layerMixins } from '../mixins/layerMixins'

export default {
  name: 'IconLayer',
  mixins: [layerMixins],
  created() {
    this.type = IconLayer
    this.defaultProps = {
      ...defaultDeckLayerProps,
      id: uniqueId('icon-layer-'),
      sizeScale: 1,
      sizeUnits: 'pixels',
      sizeMinPixels: 0,
      sizeMaxPixels: Number.MAX_SAFE_INTEGER,
      billboard: true,
      alphaCutoff: 0.05,
    }
  },
}
</script>
