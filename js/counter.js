// Função para animar cada contador
function animateCounter(id, addPlus = false) {
  const counter = document.getElementById(id);
  const target = +counter.getAttribute('data-target');
  const speed = 200; // quanto menor, mais rápido
  const increment = target / speed;

  const updateCount = () => {
    const current = +counter.innerText.replace("+", ""); // remove + se existir
    if(current < target) {
      counter.innerText = (addPlus ? "+" : "") + Math.ceil(current + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = (addPlus ? "+" : "") + target;
    }
  }

  // Observador para animar só quando entrar na tela
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 1});

  observer.observe(counter);
}

// Chama a função para cada contador
animateCounter('projetos', true);  // terá +
animateCounter('clientes', true);  // terá +
animateCounter('desde', false);    // não terá +