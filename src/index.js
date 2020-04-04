import fetchFunc from './tools/apiService';
import card from './tools/imageCard.hbs';
import './styles.css';

let page = 1;

const root = document.querySelector('.root');
const key = '15871594-e6aabc3dbb9db4d877f262370';

const input = document.querySelector('input');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

function moreBtnCreate() {
  if (!document.querySelector('.more')) {
    const moreBtn = document.createElement('button');
    moreBtn.classList.add('more');
    root.append(moreBtn);
    moreBtn.textContent = 'тиць';
  }
}

function renderImages(e) {
  localStorage.removeItem('query');
  e.preventDefault();
  gallery.innerHTML = '';
  const query = input.value;
  localStorage.setItem('query', query);
  fetchFunc(query, page, key).then(hits => {
    const markup = card(hits);
    gallery.innerHTML = markup;
    moreBtnCreate();
    document.querySelector('.more').addEventListener('click', renderMoreImages);
    form.reset();
  });
}

function renderMoreImages() {
  page += 1;
  const query = localStorage.getItem('query');
  fetchFunc(query, page, key).then(hits => {
    const markup = card(hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    window.scrollBy({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  });
}

form.addEventListener('submit', renderImages);
