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
    const mapboxgl = window.aimap
    mapboxgl.baseApiUrl = props.baseApiUrl

    super({ canvas: deckCanvas, ...props })

    if (basemap) {
      this._map = basemap
    } else {
      this._map = new mapboxgl.Map({
        accessToken: props.accessToken,
        container: mapboxCanvas,
        style: props.mapStyle,
        interactive: false,
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        bearing: viewState.bearing || 0,
        pitch: viewState.pitch || 0,
      })
    }

    // update base map
    this._onBeforeRender = (params) => {
      this.onBeforeRender(params)
      if (this._map) {
        const viewport = this.getViewports()[0]
        this._map.jumpTo({
          center: [viewport.longitude, viewport.latitude],
          zoom: viewport.zoom,
          bearing: viewport.bearing,
          pitch: viewport.pitch,
        })

        this.redrawMapbox()
      }
    }
  }

  redrawMapbox() {
    const map = this._map

    if (map.style) {
      if (map._frame) {
        map._frame.cancel()
        map._frame = null
      }

      map._render()
    }
  }

  getMapboxMap() {
    return this._map && this._map.getMap()
  }

  finalize() {
    if (this._map) {
      this._map.remove()
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
