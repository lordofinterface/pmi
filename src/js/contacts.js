document.addEventListener('DOMContentLoaded', function () {
  initMapParallax();
});

function initMapParallax() {
  const container = document.querySelector('.contacts__info__map');
  container.addEventListener("mousemove", parallax);

  function parallax(e) {
      let _w = window.innerWidth/2;
      let _h = window.innerHeight/2;
      let _mouseX = e.clientX;
      let _mouseY = e.clientY;
      let blobCoords = `${50 - (_mouseX - _w) * 0.05}% ${10 - (_mouseY - _h) * 0.05}%`;
      let x = `${blobCoords}`;
      container.style.backgroundPosition = x;
  }
}