// Animação dos cards ao aparecer no scroll
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  {
    threshold: 0.2
  }
);

cards.forEach(card => observer.observe(card));


document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    e.preventDefault();

    const headerOffset = 120;
    const elementPosition = targetSection.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});




const casesContainer = document.querySelector('.cases-container');
const casesTrack = document.querySelector('.cases-track');

if (casesContainer && casesTrack) {
  casesContainer.addEventListener('mouseenter', () => {
    casesTrack.style.animationPlayState = 'paused';
  });

  casesContainer.addEventListener('mouseleave', () => {
    casesTrack.style.animationPlayState = 'running';
  });
}


const texts = [
  "Sistemas Integrados",
  "Automação de Processos",
  "Integrações via API",
  "Dashboards Inteligentes",
  "Consultoria em SAP B1"
];

const typingElement = document.getElementById("typing-text");


const maxLength = Math.max(...texts.map(t => t.length));
typingElement.style.width = `${maxLength}ch`;
typingElement.style.display = "inline-block";
typingElement.style.whiteSpace = "nowrap";

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), 1500);
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();


setInterval(() => {
  const whatsapp = document.querySelector('.whatsapp-float');
  if (whatsapp) {
    whatsapp.classList.add('pulse');
    setTimeout(() => whatsapp.classList.remove('pulse'), 600);
  }
}, 2000);


// Máscara para telefone
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, ''); // remove tudo que não é número
  if (value.length > 11) value = value.slice(0, 11); // limita a 11 dígitos
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2');       // (47) 9...
  value = value.replace(/(\d{5})(\d{1,4})$/, '$1-$2');     // ...9770-4622
  e.target.value = value;
});
