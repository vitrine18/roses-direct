document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".program-card").forEach(card => {
    card.addEventListener("click", () => {
      const selectedProgram = card.dataset.program;
      localStorage.setItem("selectedProgram", selectedProgram);
      window.location.href = "/rose-program-order/";
    });
  });

  const programOutput = document.getElementById("selectedProgram");
  const hiddenInput = document.getElementById("programInput");

  const savedProgram = localStorage.getItem("selectedProgram");

  if (savedProgram) {
    if (programOutput) programOutput.textContent = savedProgram;
    if (hiddenInput) hiddenInput.value = savedProgram;
  }
});


