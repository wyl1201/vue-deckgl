<template src="./home.html"></template>

<style scoped src="./home.css"></style>

<script>
import ArcLayer from '@/components/map-component/arc-layer/ArcLayer.vue'
import GeoHashLayer from '@/components/map-component/geohash-layer/GeoHashLayer.vue'
import MapComponent from '@/components/map-component/MapComponent.vue'
import { colorToArray } from '@/utils/colorToArray'

const colors = [
  '#FFF8B4',
  '#D3F299',
  '#9FE084',
  '#5ACA70',
  '#00AF53',
  '#00873A',
  '#006B31',
  '#004835',
  '#003829',
]
  .reverse()
  .map((clr) => colorToArray(clr))

export default {
  name: 'app-home',
  components: { MapComponent, ArcLayer, GeoHashLayer },
  data: () => {
    return {
      arcLayerProps: {
        data: [],
        getSourceColor: (d) => [Math.sqrt(d.ratio * 10000), 140, 0],
        getSourcePosition: (d) => d.geometry.coordinates[0],
        getTargetColor: (d) => [Math.sqrt(d.ratio * 10000), 200, 100],
        getTargetPosition: (d) => d.geometry.coordinates[1],
      },
      geohashLayerProps: {
        data: [],
        pickable: true,
        wireframe: false,
        filled: true,
        extruded: true,
        elevationScale: 1000,
        getGeohash: (d) => d.gridId,
        getFillColor: (d) => {
          const v = d.crowdCount
          return v < 40
            ? colors[8]
            : v < 50
            ? colors[7]
            : v < 55
            ? colors[6]
            : v < 60
            ? colors[5]
            : v < 65
            ? colors[4]
            : v < 70
            ? colors[3]
            : v < 75
            ? colors[2]
            : v < 80
            ? colors[1]
            : v < 100
            ? colors[0]
            : 'green'
        },
        getElevation: (d) => Math.sqrt(d.crowdCount / 100),
      },
    }
  },
  created() {},
  mounted() {
    fetch(
      'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/data-line-out.json'
    )
      .then((res) => res.json())
      .then((res) => {
        this.arcLayerProps.data = res.features
      })

    fetch(`/data/grid.json`)
      .then((res) => res.json())
      .then((res) => (this.geohashLayerProps.data = res))
  },
}
</script>
