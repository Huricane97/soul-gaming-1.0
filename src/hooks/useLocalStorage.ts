import { useRef } from 'react'

export const useLocalStorage = <T>(expirationMinutes = 60) => {
  const expirationTime = useRef(expirationMinutes)

  const getStoredData = (key: string) => {
    const storedValue = localStorage.getItem(key)
    if (storedValue) {
      const { data, timestamp } = JSON.parse(storedValue)
      const currentTime = Date.now()
      if (timestamp && currentTime - timestamp <= expirationTime.current * 60 * 1000) {
        return data as T
      } else {
        localStorage.removeItem(key)
      }
    }
    return null
  }

  const setStoredData = (key: string, data: T) => {
    const timestamp = Date.now()
    localStorage.setItem(key, JSON.stringify({ data, timestamp }))
  }
  return { getStoredData, setStoredData }
}
