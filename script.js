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
  // EFEITO TILT 3D NOS CARDS
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

// ==========================
// ABRIR VÍDEO EM TELA CHEIA AO CLICAR
// ==========================
function abrirVideo(videoElem) {
  const src = videoElem.src;

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.95)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 99999;
  overlay.onclick = () => document.body.removeChild(overlay);

  const video = document.createElement('video');
  video.src = src;
  video.autoplay = true;
  video.muted = false;
  video.loop = true;
  video.style.maxWidth = '90%';
  video.style.maxHeight = '90%';
  video.style.borderRadius = '15px';
  video.style.pointerEvents = 'none'; // clique fecha overlay

  overlay.appendChild(video);
  document.body.appendChild(overlay);
}

// ==========================
// INTERATIVIDADE NOS VÍDEOS – FADE DE VOLUME AO PASSAR O MOUSE
// ==========================
const videos = document.querySelectorAll('.video-wrapper video');

videos.forEach(video => {
  // Começa silenciado
  video.muted = true;
  video.volume = 0; // volume inicial zero
  let volumeInterval;

  // Ao passar o mouse, aumenta o volume suavemente
  video.addEventListener('mouseenter', () => {
    video.muted = false;
    clearInterval(volumeInterval);
    volumeInterval = setInterval(() => {
      if (video.volume < 1) video.volume = Math.min(video.volume + 0.05, 1);
    }, 50);
  });

  // Ao sair do mouse, diminui o volume suavemente
  video.addEventListener('mouseleave', () => {
    clearInterval(volumeInterval);
    volumeInterval = setInterval(() => {
      if (video.volume > 0) video.volume = Math.max(video.volume - 0.05, 0);
      if (video.volume === 0) video.muted = true;
    }, 50);
  });
});
