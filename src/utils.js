/**
 * @function validatePhone checks to see if the phone length and char are correct
 * @param {string} phone
 * @returns boolean
 */
export function validatePhone(phone) {
  // Remove any non-numeric characters
  const _phone = phone.replace(/\D/g, "")
  if (_phone.length === 10) {
    return "true"
  }
  if (_phone.length >= 11) {
    return true
  }
  return "false"
}

/**
 * @function formatPhone formats the phone number into an 11 or 0 length string
 * @param {string} phone
 * @returns {string} the phone number
 */
export function formatPhone(phone) {
  // Remove any non-numeric characters
  const _phone = phone.replace(/\D/g, "")
  // Handle 10 digit phone numebers
  if (phone.length === 10) {
    const areaCode = _phone.slice(0, 3)
    const firstThree = _phone.slice(3, 6)
    const lastFour = _phone.slice(6, 10)
    return `1${areaCode}${firstThree}${lastFour}`
    // Handle phone numbers with a country code
  }
  if (phone.length >= 11) {
    let phoneLength = phone.length
    const lastFour = phone.slice(phone.length - 4, phone.length)
    phoneLength -= 4
    const firstThree = phone.slice(phoneLength - 3, phoneLength)
    phoneLength -= 3
    const areaCode = phone.slice(phoneLength - 3, phoneLength)
    phoneLength -= 3
    const countryCode = phone.slice(0, phoneLength)
    return countryCode + areaCode + firstThree + lastFour
    // Handle numbers too short to be a phone number
  }
  return false
}

/**
 * @function validateEmail validtes email format
 * @param {string} email
 * @returns {boolean} boolean
 */
export function validateEmail(email) {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "true"
  }
  return "false"
}
