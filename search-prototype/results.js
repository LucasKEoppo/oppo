import {
  getResourceType,
  getTypeFromUrl,
  buildResultsUrl,
  buildSearchUrl,
  searchResources,
  isPaidResource,
} from './data.js?v=18';

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

/** 小刷子图标（斜向画笔：笔杆 + 笔头） */
const brushIconSvg = `
  <svg class="brush-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="
      M15.1 2.9c.6-.6 1.6-.6 2.2 0l3.8 3.8c.6.6.6 1.6 0 2.2l-1.1 1.1-6-6 1.1-1.1z
      M12.8 5.2l6 6-1.7 1.7-6-6 1.7-1.7z
      M9.8 8.2l6 6c-1.1 1.8-2.9 3.1-5 3.7-.2-1.4-.8-2.7-1.8-3.7-1-1-2.3-1.6-3.7-1.8.6-2.1 1.9-3.9 3.7-5l.8.8z
      M4.6 14.1c1.2.3 2.3.9 3.2 1.8.9.9 1.5 2 1.8 3.2C7.5 20.2 5.4 21 3.8 21c-.5 0-.8-.4-.8-.8 0-1.6.8-3.7 1.6-6.1z
    "/>
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
