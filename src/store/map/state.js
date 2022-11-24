const BASE_MAP = {
  NORMAL: 'aimap://styles/aimap/normal-v4',
  DARKBLUE: 'aimap://styles/aimap/darkblue-v5',
}
export const initialViewState = () => ({
  // longitude: 121.50547,
  // latitude: 31.236532,
  // zoom: 3,
  zoom: 11.5,
  pitch: 45,
  longitude: 115.028228,
  latitude: 30.183563,
})

export const state = () => ({
  credentials: {
    apiBaseUrl: 'https://location-dev.newayz.com',
    apiVersion: '2.6.0',
    accessToken: 'wcA5GJdTZkmCIx078dqYvxNBDAgU4OoP',
  },
  basemap: BASE_MAP.DARKBLUE,
  mapLoaded: false,
  viewState: initialViewState(),
  viewportFeatures: [],
})
