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

    // Coloca la foto dentro de /assets
    photoSrc: "/assets/foto-juntos.jpg",

    // Video de YouTube. Cámbialo aquí si subes otra versión:
    videoUrl: "https://youtu.be/6eaF8RT0J0U",
  };

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const stages = Array.from(document.querySelectorAll("[data-stage]"));
  const photoNodes = document.querySelectorAll("[data-photo]");
  const videoWrap = document.querySelector("[data-video-wrap]");
  const videoEmbed = document.querySelector("[data-video-embed]");
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

        if (nextName === "finale") {
          unloadVideo();
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

  function youtubeId(url) {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.replace("/", "");
      }
      if (parsed.searchParams.get("v")) {
        return parsed.searchParams.get("v");
      }
      const parts = parsed.pathname.split("/").filter(Boolean);
      const embedIndex = parts.indexOf("embed");
      if (embedIndex >= 0) return parts[embedIndex + 1] || "";
    } catch (error) {
      return "";
    }
    return "";
  }

  function unloadVideo() {
    if (videoEmbed) videoEmbed.replaceChildren();
    videoReady = false;
  }

  function loadYouTube() {
    if (videoReady || !videoEmbed) return;

    const id = youtubeId(CONFIG.videoUrl);
    if (!id) return;

    const iframe = document.createElement("iframe");
    iframe.title = "Mi elección";
    iframe.src =
      "https://www.youtube-nocookie.com/embed/" +
      encodeURIComponent(id) +
      "?rel=0&modestbranding=1&playsinline=1";
    iframe.allow =
      "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.setAttribute("loading", "lazy");
    videoEmbed.appendChild(iframe);
    videoReady = true;
  }

  function revealVideo() {
    if (!videoWrap) return;

    loadYouTube();
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
    unloadVideo();

    if (videoWrap) {
      videoWrap.hidden = true;
      videoWrap.classList.remove("is-visible");
    }

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
