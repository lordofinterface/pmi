document.addEventListener('DOMContentLoaded', function () {
  initMoreBtns();
});

function initMoreBtns() {
  const moreBtns = document.querySelectorAll('.control__more');
  const closeBtns = document.querySelectorAll('.cotrol__networks__close');

  moreBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      btn.nextElementSibling.classList.add('cotrol__networks_open');
    })
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      btn.parentElement.classList.remove('cotrol__networks_open');
    })
  });
}