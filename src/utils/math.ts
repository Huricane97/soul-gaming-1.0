export const rad2Ang = (rad: number) => (rad * 180) / Math.PI

export const ang2Rad = (ang: number) => (ang * Math.PI) / 180

export const getRandomVal = (range: number) => Math.ceil(Math.random() * 100000000) % range

export const isSamePoint = (point1: any, point2: any) =>
  point1[0] === point2[0] && point1[1] === point2[1] && point1[2] === point2[2]

export const getFixedFloat = (val: any, len: number) => Number(val.toFixed(len))

export const changeNumberBase = (number: number | string, fromBase: number, toBase: number) => {
  if (fromBase == 10) return parseInt(String(number)).toString(toBase)
  else if (toBase == 10) return parseInt(String(number), fromBase)
  else {
    const numberInDecimal = parseInt(String(number), fromBase)
    return parseInt(String(numberInDecimal)).toString(toBase)
  }
}

export const roundNumber = (number: number, precision = 2) => {
  const factor = 10 ** precision
  const product = Math.round(number * factor * 10) / 10
  return Math.round(product) / factor
}
