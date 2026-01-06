const casesSection = document.querySelector('#cases');
const casesTitle = document.querySelector('#cases h2');
const casesText = document.querySelector('#cases p');

if (casesSection && casesText) {
  const fullText = casesText.dataset.text.trim();
  let index = 0;

  const typeText = () => {
    if (index < fullText.length) {
      casesText.textContent += fullText.charAt(index);
      index++;
      setTimeout(typeText, 18); // velocidade da digitação
    }
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        casesTitle.classList.add('show');
        typeText();
        observer.unobserve(entry.target); // anima só 1 vez
      }
    });
  }, { threshold: 0.3 });

  observer.observe(casesSection);
}
