document.addEventListener('DOMContentLoaded', () => {
  const primaryButton = document.querySelector('.primary-button');
  const secondaryButton = document.querySelector('.secondary-button');

  if (primaryButton) {
    primaryButton.addEventListener('click', () => {
      primaryButton.textContent = 'QR listo';
      primaryButton.disabled = true;
      primaryButton.style.opacity = '0.8';
    });
  }

  if (secondaryButton) {
    secondaryButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
