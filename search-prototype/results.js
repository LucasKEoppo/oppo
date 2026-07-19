import {
  getResourceType,
  getTypeFromUrl,
  buildResultsUrl,
  buildSearchUrl,
  searchResources,
  isPaidResource,
} from './data.js?v=16';

const typeId = getTypeFromUrl();
const resourceType = getResourceType(typeId);
const params = new URLSearchParams(window.location.search);
const query = params.get('q') || '简约';

const searchInput = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');
const btnClearInput = document.getElementById('btn-clear-input');

const results = searchResources(typeId, query);

searchInput.value = query;
searchInput.placeholder =
  resourceType.id === 'wallpaper' ? '搜索在线壁纸' : resourceType.placeholder;

/** 小刷子图标 */
const brushIconSvg = `
  <svg class="brush-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 14c-1.5 1.2-2.2 3-2.2 4.6 0 .8.6 1.4 1.4 1.4 1.7 0 3.5-.8 4.7-2.3L17.8 9.8a2.2 2.2 0 0 0-3.1-3.1L7 14z" fill="currentColor"/>
    <path d="M15.2 5.5l3.3 3.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>
`;

/** 左上角标识：全部展示刷子；付费资源展示「刷子 + 付费」胶囊 */
function renderCornerBadge(item) {
  if (isPaidResource(item)) {
    return `<span class="corner-badge badge-paid">${brushIconSvg}<span>付费</span></span>`;
  }
  return `<span class="corner-badge badge-brush">${brushIconSvg}</span>`;
}

function renderOfficialCard(item) {
  return `
    <div class="result-card result-card-official">
      <div class="result-thumb official-thumb" style="background:${item.color}">
        ${renderCornerBadge(item)}
        <span class="official-mark">系统</span>
      </div>
      <p class="result-title">${item.title}</p>
    </div>`;
}

function renderNormalCard(item) {
  return `
    <div class="result-card">
      <div class="result-thumb" style="background:${item.color}">
        ${renderCornerBadge(item)}
      </div>
      <p class="result-title">${item.title}</p>
    </div>`;
}

function renderResults() {
  if (results.length === 0) {
    resultsGrid.innerHTML = '<p class="results-empty">暂无搜索结果</p>';
    return;
  }

  resultsGrid.innerHTML = results
    .map((item) => (item.isOfficial ? renderOfficialCard(item) : renderNormalCard(item)))
    .join('');
}

function goSearch(q) {
  const trimmed = q.trim();
  if (!trimmed) return;
  window.location.href = buildResultsUrl(typeId, trimmed);
}

function updateClearBtn() {
  btnClearInput.classList.toggle('hidden', !searchInput.value);
}

renderResults();
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

document.getElementById('btn-back').addEventListener('click', () => {
  window.location.href = buildSearchUrl(typeId);
});
