export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function hasMinLength(value, size) {
  return String(value || '').length >= size
}

export function isValidFullName(value) {
  return /^[a-zA-Z]+ [a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value)
}
