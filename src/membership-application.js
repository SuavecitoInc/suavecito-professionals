import { formatPhone } from "./utils";

function encodePhoto() {
  const reader = new FileReader();
  const file = document.querySelector("#licensePhoto").files[0];
  const base64Input = document.querySelector("#licensePhotoBase64");
  reader.addEventListener("load", function () {
    base64Input.value = reader.result;
  });
  if (file) {
    reader.readAsDataURL(file);
  }
}

async function submitApplication(event) {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const phone = formatPhone(document.querySelector("#phone").value);
  const licensePhoto = document.querySelector("#licensePhotoBase64").value;
  const radio = document.querySelectorAll("[name='Barber or Cosmetologist']");
  const profession = radio[0].checked
    ? radio[0].dataset.value
    : radio[1].checked
    ? radio[1].dataset.value
    : false;

  if (firstName && lastName && email && phone && licensePhoto && profession) {
    event.preventDefault();

    const applicantInfo = {
      firstName,
      lastName,
      email,
      phone,
      licensePhoto,
      profession,
    };

    const url =
      "https://api.suavecito.com/api/shopify/professionals/netsuite/lead";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(applicantInfo),
    });
    const res_json = await response.json();
    console.log(res_json);

    event.target.removeEventListener("submit", submitApplication);

    document.querySelector("#MembershipApplication").submit();
  }
}

const formButton = document.querySelector("#submitApplication");
const photoInput = document.querySelector("#licensePhoto");

photoInput.addEventListener("change", encodePhoto);
formButton.addEventListener("click", submitApplication);
