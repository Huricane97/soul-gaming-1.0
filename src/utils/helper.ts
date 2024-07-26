import { changeNumberBase, roundNumber } from './math'

export const pauseEvent = (e: any) => {
  if (e.stopPropagation) e.stopPropagation()
  if (e.preventDefault) e.preventDefault()
  e.cancelBubble = true
  e.returnValue = false
  return false
}

export const emptyAction = () => {}

export const changeHexColorTransparency = (hexColor: string, transparency: string | number) => {
  const solidColor = hexColor.startsWith('#') ? hexColor.slice(0, 7) : `#${hexColor.slice(0, 6)}`
  const decimalTransparency = String(transparency).endsWith('%')
    ? Number(String(transparency).slice(0, String(transparency).length - 1)) / 100
    : Number(transparency)
  return `${solidColor}${changeNumberBase(roundNumber(decimalTransparency * 255, 0), 10, 16)}`
}
