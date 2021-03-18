document.addEventListener('DOMContentLoaded', function () {
  initMenu();
});

function initMenu() {
  const menu = document.querySelector('.menu');
  const menuTop = document.querySelector('.menu__top');

  menuTop.addEventListener('click', () => {
    menu.classList.toggle('menu_open');
    document.querySelector('html').classList.toggle('lock');
  });
}
