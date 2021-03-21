document.addEventListener('DOMContentLoaded', function () {
  initCardsInfo();
});

function initCardsInfo() {
  const moreBtn = document.querySelectorAll('.artists__gallery__more');
  const modal = document.querySelector('.artists__modal');
  const closeModal = document.querySelector('.artists__modal__close');
  const infoModal = document.querySelector('.artists__modal__wrapper_info');
  const imgModal = document.querySelector('.artists__modal__wrapper_img');

  moreBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      showInfo(btn, event);
    });
  });

  document.addEventListener('mouseup', function () {
    closeAllInfoCards();
  });

  closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
    document.querySelector('html').classList.remove('lock');
  });

  function showInfo(btn, event) {
    if (window.innerWidth <= 760) {
      const currentColor = getComputedStyle(btn).backgroundColor
      const currentInfo = btn.nextElementSibling.cloneNode(true);
      const currentImg = btn.previousElementSibling.cloneNode(true);
      document.querySelector('html').classList.add('lock');
      modal.style.display = 'flex';
      closeModal.style.backgroundColor = currentColor;
      infoModal.style.backgroundColor = currentColor;
      imgModal.innerHTML = '';
      imgModal.append(currentImg);
      infoModal.innerHTML = '';
      infoModal.append(currentInfo);
    } else {
      const infoCard = btn.nextElementSibling;
      if (!infoCard.classList.contains('artists__gallery__info_open')) {
        event.preventDefault();
        infoCard.classList.add('artists__gallery__info_open');
      }
    }
  }

  function closeAllInfoCards() {
    const openInfoCards = document.querySelectorAll(
      '.artists__gallery__info_open'
    );
    openInfoCards.forEach((card) => {
      card.classList.remove('artists__gallery__info_open');
    });
  }
}
