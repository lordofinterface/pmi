document.addEventListener('DOMContentLoaded', function () {
  initTopSlider();
  initNumbersSlider();
  initMobileNumbersSlider();
  initVinylOpen();
  initFormProgress();
  Player.init();
  initParallax();
});

function initTopSlider() {
  const leftArrow = document.querySelector('.main__gallery__arrow_left');
  const rightArrow = document.querySelector('.main__gallery__arrow_right');
  const leftMobArrow = document.querySelector('.main__gallery__mobarrow_left');
  const rightMobArrow = document.querySelector('.main__gallery__mobarrow_right');
  const counter = document.querySelector('.main__gallery__counter');
  const topSlider = new Splide('.main__gallery .splide', {
    type: 'loop',
    pagination: false,
    arrows: false,
  }).mount();
  updateCounter();

  leftArrow.addEventListener('click', function () {
    topSlider.go(topSlider.index - 1);
    updateCounter();
  });

  rightArrow.addEventListener('click', function () {
    topSlider.go(topSlider.index + 1);
    updateCounter();
  });

  leftMobArrow.addEventListener('click', function () {
    topSlider.go(topSlider.index - 1);
  });
  
  rightMobArrow.addEventListener('click', function () {
    topSlider.go(topSlider.index + 1);
  });

  topSlider.on( 'move', function() {
    updateCounter();
    setTimeout(() => {
      Player.update();
    }, 500);
  });

  function updateCounter() {
    counter.innerHTML = `${topSlider.index + 1}/${topSlider.length}`;
  }
}

function initMobileNumbersSlider() {
  const slides = document.querySelectorAll('.main__numbers_mobile .splide .splide__slide');
  const slideTitle = document.querySelector('.main__numbers_mobile .numbers__title');
  const slideNextText = document.querySelector('.main__numbers_mobile .numbers__next__text');
  const slideNextBtn = document.querySelector('.main__numbers_mobile .numbers__next');
  const mobileNumbersSlider = new Splide('.main__numbers_mobile .splide', {
    pagination: false,
    type: 'loop',
    arrows: false,
  }).mount();

  updateTitleAndNext();

  mobileNumbersSlider.on( 'move', function() {
    updateTitleAndNext();
  });

  slideNextBtn.addEventListener('click', function () {
    mobileNumbersSlider.go(mobileNumbersSlider.index + 1);
  })

  function updateTitleAndNext() {
    const index = mobileNumbersSlider.index;
    const currentSlide = slides[index];
    const nextSlide = slides[index + 1] || slides[0];
    slideTitle.innerHTML = currentSlide.getAttribute('data-title');
    slideNextText.innerHTML = nextSlide.getAttribute('data-title');
  }
}

function initNumbersSlider() {
  const numbersSlider = new Splide('.numbers__slides .splide', {
    pagination: false,
    arrows: false,
    drag: false,
  }).mount();
  const lastItem = document.querySelector('.main__numbers_desktop .numbers__item_noborder');
  const container = document.querySelector('.main__numbers_desktop');
  const bgColors = ['#6801e6', '#EF8632', '#79C2BE', '#DDCEF0'];

  initNumbersMenu();

  function initNumbersMenu() {
    const menuItems = document.querySelectorAll(
      '.main__numbers .numbers__item'
    );
    menuItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        sectionClick(index, item);
      });
    });
  }

  function sectionClick(index, item) {
    removeActiveClassList();
    item.classList.add('numbers__item_active');
    setArrowPosition(index);
    numbersSlider.go(index);
    container.style.backgroundColor = bgColors[index];
  }

  function removeActiveClassList() {
    const menuItems = document.querySelectorAll(
      '.main__numbers .numbers__item'
    );
    menuItems.forEach((item) => {
      item.classList.remove('numbers__item_active');
    });
  }

  function setArrowPosition(index) {
    const menuOffsetLeft = document.querySelector('.numbers__menu').getBoundingClientRect().left + 5;
    const arrow = document.querySelector('.numbers__arrow');
    const path = document.querySelector('.numbers__path');
    const icon = document.querySelectorAll('.numbers__arrow svg path');
    const currentItem = document.querySelector(`.main__numbers .numbers__item:nth-child(${index + 1}) span`);
    const itemPosition = currentItem.getBoundingClientRect();
    const initPathWidth = 60;
    const arrowWidth = 60;
    const additionalOffset = 20;

    const arrowValue = itemPosition.left - menuOffsetLeft - arrowWidth - additionalOffset;
    arrow.style.transform = `translateX(${index === 0 ? 0 : arrowValue}px)`;
    arrow.style.backgroundColor = index === 0 ? '#DDCEF0' : '#6801E6';
    const pathValue = itemPosition.left - menuOffsetLeft - additionalOffset;
    path.style.width = `${index === 0 ? initPathWidth : pathValue}px`;

    icon.forEach((iconPath) => {
      iconPath.style.stroke = index === 0 ? '#6801E6' : '#DDCEF0';
    });
  }
}

function initVinylOpen() {
  const vinyl = document.querySelector('.join__inputs');
  const vinylTopOffset = vinyl.offsetTop;

  document.addEventListener('scroll', scrollHandler);

  function scrollHandler() {
    if (vinylTopOffset < window.scrollY + window.innerHeight / 2) {
      vinyl.classList.add('join__inputs_open');
      document.removeEventListener('scroll', scrollHandler);
    }
  }
}

