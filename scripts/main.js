(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");
  root.dataset.theme = initial;

  const toggle = document.querySelector("[data-theme-toggle]");
  if(toggle){
    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      localStorage.setItem("theme", next);
    });
  }

  const menuBtn = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if(menuBtn && mobileNav){
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      mobileNav.hidden = expanded;
    });
  }

  const cookieConsentCssId = "cookieconsent-css";
  const cookieConsentScriptId = "cookieconsent-js";
  const cookieConsentCdnCss = "https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css";
  const cookieConsentCdnJs = "https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js";

  const initializeCookieConsent = () => {
    if(!window.cookieconsent || !window.cookieconsent.initialise){
      return;
    }
    window.cookieconsent.initialise({
      palette: {
        popup: {
          background: "#0f172a",
          text: "#f8fafc"
        },
        button: {
          background: "#16a34a",
          text: "#ffffff"
        }
      },
      theme: "classic",
      position: "bottom",
      content: {
        message: "Usamos cookies para melhorar sua experiência e analisar o tráfego do site.",
        dismiss: "Aceitar",
        link: "Política de privacidade",
        href: "/politica-de-privacidade.html"
      }
    });
  };

  if(!document.getElementById(cookieConsentCssId)){
    const cookieCss = document.createElement("link");
    cookieCss.id = cookieConsentCssId;
    cookieCss.rel = "stylesheet";
    cookieCss.href = cookieConsentCdnCss;
    document.head.appendChild(cookieCss);
  }

  if(window.cookieconsent && window.cookieconsent.initialise){
    initializeCookieConsent();
  } else if(!document.getElementById(cookieConsentScriptId)){
    const cookieScript = document.createElement("script");
    cookieScript.id = cookieConsentScriptId;
    cookieScript.src = cookieConsentCdnJs;
    cookieScript.defer = true;
    cookieScript.onload = initializeCookieConsent;
    document.head.appendChild(cookieScript);
  }
})();
