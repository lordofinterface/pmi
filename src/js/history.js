document.addEventListener('DOMContentLoaded', function () {
  initTimelineScroll();
});

function initTimelineScroll() {
  const artistsBlock = document.querySelector('.history__timeline');
  const artistsTape = document.querySelector(
    '.history__timeline .timeline__path'
  );
  const yearsList = document.querySelectorAll('.timeline__col__year');
  let artistsTapeWidth = artistsTape.getBoundingClientRect().width;

  function mouseMoveHandler(event) {
    const percent = parseFloat(event.clientX / window.innerWidth);
    let center = window.innerWidth / 2;
    artistsBlock.scrollLeft =
      (artistsTapeWidth - window.innerWidth + 30) * percent;

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
    artistsBlock.addEventListener('mousemove', mouseMoveHandler);
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) {
      artistsBlock.removeEventListener('mousemove', mouseMoveHandler);
      artistsTapeWidth = artistsTape.getBoundingClientRect().width;
      center = window.innerWidth / 2;
      artistsBlock.addEventListener('mousemove', mouseMoveHandler);
    } else {
      artistsBlock.removeEventListener('mousemove', mouseMoveHandler);
      yearsList.forEach(function (year) {
        year.style.transform = '';
      });
    }
  });
}
