import {
  getResourceType,
  getTypeFromUrl,
  buildResultsUrl,
  buildSearchUrl,
  searchResources,
  isPaidResource,
} from './data.js?v=17';

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

/** 小刷子图标（画笔剪影，更易辨认） */
const brushIconSvg = `
  <svg class="brush-icon" viewBox="0 0 24 24" aria-hidden="true">
    <!-- 笔杆 -->
    <path d="M14.2 3.2l6.6 6.6c.5.5.5 1.3 0 1.8l-1.2 1.2-8.4-8.4 1.2-1.2c.5-.5 1.3-.5 1.8 0z" fill="currentColor"/>
    <!-- 金属箍 -->
    <path d="M10.2 5.4l8.4 8.4-1.5 1.5-8.4-8.4 1.5-1.5z" fill="currentColor" opacity="0.85"/>
    <!-- 笔头毛束 -->
    <path d="M4.2 14.8c-.2 2.4.6 4.2 2.2 5.4.3-.9.5-1.9.4-2.9-.1-1.2-.6-2.3-1.4-3.1-.5.1-1 .3-1.2.6z" fill="currentColor"/>
    <path d="M5.4 13.2c1.3 1.3 2 3.1 2.1 5 .7-.7 1.2-1.7 1.4-2.8.3-1.5 0-3.1-.9-4.4L5.4 13.2z" fill="currentColor"/>
    <path d="M8.2 10.6l2.6 2.6c.9 1.4 1.1 3.1.7 4.6-.9-1.1-2.1-1.9-3.5-2.3-.1-1.5.1-3.1.2-4.9z" fill="currentColor"/>
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
