import {
  getResourceType,
  getTypeFromUrl,
  buildResultsUrl,
} from './data.js';

const resourceType = getResourceType(getTypeFromUrl());
const searchInput = document.getElementById('search-input');
const historyList = document.getElementById('history-list');

searchInput.placeholder = resourceType.placeholder;

function renderHistory() {
  historyList.innerHTML = resourceType.history
    .map(
      (word) =>
        `<button class="tag" data-word="${word}">${word}</button>`
    )
    .join('');
}

function renderHotList(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = items
    .map(
      (item) => `
      <li class="hot-item" data-word="${item.word}">
        <span class="hot-rank rank-${item.rank}">${item.rank}</span>
        <span class="hot-word">${item.word}</span>
        <span class="hot-heat">${item.heat}</span>
      </li>`
    )
    .join('');
}

function goSearch(query) {
  const q = query.trim();
  if (!q) return;
  window.location.href = buildResultsUrl(resourceType.id, q);
}

renderHistory();
renderHotList('hot-comprehensive', resourceType.hotComprehensive);
renderHotList('hot-rising', resourceType.hotRising);

document.getElementById('btn-search').addEventListener('click', () => {
  goSearch(searchInput.value);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') goSearch(searchInput.value);
});

document.querySelectorAll('.tag, .hot-item').forEach((el) => {
  el.addEventListener('click', () => goSearch(el.dataset.word));
});

document.getElementById('btn-clear-history').addEventListener('click', () => {
  historyList.innerHTML = '';
});

document.getElementById('btn-back').addEventListener('click', () => {
  history.back();
});

searchInput.focus();
