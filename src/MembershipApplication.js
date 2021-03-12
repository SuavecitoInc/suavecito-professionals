/* global React */
/* global ReactDOM */

import { formatPhone, validateEmail, validatePhone } from "./utils"

function MembershipApplication({ data }) {
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [profession, setProfession] = React.useState("")
  const [file, setFile] = React.useState(null)
  const [encodedPhoto, setEncodedPhoto] = React.useState(null)
  const [isValidPhone, setIsValidPhone] = React.useState("untested")
  const [isValidEmail, setIsValidEmail] = React.useState("untested")
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const submitApplication = async e => {
    e.preventDefault()
    if (
      firstName &&
      lastName &&
      isValidEmail &&
      isValidPhone &&
      profession &&
      encodedPhoto
    ) {
      const applicantInfo = {
        firstName,
        lastName,
        email,
        phone: formatPhone(phone),
        licensePhoto: encodedPhoto,
        profession,
      }

      try {
        const url =
          "https://api.suavecito.com/api/shopify/professionals/netsuite/lead"
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(applicantInfo),
        })
        const resJson = await response.json()
        console.log(resJson)
        if (resJson.errors) {
          let message = ""
          resJson.errors.forEach(error => {
            message += `${error.message} `
          })
          alert("message:", message)
        } else {
          setIsSubmitted(true)
        }
      } catch (error) {
        alert(`Something went wrong. Please try again later. Error: ${error}`)
      }
    } else {
      alert("Please fill out all fields with valid values")
      console.log(profession)
    }
  }

  React.useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.addEventListener("load", function () {
        setEncodedPhoto(reader.result)
      })
      reader.readAsDataURL(file)
    }
  }, [file])
  if (!isSubmitted) {
    return (
      <div>
        <div className="grid grid--half-gutters">
          <div className="grid__item medium-up--one-half">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="contact[First Name]"
              required
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="grid__item medium-up--one-half">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="contact[Last Name]"
              required
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div className="grid__item medium-up--one-half">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="contact[email]"
              autoCorrect="off"
              autoCapitalize="off"
              aria-required="true"
              required
              data-is-valid={isValidEmail}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setIsValidEmail(validateEmail(email))}
            />
          </div>
          <div className="grid__item medium-up--one-half">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="contact[Phone Number]"
              pattern="[0-9\-]*"
              required
              data-is-valid={isValidPhone}
              onChange={e => setPhone(e.target.value)}
              onBlur={() => setIsValidPhone(validatePhone(phone))}
            />
          </div>
          <div className="grid__item medium-up--one-half">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>I am a licensed: *</label>
            <br />
            <input
              type="radio"
              id="MembershipApplication-barber"
              name="Barber or Cosmetologist"
              value="Barber"
              data-value="7"
              required
              checked={profession === "7"}
              onChange={e => setProfession(e.target.getAttribute("data-value"))}
            />
            <span className="uau-radio-label">Barber</span>
            <input
              type="radio"
              id="MembershipApplication-cosmetologist"
              name="Barber or Cosmetologist"
              value="Cosmetologist"
              data-value="8"
              checked={profession === "8"}
              onChange={e => setProfession(e.target.getAttribute("data-value"))}
            />
            <span className="uau-radio-label">Cosmetologist</span>
          </div>
          <div className="grid__item medium-up--one-half">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="licensePhoto">Photo of license *</label>
            <input
              id="licensePhoto"
              name="licensePhoto"
              type="file"
              accept="image/*, .pdf"
              required
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
          <div className="grid__item text-center">
            <input
              id="submitApplication"
              type="button"
              className="btn"
              value="Submit"
              onClick={e => submitApplication(e)}
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <p>Your application has been submitted</p>
    </div>
  )
}

const domContainer = document.querySelector("#MembershipApplication")
const _data = domContainer.dataset
ReactDOM.render(<MembershipApplication data={_data} />, domContainer)
