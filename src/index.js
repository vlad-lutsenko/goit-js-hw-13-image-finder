import fetchFunc from './tools/apiService';
import inputForm from './tools/inputForm.hbs';
import card from './tools/imageCard.hbs';
import './styles.css';

let page = 1;

const root = document.querySelector('.root');
const key = '15871594-e6aabc3dbb9db4d877f262370';

function renderInputForm() {
  root.insertAdjacentHTML('beforeend', inputForm());
}
renderInputForm();

const input = document.querySelector('input');
const form = document.querySelector('#search-form');
const gallery = document.createElement('ul');
root.append(gallery);
gallery.classList.add('gallery');

function moreBtnCreate() {
  if (!document.querySelector('.more')) {
    const moreBtn = document.createElement('button');
    moreBtn.classList.add('more');
    root.append(moreBtn);
    moreBtn.textContent = 'тиць';
  }
}

function renderImages(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  const query = input.value;
  fetchFunc(query, page, key).then(hits => {
    const markup = card(hits);
    gallery.innerHTML = markup;
    moreBtnCreate();
    document.querySelector('.more').addEventListener('click', renderMoreImages);
  });
}

function renderMoreImages() {
  page += 1;
  const query = input.value;
  fetchFunc(query, page, key).then(hits => {
    const markup = card(hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    window.scrollTo({
      top: +window.scrollY + 600,
      behavior: 'smooth',
    });
  });
}

form.addEventListener('submit', renderImages);
