import {
  getResourceType,
  getTypeFromUrl,
  buildResultsUrl,
} from './data.js';

const resourceType = getResourceType(getTypeFromUrl());
const searchInput = document.getElementById('search-input');
const historyList = document.getElementById('history-list');
const hotGrid = document.getElementById('hot-grid');

searchInput.placeholder = resourceType.placeholder;

function renderHistory() {
  historyList.innerHTML = resourceType.history
    .map((word) => `<button class="tag" data-word="${word}">${word}</button>`)
    .join('');
}

function renderHotSearch() {
  hotGrid.innerHTML = resourceType.hotSearch
    .map(
      (item) => `
      <button class="hot-grid-item" data-word="${item.word}">
        <span class="hot-grid-text">${item.word}</span>
      </button>`
    )
    .join('');
}

function goSearch(query) {
  const q = query.trim();
  if (!q) return;
  window.location.href = buildResultsUrl(resourceType.id, q);
}

function bindSearchClicks() {
  document.querySelectorAll('.tag, .hot-grid-item').forEach((el) => {
    el.addEventListener('click', () => goSearch(el.dataset.word));
  });
}

renderHistory();
renderHotSearch();
bindSearchClicks();

document.getElementById('btn-search').addEventListener('click', () => {
  goSearch(searchInput.value);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') goSearch(searchInput.value);
});

document.getElementById('btn-clear-history').addEventListener('click', () => {
  historyList.innerHTML = '';
});

document.getElementById('btn-back').addEventListener('click', () => {
  history.back();
});

searchInput.focus();
