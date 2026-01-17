// ==========================
// REDIRECIONAMENTO WHATSAPP
// ==========================
function whatsServico() {
  window.open(
    "https://wa.me/5519974082724?text=Olá!%20Estou%20interessado%20no%20SERVIÇO%20que%20vi%20no%20site",
    "_blank"
  );
}

function whatsProduto() {
  window.open(
    "https://wa.me/5519974082724?text=Olá!%20Estou%20interessado%20no%20PRODUTO%20que%20vi%20no%20site",
    "_blank"
  );
}

// ==========================
// INTERAÇÃO COM OS CARDS
// ==========================

const cards = document.querySelectorAll('.card');

cards.forEach(card => {

  // ==========================
  // EFEITO TILT 3D NOS CARDS
  // ==========================
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });

});

// ==========================
// PARALLAX LEVE NAS IMAGENS DOS CARDS
// ==========================
function parallaxCards(selector, speed = 0.01) {
  const elements = document.querySelectorAll(selector + ' img');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    elements.forEach((el, index) => {
      el.style.transform = `translateY(${scrollY * speed * (index + 1)}px)`;
    });
  });
}

parallaxCards('.card', 0.01);

// ==========================
// WHATSAPP FLUTUANTE COM PARTÍCULAS
// ==========================
const whatsappBtn = document.querySelector('.whatsapp-float');

if (whatsappBtn) {
  whatsappBtn.addEventListener('mouseenter', () => {
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('span');
      particle.classList.add('particle');

      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';

      whatsappBtn.appendChild(particle);

      setTimeout(() => particle.remove(), 800);
    }
  });
}

// ==========================
// LOGO FLUTUANTE INTERATIVO
// ==========================

window.addEventListener("load", () => {
  const logo = document.querySelector(".logo-float");

  if (!logo) return;

  // Aparece após 2 segundos
  setTimeout(() => {
    logo.classList.add("ativo");
  }, 2000);
});

// Esconder quando chegar no final da página
window.addEventListener("scroll", () => {
  const logo = document.querySelector(".logo-float");

  if (!logo) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.body.offsetHeight;

  if (scrollPosition >= pageHeight - 100) {
    logo.classList.remove("ativo");
  } else {
    logo.classList.add("ativo");
  }
});
