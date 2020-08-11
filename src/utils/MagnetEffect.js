export default (element, x, y) => {
  if (x <= 100 && x >= 0 && y <= 100 && y >= 0) {
    element.style.transform = `translate(${x - 50}%, ${y - 50}%)`
  } else {
    element.style.transform = 'translate(0, 0)'
  }
}
