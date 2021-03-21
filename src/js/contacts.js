document.addEventListener('DOMContentLoaded', function () {
  initMapParallax();
});

function initMapParallax() {
  window.addEventListener('scroll', throttle(parallax, 14));

  function throttle(fn, wait) {
    var time = Date.now();
    return function () {
      if (time + wait - Date.now() < 0) {
        fn();
        time = Date.now();
      }
    };
  }

  function parallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.contacts__info__map');
    const speed = window.innerWidth > 920 ? 0.13 : 0;
    const coords = -scrolled * speed + 'px';
    parallax.style.backgroundPositionY = coords;
  }
}
