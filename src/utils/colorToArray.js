import { rgb } from 'd3-color'
export function colorToArray(clr) {
  // {r: 70, g: 130, b: 180, opacity: 1}
  const c = rgb(clr)
  return [c.r, c.g, c.b, c.opacity * 255]
}
