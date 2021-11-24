export const jiggle = (value = 0, magnitude = 1): number =>
  value + magnitude * Math.random() * (Math.random() > 0.5 ? 1 : -1)
