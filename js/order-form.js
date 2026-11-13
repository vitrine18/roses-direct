/* =========================================================
   FARM DIRECT ROSES
   PRODUCT QUOTE FORM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".product-quote-form");
  const quoteSection = document.getElementById("quote-form");
  const fullName = document.getElementById("full-name");
  const submitBtn = document.getElementById("submit-btn");
  const floatBtn = document.getElementById("quote-float-btn");

  if (!form) {
    console.warn("Product quote form not found.");
    return;
  }


  /* =======================================================
     DATE INPUT
  ======================================================= */

  /*
    Works with both:

    Standard Roses:
    #event-date

    Garden Roses:
    #delivery-date

    This also makes the form more flexible for future products.
  */

  const dateInput =
    form.querySelector('input[type="date"]');


  /* =======================================================
     DATE HELPERS
  ======================================================= */

  function formatDate(date) {

    const year =
      date.getFullYear();

    const month =
      String(date.getMonth() + 1).padStart(2, "0");

    const day =
      String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  function addBusinessDays(date, days) {

    const result =
      new Date(date);

    let addedDays = 0;

    while (addedDays < days) {

      result.setDate(
        result.getDate() + 1
      );

      const day =
        result.getDay();

      /*
        Monday - Friday only
      */

      if (
        day !== 0 &&
        day !== 6
      ) {
        addedDays++;
      }

    }

    return result;
  }


  function addMonths(date, months) {

    const result =
      new Date(date);

    result.setMonth(
      result.getMonth() + months
    );

    return result;
  }


  /* =======================================================
     DATE LIMITS
  ======================================================= */

  let minimumDate = null;
  let maximumDate = null;


  if (dateInput) {

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );


    /*
      Minimum:
      15 BUSINESS DAYS from today
    */

    minimumDate =
      addBusinessDays(
        today,
        15
      );


    /*
      Maximum:
      4 CALENDAR MONTHS from today
    */

    maximumDate =
      addMonths(
        today,
        4
      );


    /*
      Apply native browser limits.
    */

    dateInput.min =
      formatDate(
        minimumDate
      );

    dateInput.max =
      formatDate(
        maximumDate
      );


    /* =====================================================
       DATE VALIDATION
    ===================================================== */

    function validateDate() {

      if (!dateInput.value) {

        dateInput.setCustomValidity("");

        return false;
      }


      const selectedDate =
        new Date(
          `${dateInput.value}T00:00:00`
        );


      const day =
        selectedDate.getDay();


      /* ===================================================
         WEEKEND
      =================================================== */

      if (
        day === 0 ||
        day === 6
      ) {

        dateInput.setCustomValidity(
          "Please select a weekday. Saturdays and Sundays are unavailable."
        );


        /*
          Remove weekend selection.
        */

        dateInput.value = "";

        return false;
      }


      /* ===================================================
         BEFORE MINIMUM
      =================================================== */

      if (
        selectedDate < minimumDate
      ) {

        dateInput.setCustomValidity(
          "Please select a weekday at least 15 business days from today."
        );

        return false;
      }


      /* ===================================================
         AFTER MAXIMUM
      =================================================== */

      if (
        selectedDate > maximumDate
      ) {

        dateInput.setCustomValidity(
          "For planning beyond four months, please contact us directly."
        );

        return false;
      }


      /* ===================================================
         VALID DATE
      =================================================== */

      dateInput.setCustomValidity("");

      return true;
    }


    /* =====================================================
       DATE CHANGE
    ===================================================== */

    dateInput.addEventListener(
      "change",
      () => {

        validateDate();

        checkForm();

      }
    );


    /* =====================================================
       DATE INPUT
    ===================================================== */

    dateInput.addEventListener(
      "input",
      () => {

        validateDate();

        checkForm();

      }
    );

  } /* END DATE INPUT */


  /* =======================================================
     QUANTITY
  ======================================================= */

  const quantityInput =
    document.getElementById("quantity");


  if (quantityInput) {

    quantityInput.addEventListener(
      "input",
      () => {

        quantityInput.setCustomValidity("");

        checkForm();

      }
    );

  }


  /* =======================================================
     REQUIRED FIELDS
  ======================================================= */

  const requiredFields =
    form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );


  /* =======================================================
     CURRENT DATE VALIDATION
  ======================================================= */

  function validateCurrentDate() {

    if (
      !dateInput ||
      !dateInput.value
    ) {
      return false;
    }


    const selectedDate =
      new Date(
        `${dateInput.value}T00:00:00`
      );


    const day =
      selectedDate.getDay();


    /* WEEKEND */

    if (
      day === 0 ||
      day === 6
    ) {
      return false;
    }


    /* BEFORE MINIMUM */

    if (
      selectedDate < minimumDate
    ) {
      return false;
    }


    /* AFTER MAXIMUM */

    if (
      selectedDate > maximumDate
    ) {
      return false;
    }


    return true;
  }


  /* =======================================================
     FORM VALIDATION
  ======================================================= */

  function checkForm() {

    let complete = true;


    /* =====================================================
       REQUIRED FIELDS
    ===================================================== */

    requiredFields.forEach(
      field => {

        if (!field.value.trim()) {

          complete = false;

        }

      }
    );


    /* =====================================================
       DATE
    ===================================================== */

    if (dateInput) {

      if (!dateInput.value) {

        complete = false;

      } else {

        const dateValid =
          validateCurrentDate();


        if (!dateValid) {

          complete = false;

        }

      }

    }


    /* =====================================================
       SUBMIT BUTTON
    ===================================================== */

    if (submitBtn) {

      submitBtn.disabled =
        !complete;


      if (complete) {

        submitBtn.classList.add(
          "active"
        );

      } else {

        submitBtn.classList.remove(
          "active"
        );

      }

    }

  }


  /* =======================================================
     LISTEN FOR FIELD CHANGES
  ======================================================= */

  requiredFields.forEach(
    field => {

      field.addEventListener(
        "input",
        checkForm
      );

      field.addEventListener(
        "change",
        checkForm
      );

    }
  );


  /* =======================================================
     SCROLL TO FORM
  ======================================================= */

  function openQuoteForm() {

    if (!quoteSection) {
      return;
    }


    quoteSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    setTimeout(
      () => {

        if (fullName) {

          fullName.focus({
            preventScroll: true
          });

        }

      },
      650
    );

  }


  /* =======================================================
     HERO CTA
  ======================================================= */

  const heroQuoteButton =
    document.querySelector(
      '.product-hero-cta[href="#quote-form"]'
    );


  if (heroQuoteButton) {

    heroQuoteButton.addEventListener(
      "click",
      event => {

        event.preventDefault();

        openQuoteForm();

      }
    );

  }


  /* =======================================================
     FLOATING BUTTON
  ======================================================= */

  if (floatBtn) {

    floatBtn.addEventListener(
      "click",
      event => {

        event.preventDefault();

        openQuoteForm();

      }
    );

  }


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  checkForm();

});