import { getPercent } from './Calc'

export default {
  getPointerPosition: (element, event) => {
    const {
      top, left, width, height
    } = element.getBoundingClientRect()
    const { pageX, pageY } = event
    const px = {
      x: pageX - left,
      y: pageY - top
    }
    const percent = {
      x: getPercent(px.x, width),
      y: getPercent(px.y, height)
    }
    return { px, percent }
  }
}
