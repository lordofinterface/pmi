document.addEventListener('DOMContentLoaded', function () {
  initDirectionsHandlers();
});

function initDirectionsHandlers() {
  const directionsBlocks = document.querySelectorAll('.routes__block');
  directionsBlocks.forEach((block) => {
    block.addEventListener('click', () => {
      openDirection(block);
    });
  });
}

function openDirection(block) {
  const openBlocks = document.querySelectorAll('.routes__block_open');

  openBlocks.forEach((el) => {
    el.classList.remove('routes__block_open');
  });

  block.classList.add('routes__block_open');
}
