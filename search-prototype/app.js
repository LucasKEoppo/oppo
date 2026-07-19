import {
  getResourceType,
  getTypeFromUrl,
  buildResultsUrl,
} from './data.js';

const HISTORY_COLLAPSE_COUNT = 7;

const resourceType = getResourceType(getTypeFromUrl());
const searchInput = document.getElementById('search-input');
const historyList = document.getElementById('history-list');
const hotList = document.getElementById('hot-list');
const sectionHistory = document.getElementById('section-history');
const btnClearInput = document.getElementById('btn-clear-input');

let historyWords = [...resourceType.history];
let hotWords = resourceType.hotSearch.map((item) =>
  typeof item === 'string' ? item : item.word
);
let historyExpanded = false;

if (resourceType.placeholder) {
  searchInput.placeholder = resourceType.placeholder;
}

function renderHistory() {
  if (historyWords.length === 0) {
    sectionHistory.classList.add('hidden');
    return;
  }

  sectionHistory.classList.remove('hidden');
  const visible = historyExpanded
    ? historyWords
    : historyWords.slice(0, HISTORY_COLLAPSE_COUNT);
  const showExpand = !historyExpanded && historyWords.length > HISTORY_COLLAPSE_COUNT;

  historyList.innerHTML =
    visible.map((word) => `<button class="tag" data-word="${word}">${word}</button>`).join('') +
    (showExpand
      ? `<button class="tag tag-expand" id="btn-expand-history" aria-label="展开更多历史">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>`
      : '');

  historyList.querySelectorAll('.tag[data-word]').forEach((el) => {
    el.addEventListener('click', () => goSearch(el.dataset.word));
  });

  const expandBtn = document.getElementById('btn-expand-history');
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      historyExpanded = true;
      renderHistory();
    });
  }
}

function renderHotSearch() {
  hotList.innerHTML = hotWords
    .map((word) => `<button class="tag" data-word="${word}">${word}</button>`)
    .join('');

  hotList.querySelectorAll('.tag').forEach((el) => {
    el.addEventListener('click', () => goSearch(el.dataset.word));
  });
}

function shuffleHotWords() {
  const next = [...hotWords];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  hotWords = next;
  renderHotSearch();
}

function goSearch(query) {
  const q = query.trim();
  if (!q) return;
  window.location.href = buildResultsUrl(resourceType.id, q);
}

function updateClearBtn() {
  btnClearInput.classList.toggle('hidden', !searchInput.value);
}

renderHistory();
renderHotSearch();
updateClearBtn();

document.getElementById('btn-search').addEventListener('click', () => {
  goSearch(searchInput.value);
});

searchInput.addEventListener('input', updateClearBtn);

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') goSearch(searchInput.value);
});

btnClearInput.addEventListener('click', () => {
  searchInput.value = '';
  updateClearBtn();
  searchInput.focus();
});

document.getElementById('btn-clear-history').addEventListener('click', () => {
  historyWords = [];
  historyExpanded = false;
  renderHistory();
});

document.getElementById('btn-refresh-hot').addEventListener('click', shuffleHotWords);

document.getElementById('btn-back').addEventListener('click', () => {
  history.back();
});

searchInput.focus();
