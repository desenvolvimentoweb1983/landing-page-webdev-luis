/* ==========================
   WHATSAPP
========================== */
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

/* ==========================
   CARDS – INTERAÇÃO SUAVE
========================== */
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.transform = `perspective(800px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
  });
});

/* ==========================
   LOGO FLUTUANTE
========================== */
const logo = document.querySelector(".logo-float");

if (logo) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    logo.style.opacity = scrollY > 80 ? "1" : "0";
  });
}

/* ==========================
   OVERLAY DE VÍDEO (FULLSCREEN CONTROLADO)
========================== */
let overlayAtivo = null;

function abrirVideo(videoElem) {
  if (overlayAtivo) return;

  const overlay = document.createElement("div");
  overlayAtivo = overlay;

  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.92)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "100000";

  const video = document.createElement("video");
  video.src = videoElem.src;
  video.autoplay = true;
  video.controls = true;
  video.playsInline = true;
  video.controlsList = "nodownload nofullscreen noremoteplayback";
  video.style.maxWidth = "90vw";
  video.style.maxHeight = "90vh";
  video.style.borderRadius = "16px";
  video.style.background = "#000";

  overlay.appendChild(video);
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  /* FECHAR AO CLICAR FORA */
  overlay.addEventListener("click", e => {
    if (e.target === overlay) fecharOverlay();
  });

  /* ESC NO DESKTOP */
  document.addEventListener("keydown", escHandler);

  /* BOTÃO VOLTAR DO CELULAR */
  history.pushState({ video: true }, "");
  window.addEventListener("popstate", fecharOverlay);
}

function fecharOverlay() {
  if (!overlayAtivo) return;

  document.body.removeChild(overlayAtivo);
  overlayAtivo = null;

  document.body.style.overflow = "";
  document.removeEventListener("keydown", escHandler);
  window.removeEventListener("popstate", fecharOverlay);
}

function escHandler(e) {
  if (e.key === "Escape") fecharOverlay();
}

/* ==========================
   VÍDEOS DA PÁGINA (ÁUDIO UX)
========================== */
const videos = document.querySelectorAll(".video-wrapper video");

videos.forEach(video => {
  video.muted = true;
  video.playsInline = true;
  video.controls = false;

  /* Desktop – hover */
  video.addEventListener("mouseenter", () => {
    if (window.innerWidth >= 768) {
      video.muted = false;
      fadeVolume(video, 0.4, 300);
    }
  });

  video.addEventListener("mouseleave", () => {
    if (window.innerWidth >= 768) {
      fadeVolume(video, 0, 300, true);
    }
  });

  /* Mobile – toque consciente */
  video.addEventListener("click", () => {
    video.muted = false;
    fadeVolume(video, 0.4, 300);
  });
});

/* ==========================
   FUNÇÃO PARA FADE DE VOLUME SUAVE
========================== */
function fadeVolume(video, targetVolume, duration = 300, muteIfZero = false) {
  let interval = 50;
  let step = (targetVolume - video.volume) / (duration / interval);

  const fade = setInterval(() => {
    let newVolume = video.volume + step;
    if ((step > 0 && newVolume >= targetVolume) || (step < 0 && newVolume <= targetVolume)) {
      video.volume = targetVolume;
      if (muteIfZero && targetVolume === 0) video.muted = true;
      clearInterval(fade);
    } else {
      video.volume = newVolume;
    }
  }, interval);
}
