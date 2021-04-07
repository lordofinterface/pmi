document.addEventListener('DOMContentLoaded', function () {
  initTimelineScroll();
});

function initTimelineScroll() {
  const artistsBlock = document.querySelector('.history__timeline');
  const artistsTape = document.querySelector(
    '.history__timeline .timeline__path'
  );
  const yearsList = document.querySelectorAll('.timeline__col__year');
  let artistsTapeWidth = artistsTape.getBoundingClientRect().width + 800;

  function mouseMoveHandler(event) {
    let center = window.innerWidth / 2;

    yearsList.forEach(function (year) {
      const elBounds = year.getBoundingClientRect();
      const elLeftBound = elBounds.x;
      const elRightBound = elLeftBound + elBounds.width;

      if (center > elLeftBound && center < elRightBound) {
        year.style.transform = 'scale(2)';
      } else {
        year.style.transform = '';
      }
    });
  }

  if (window.innerWidth > 980) {
    artistsBlock.scrollLeft = 800;
    artistsBlock.addEventListener('scroll', mouseMoveHandler);
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) {
      artistsBlock.removeEventListener('scroll', mouseMoveHandler);
      artistsTapeWidth = artistsTape.getBoundingClientRect().width + 800;
      center = window.innerWidth / 2;
      artistsBlock.addEventListener('scroll', mouseMoveHandler);
    } else {
      artistsBlock.removeEventListener('scroll', mouseMoveHandler);
      yearsList.forEach(function (year) {
        year.style.transform = '';
      });
    }
  });
}