function initFormProgress() {
  const name = document.querySelector('.join__inputs__input[name="name"]');
  const email = document.querySelector('.join__inputs__input[name="email"]');
  const fileBtn = document.querySelector('.join .button_file');
  const file = document.querySelector('.join .button_file input');
  const fileText = document.querySelector('.join .button_file span');
  const fileRemoveBtn = document.querySelector(
    '.join .button_file .button__remove'
  );
  const progressBar = document.querySelector('.join__slider');
  let progressIndex;

  checkProgress();

  name.addEventListener('input', checkProgress);
  email.addEventListener('input', checkProgress);
  file.addEventListener('change', checkProgress);
  fileRemoveBtn.addEventListener('click', function (event) {
    event.preventDefault();
    file.value = '';
    fileBtn.classList.remove('button_uploaded');
    fileText.innerHTML = 'Загрузить запись';
    file.removeAttribute('disabled');
    checkProgress();
  });

  function checkProgress() {
    progressIndex = 0;
    progressBar.classList.remove(
      'join__slider_start',
      'join__slider_mid',
      'join__slider_finish'
    );

    if (name.value.length) progressIndex++;
    if (email.validity.valid) progressIndex++;
    if (file.files.length) {
      progressIndex++;
      fileText.innerHTML = 'Запись загружена!';
      fileBtn.classList.add('button_uploaded');
      file.setAttribute('disabled', true);
    } else if (fileBtn.classList.contains('button_uploaded')) {
      fileText.innerHTML = 'Загрузить запись';
      file.removeAttribute('disabled');
    }

    if (progressIndex === 1) progressBar.classList.add('join__slider_start');
    if (progressIndex === 2) progressBar.classList.add('join__slider_mid');
    if (progressIndex === 3) progressBar.classList.add('join__slider_finish');
  }
}

const Player = {
  container: document.querySelector('.player'),
  playBtn: document.querySelector('.player .player__button_play'),
  pauseBtn: document.querySelector('.player .player__button_pause'),
  unmuteBtn: document.querySelector('.player .player__volume_mute'),
  muteBtn: document.querySelector('.player .player__volume_unmute'),
  playerTitle: document.querySelector('.player .player__title'),
  song: null,
  init: function () {
    Player.playBtn.addEventListener('click', Player.play);
    Player.pauseBtn.addEventListener('click', Player.pause);
    Player.muteBtn.addEventListener('click', Player.mute);
    Player.unmuteBtn.addEventListener('click', Player.unmute);
    Player.song = new Audio();

    if (Player.song.canPlayType('audio/mpeg;')) {
      Player.song.type = 'audio/mpeg';
    } else {
      Player.song.type = 'audio/ogg';
    }

    Player.load();
    
    document.addEventListener('scroll', function (e) {
      const artistsBlock = document.querySelector('.main__artists_desktop');
      const artistsBlockBounds = artistsBlock.getBoundingClientRect();
      const edge = artistsBlock.offsetTop + artistsBlockBounds.height;

      if (window.scrollY + window.innerHeight >= edge) {
        Player.lockPosition(edge - 90);
      } else {
        Player.unlockPosition();
      }
    });
  },
  lockPosition: function (y) {
    Player.container.style.position = 'absolute';
    Player.container.style.top = y + 'px';
    Player.container.style.bottom = 'auto';
  },
  unlockPosition: function () {
    Player.container.style.position = 'fixed';
    Player.container.style.top = 'auto';
    Player.container.style.bottom = '20px';
  },
  play: function () {
    Player.container.classList.add('player_playing');
    Player.song.play();
  },
  pause: function () {
    Player.container.classList.remove('player_playing');
    Player.song.pause();
  },
  mute: function() {
    Player.container.classList.add('player_muted');
    Player.song.volume = 0;
  },
  unmute: function() {
    Player.container.classList.remove('player_muted');
    Player.song.volume = 1;
  },
  load: function () {
    const audioUrl = document.querySelector('.splide__slide.main__block.is-active').getAttribute('data-track-url');
    const audioName = document.querySelector('.splide__slide.main__block.is-active').getAttribute('data-track-name');
    Player.playerTitle.innerHTML = audioName;
    Player.song.src = audioUrl;
    Player.song.load();
  },
  update: function () {
    Player.load();
    if (Player.container.classList.contains('player_playing')) {
      Player.play();
    }
  }
}

function initParallax() {
  const container = document.querySelector('.main__numbers_desktop');
  const elems = document.querySelectorAll(".main__numbers__blob");
  const slidesText = document.querySelectorAll('.numbers__slide');
  container.addEventListener("mousemove", parallax);

  function parallax(e) {
      let _w = window.innerWidth/2;
      let _h = window.innerHeight/2;
      let _mouseX = e.clientX;
      let _mouseY = e.clientY;
      let blobCoords = `${(_mouseX - _w) * 0.06}%, ${(_mouseY - _h) * 0.06}%`;
      let textCoords = `${(_mouseX - _w) * 0.005}%, ${(_mouseY - _h) * 0.06}%`;
      elems.forEach(function (el) {
        el.style.transform = `translate(${blobCoords})`;
      });
      slidesText.forEach(function (el) {
        el.style.transform = `translate(${textCoords})`;
      });
  }
}