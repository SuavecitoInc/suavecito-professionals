/**
 * @function validatePhone checks to see if the phone length and char are correct
 * @param {string} phone
 * @returns boolean
 */
export function validatePhone(phone) {
  //Remove any non-numeric characters
  phone = phone.replace(/\D/g, "");
  if (phone.length === 10) {
    return true;
  } else if (phone.length >= 11) {
    return true;
  } else {
    return false;
  }
}

/**
 * @function formatPhone formats the phone number into an 11 or 0 length string
 * @param {string} phone
 * @returns {string} the phone number
 */
export function formatPhone(phone) {
  //Remove any non-numeric characters
  phone = phone.replace(/\D/g, "");
  //Handle 10 digit phone numebers
  if (phone.length === 10) {
    const area_code = phone.slice(0, 3);
    const first_three = phone.slice(3, 6);
    const last_four = phone.slice(6, 10);
    return "1" + area_code + first_three + last_four;
    //Handle phone numbers with a country code
  } else if (phone.length >= 11) {
    let phone_length = phone.length;
    const last_four = phone.slice(phone.length - 4, phone.length);
    phone_length -= 4;
    const first_three = phone.slice(phone_length - 3, phone_length);
    phone_length -= 3;
    const area_code = phone.slice(phone_length - 3, phone_length);
    phone_length -= 3;
    const country_code = phone.slice(0, phone_length);
    return country_code + area_code + first_three + last_four;
    //Handle numbers too short to be a phone number
  } else {
    return false;
  }
}

/**
 * @function validateEmail validtes email format
 * @param {string} email
 * @returns {boolean} boolean
 */
export function validateEmail(email) {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return true;
  } else {
    return false;
  }
}
