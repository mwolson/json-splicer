const SLICES = 100

function Slicer() {
  this.values = []
  this.totalLength = 0
}

Slicer.prototype.write = function(input) {
  const len = input.length
  const bytesPerSlice = Math.floor(len / SLICES)
  if (bytesPerSlice === 0) {
    this.values.push(input)
    this.totalLength = len
    return
  }

  for (let idx = 0; idx < SLICES - 1; idx++) {
    const start = idx * bytesPerSlice
    const slice = input.slice(start, start + bytesPerSlice)
    this.values.push(slice)
  }

  const start = (SLICES - 1) * bytesPerSlice
  const slice = input.slice(start, len)
  this.values.push(slice)
  this.totalLength = len
}

module.exports = Slicer
