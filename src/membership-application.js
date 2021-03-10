import { formatPhone } from "./utils"

function encodePhoto() {
  const reader = new FileReader()
  const file = document.querySelector("#licensePhoto").files[0]
  const base64Input = document.querySelector("#licensePhotoBase64")
  reader.addEventListener("load", function () {
    base64Input.value = reader.result
  })
  if (file) {
    reader.readAsDataURL(file)
  }
}

async function submitApplication(event) {
  const firstName = document.querySelector("#firstName").value
  const lastName = document.querySelector("#lastName").value
  const email = document.querySelector("#email").value
  const phone = formatPhone(document.querySelector("#phone").value)
  const licensePhoto = document.querySelector("#licensePhotoBase64").value
  const radio = document.querySelectorAll("[name='Barber or Cosmetologist']")
  // eslint-disable-next-line no-nested-ternary
  const profession = radio[0].checked
    ? radio[0].dataset.value
    : radio[1].checked
    ? radio[1].dataset.value
    : false

  if (firstName && lastName && email && phone && licensePhoto && profession) {
    event.preventDefault()

    const applicantInfo = {
      firstName,
      lastName,
      email,
      phone,
      licensePhoto,
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
      }
      event.target.removeEventListener("submit", submitApplication)
      document.querySelector("#MembershipApplication").submit()
    } catch (e) {
      alert(`Something went wrong. Please try again later. Error: ${e}`)
    }
  }
}

const formButton = document.querySelector("#submitApplication")
const photoInput = document.querySelector("#licensePhoto")

photoInput.addEventListener("change", encodePhoto)
formButton.addEventListener("click", submitApplication)
