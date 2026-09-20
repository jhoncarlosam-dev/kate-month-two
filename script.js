(() => {
  "use strict";

  /**
   * ============================================================
   * PERSONALIZA AQUÍ
   * Cambia el nombre, las rutas de los archivos y, si quieres,
   * el resto de textos de la experiencia.
   * ============================================================
   */
  const CONFIG = {
    // Cambia [NOMBRE] por el nombre de tu novia:
    herName: "Kate",

    // Coloca estos archivos dentro de /assets
    photoSrc: "/assets/foto-juntos.jpg",
    videoSrc: "/assets/video-farquaad.mp4",
  };

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const stages = Array.from(document.querySelectorAll("[data-stage]"));
  const photoNodes = document.querySelectorAll("[data-photo]");
  const video = document.getElementById("choice-video");
  const videoWrap = document.querySelector("[data-video-wrap]");
  const videoFallback = document.querySelector("[data-video-fallback]");
  const revealVideoBtn = document.querySelector('[data-action="reveal-video"]');

  let currentStage = "cover";
  let isTransitioning = false;
  let videoReady = false;

  document.querySelectorAll("[data-her-name]").forEach((node) => {
    node.textContent = CONFIG.herName;
  });

  photoNodes.forEach((img) => {
    const frame = img.closest("[data-photo-frame]");
    const fallback = frame ? frame.querySelector(".photo-fallback") : null;

    img.addEventListener("error", () => {
      if (frame) frame.classList.add("is-missing");
      if (fallback) fallback.hidden = false;
    });

    img.src = CONFIG.photoSrc;
  });

  function getStage(name) {
    return stages.find((stage) => stage.dataset.stage === name) || null;
  }

  function focusStage(stage) {
    const heading = stage.querySelector("h1, h2");
    if (heading) heading.focus({ preventScroll: true });
  }

  function goTo(nextName) {
    if (isTransitioning || nextName === currentStage) return;

    const current = getStage(currentStage);
    const next = getStage(nextName);
    if (!current || !next) return;

    isTransitioning = true;
    current.classList.add("is-leaving");
    current.classList.remove("is-active");

    const reveal = () => {
      current.hidden = true;
      current.classList.remove("is-leaving");

      next.hidden = false;
      next.scrollTop = 0;

      requestAnimationFrame(() => {
        next.classList.add("is-active");
        currentStage = nextName;
        focusStage(next);
        isTransitioning = false;

        if (nextName === "finale" && video) {
          video.pause();
        }

        if (nextName === "cover") {
          resetExperience();
        }
      });
    };

    if (reduceMotion) {
      reveal();
      return;
    }

    window.setTimeout(reveal, 620);
  }

  function prepareVideoMetadata() {
    if (videoReady || !video) return;
    video.preload = "metadata";
    video.poster = CONFIG.photoSrc;
    video.setAttribute("src", CONFIG.videoSrc);
    videoReady = true;
  }

  function revealVideo() {
    if (!videoWrap || !video) return;

    prepareVideoMetadata();
    videoWrap.hidden = false;
    videoWrap.classList.add("is-visible");

    if (revealVideoBtn) {
      revealVideoBtn.hidden = true;
    }

    document.querySelectorAll("[data-choice-intro]").forEach((node) => {
      node.hidden = true;
    });

    const choiceTitle = document.getElementById("choice-title");
    if (choiceTitle) {
      choiceTitle.textContent = "Esta es mi elección.";
    }
  }

  function resetExperience() {
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }

    videoReady = false;

    if (videoWrap) {
      videoWrap.hidden = true;
      videoWrap.classList.remove("is-visible");
    }

    if (videoFallback) {
      videoFallback.hidden = true;
    }

    const frame = video && video.closest(".video-frame");
    if (frame) frame.classList.remove("is-missing");

    if (revealVideoBtn) {
      revealVideoBtn.hidden = false;
    }

    document.querySelectorAll("[data-choice-intro]").forEach((node) => {
      node.hidden = false;
    });

    const choiceTitle = document.getElementById("choice-title");
    if (choiceTitle) {
      choiceTitle.textContent = "Si tuviera que elegir nuevamente...";
    }

    document
      .querySelectorAll("[data-stage='letter'] .letter p, .finale-line")
      .forEach((node) => {
        node.style.animation = "none";
        void node.offsetWidth;
        node.style.animation = "";
      });
  }

  if (video) {
    video.addEventListener("error", () => {
      if (!video.getAttribute("src")) return;
      const frame = video.closest(".video-frame");
      if (frame) frame.classList.add("is-missing");
      if (videoFallback) videoFallback.hidden = false;
    });
  }

  document.addEventListener("click", (event) => {
    const nextBtn = event.target.closest("[data-next]");
    if (nextBtn) {
      goTo(nextBtn.dataset.next);
      return;
    }

    const actionBtn = event.target.closest("[data-action]");
    if (!actionBtn) return;

    if (actionBtn.dataset.action === "reveal-video") {
      revealVideo();
      return;
    }

    if (actionBtn.dataset.action === "restart") {
      goTo("cover");
    }
  });
})();
