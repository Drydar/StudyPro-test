const beginBtn = document.getElementById('beginBtn');
const intro = document.getElementById('intro');
const formSection = document.getElementById('formSection');
const form = document.getElementById('assignmentForm');
const progressBar = document.getElementById('progressBar');

// Show form when "Begin" is clicked
beginBtn.addEventListener('click', () => {
  intro.classList.add('fade');
  setTimeout(() => {
    intro.style.display = 'none';
    formSection.classList.remove('d-none');
    formSection.classList.add('fade-in');
  }, 500);
});

// Progress bar logic
const inputs = form.querySelectorAll("input, select");

function updateProgress() {
  let filled = 0;

  inputs.forEach(input => {
    if ((input.type === "file" && input.files.length > 0) ||
        (input.type !== "file" && input.value.trim() !== "")) {
      filled++;
    }
  });

  const percent = Math.round((filled / inputs.length) * 100);
  progressBar.style.width = percent + "%";
  progressBar.textContent = percent + "%";

  if (percent === 100) {
    progressBar.classList.remove('bg-primary');
    progressBar.classList.add('bg-success');
  } else {
    progressBar.classList.add('bg-primary');
    progressBar.classList.remove('bg-success');
  }
}

inputs.forEach(input => {
  input.addEventListener("input", updateProgress);
  input.addEventListener("change", updateProgress);
});