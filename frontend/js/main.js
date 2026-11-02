// Main Shared Utility Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Sync current year in all footers
  const yearSpans = document.querySelectorAll('.current-year');
  const curYear = new Date().getFullYear();
  yearSpans.forEach((el) => {
    el.textContent = curYear;
  });
});

