document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  const paypalBtn = document.getElementById('paypalBtn');
  const programText = document.getElementById('selectedProgram');
  const dateInput = document.getElementById('deliveryDate');
  const dateHint = document.getElementById('dateHint');

  if (!form || !paypalBtn) return;

  // Hide date hint when selected
  if (dateInput && dateHint) {
    dateInput.addEventListener('change', () => {
      if (dateInput.value) dateHint.style.display = 'none';
    });
  }

  function checkForm() {
    const requiredFields = form.querySelectorAll('[required]');
    let allFilled = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) allFilled = false;
    });

    if (allFilled) {
      const program = programText?.textContent || 'Rose Program';

      const business = form.querySelector('input[placeholder="Business Name"]')?.value || '';
      const name = form.querySelector('input[placeholder="Full Name"]')?.value || '';
      const email = form.querySelector('input[placeholder="Email Address"]')?.value || '';
      const phone = form.querySelector('input[placeholder="Phone / WhatsApp"]')?.value || '';
      const city = form.querySelector('input[placeholder="City"]')?.value || '';
      const zip = form.querySelector('input[placeholder="ZIP Code"]')?.value || '';
      const date = dateInput?.value || 'Not specified';

      const note =
`Program: ${program}
Name: ${name}
Email: ${email}
Phone: ${phone}
Delivery: ${city} ${zip}
Date: ${date}`;

      const paypalUrl =
        'https://paypal.me/farmdirectroses?note=' +
        encodeURIComponent(note);

      paypalBtn.classList.remove(
        'bg-gray-300',
        'text-gray-500',
        'cursor-not-allowed'
      );

      paypalBtn.classList.add(
        'bg-rose-600',
        'text-white',
        'hover:bg-rose-700'
      );

      paypalBtn.textContent = 'Pay securely with PayPal';
      paypalBtn.href = paypalUrl;
      paypalBtn.target = '_blank';

    } else {
      paypalBtn.classList.add(
        'bg-gray-300',
        'text-gray-500',
        'cursor-not-allowed'
      );

      paypalBtn.classList.remove(
        'bg-rose-600',
        'text-white',
        'hover:bg-rose-700'
      );

      paypalBtn.removeAttribute('href');
      paypalBtn.removeAttribute('target');
      paypalBtn.textContent = 'Complete the form to activate secure payment';
    }
  }

  form.addEventListener('input', checkForm);
});



document.addEventListener("DOMContentLoaded", () => {
  console.log("order-form.js cargado ✅");

  const form = document.getElementById("quote-form");
  const submitBtn = document.getElementById("submit-btn");
  const floatBtn = document.getElementById("quote-float-btn");

  if (!form || !submitBtn) {
    console.warn("Formulario o botón no encontrado");
    return;
  }

  const requiredFields = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );

  function checkForm() {
    let complete = true;
    requiredFields.forEach(field => {
      if (!field.value.trim()) complete = false;
    });

    if (complete) {
      submitBtn.disabled = false;
      submitBtn.classList.add("active");
    }
  }

  requiredFields.forEach(field => {
    field.addEventListener("input", checkForm);
    field.addEventListener("change", checkForm);
  });

  if (floatBtn) {
    floatBtn.addEventListener("click", () => {
      form.scrollIntoView({ behavior: "smooth" });
      requiredFields[0].focus();
    });
  }
});


const params = new URLSearchParams(window.location.search);
const program = params.get("program");

const programText = document.getElementById("selectedProgram");
const programInput = document.getElementById("programInput");

if (program === "starter") {
  programText.innerText = "Starter Program – 250 stems • 60cm Roses";
  programInput.value = "Starter Program";
}

if (program === "best") {
  programText.innerText = "Best Seller – 750 stems • 60cm Roses";
  programInput.value = "Best Seller";
}

if (program === "premium") {
  programText.innerText = "Premium Program – 1,500 stems • 60cm Roses";
  programInput.value = "Premium Program";
}



if (!program) {
  programText.innerText = "Please select a rose program";
}

