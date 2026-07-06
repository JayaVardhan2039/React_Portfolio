/* =====================================================================
   Loads GSAP + ScrollTrigger from the same CDN build the original
   static theme-light.html used, once per page load, and resolves with
   the shared window.gsap instance once both are ready and the plugin
   is registered.
   ===================================================================== */

let gsapPromise = null;

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') return resolve();
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export function loadGsap() {
  if (gsapPromise) return gsapPromise;

  gsapPromise = Promise.resolve()
    .then(() => loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'))
    .then(() => loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'))
    .then(() => {
      if (window.gsap && window.ScrollTrigger && !window.gsap.__jvScrollTriggerRegistered) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        window.gsap.__jvScrollTriggerRegistered = true;
      }
      return { gsap: window.gsap, ScrollTrigger: window.ScrollTrigger };
    });

  return gsapPromise;
}
