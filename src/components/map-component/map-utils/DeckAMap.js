import AMapLoader from '@amap/amap-jsapi-loader'
import { Deck } from '@deck.gl/core'

const CANVAS_STYLE = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

const TOOLTIP_STYLE = {
  color: '#fff',
  opacity: '0.9',
  borderRadius: '0.25rem',
  textTransform: 'capitalize',
  fontFamily: 'Montserrat, "Open Sans", sans-serif',
  fontSize: '0.7rem',
}

function getTooltip(pickingInfo) {
  if (pickingInfo.object) {
    let html = `<div style="font-size: 0.9rem;"><strong>${pickingInfo.layer.id}</strong></div>`

    if (!pickingInfo.object.properties) {
      return
    }

    for (const [name, value] of Object.entries(pickingInfo.object.properties)) {
      if (name !== 'layerName' && name !== 'cartodb_id') {
        html += `<div><strong>${name}: </strong>${value}</div>`
      }
    }

    return {
      html,
      style: TOOLTIP_STYLE,
    }
  }

  return null
}

const DEFAULT_MAP_PROPS = {
  layers: [],
  basemap: null,
  controller: true,
  useDevicePixels: 2,
  getCursor: ({ isDragging, isHovering }) =>
    isDragging ? 'grabbing' : isHovering ? 'pointer' : '',
  getTooltip,
  layerFilter({ layer, viewport }) {
    const filterFn = layer.props.layerFilter
    if (typeof filterFn === 'function') {
      return filterFn(viewport, layer)
    }
    return true
  },
}

function createCanvas(props) {
  let { container = document.body } = props

  if (typeof container === 'string') {
    container = document.querySelector(container)
  }

  if (!container) {
    throw new Error('[DeckMap] container not found')
  }

  const containerStyle = window.getComputedStyle(container)
  if (containerStyle.position === 'static') {
    container.style.position = 'relative'
  }

  const mapboxCanvas = document.createElement('div')
  container.appendChild(mapboxCanvas)
  Object.assign(mapboxCanvas.style, CANVAS_STYLE)

  const deckCanvas = document.createElement('canvas')
  deckCanvas.oncontextmenu = () => false
  container.appendChild(deckCanvas)
  Object.assign(deckCanvas.style, CANVAS_STYLE)

  return { container, mapboxCanvas, deckCanvas }
}

export default class DeckMap extends Deck {
  constructor(props = {}) {
    props = {
      ...DEFAULT_MAP_PROPS,
      onResize: () => {
        if (this._map) {
          this._map.resize()
        }
      },
      ...props,
    }

    const { mapboxCanvas, deckCanvas } = createCanvas(props)
    const viewState = props.viewState || props.initialViewState
    const basemap = props.basemap

    super({ canvas: deckCanvas, ...props })

    if (basemap) {
      this._map = basemap
    } else {
      AMapLoader.load({
        key: '27e632cb0e0b2d224610df6a92e7865f',
        version: '2.0',
      }).then((AMap) => {
        this._map = new AMap.Map(mapboxCanvas, {
          viewMode: '3D',
          mapStyle: 'amap://styles/grey',
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom + 1,
          rotation: viewState.bearing ? (360 - viewState.bearing) % 360 : 0, // mapbox 逆时针旋转
          pitch: viewState.pitch || 0,
          zooms: [1, 23], // mapbox 默认 [0, 22], 在同等大小下, 高德地图 zoom + 1
          dragEnable: false,
          //   jogEnable: false,
          //   animateEnable: false,
          keyboardEnable: false,
          doubleClickZoom: false,
          scrollWheel: false,
          touchZoom: false,
          touchZoomCenter: false,
        })
      })
    }

    // update base map
    this._onBeforeRender = (params) => {
      this.onBeforeRender(params)
      if (this._map) {
        this._setViewPort()
        // this.redrawMapbox()
      }
    }

    this._setViewPort = () => {
      if (this._map) {
        const viewport = this.getViewports()[0]
        this._map.setZoom(viewport.zoom + 1, true)
        this._map.setCenter([viewport.longitude, viewport.latitude], true)
        this._map.setPitch(viewport.pitch, true)
        // mapbox 逆时针旋转
        this._map.setRotation((360 - viewport.bearing) % 360, true)
      }
    }
  }

  redrawMapbox() {
    // const map = this._map
    // if (map.style) {
    //   if (map._frame) {
    //     map._frame.cancel()
    //     map._frame = null
    //   }
    //   map._render()
    // }
  }

  getMapboxMap() {
    return this._map
  }

  finalize() {
    if (this._map) {
      this._map.destroy()
    }
    super.finalize()
  }

  setProps(props) {
    if (
      'onBeforeRender' in props &&
      this._onBeforeRender &&
      props.onBeforeRender !== this._onBeforeRender
    ) {
      this.onBeforeRender = props.onBeforeRender
      props.onBeforeRender = this._onBeforeRender
    }

    super.setProps(props)
  }
}
