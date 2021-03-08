document.addEventListener('DOMContentLoaded', function () {
  initCardsInfo();
});

function initCardsInfo() {
  const moreBtn = document.querySelectorAll('.artists__gallery__more');

  moreBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {showInfo(btn, event)});
  });

  document.addEventListener('mouseup', function () {
    closeAllInfoCards();
  });

  function showInfo(btn, event) {
    const infoCard = btn.nextElementSibling;
    if (!infoCard.classList.contains('artists__gallery__info_open')) {
      event.preventDefault();
      infoCard.classList.add('artists__gallery__info_open');
    }
  }

  function closeAllInfoCards() {
    const openInfoCards = document.querySelectorAll('.artists__gallery__info_open');
    openInfoCards.forEach(card => {
      card.classList.remove('artists__gallery__info_open');
    });
  }
}
