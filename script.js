const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');

if (toggle) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

if (links) {
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const form = document.querySelector('.cta__form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks! We will reach out shortly.');
  });
}
