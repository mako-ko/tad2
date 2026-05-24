export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function readFromStorage(key, fallback = null) {
  const value = localStorage.getItem(key)

  if (!value) {
    return fallback
  }

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export function removeFromStorage(key) {
  localStorage.removeItem(key)
}
