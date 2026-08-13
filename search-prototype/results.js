import {
  getResourceType,
  getTypeFromUrl,
  buildResultsUrl,
  buildSearchUrl,
  searchResources,
  isPaidResource,
} from './data.js?v=24';

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

/** 小刷子图标（三齿笔头 + 箍 + 短笔杆，斜向） */
const brushIconSvg = `
  <svg class="brush-icon" viewBox="0 0 24 24" aria-hidden="true">
    <g fill="currentColor" transform="translate(12 12) rotate(-45) translate(-12 -12)">
      <!-- 三齿笔头：中间更长 -->
      <rect x="8.2" y="3.2" width="1.8" height="7.2" rx="0.4"/>
      <rect x="11.1" y="2.2" width="1.8" height="8.2" rx="0.4"/>
      <rect x="14" y="3.2" width="1.8" height="7.2" rx="0.4"/>
      <!-- 金属箍 -->
      <rect x="7.2" y="10.6" width="9.6" height="2.6" rx="0.5"/>
      <!-- 短笔杆 -->
      <rect x="10" y="13.2" width="4" height="7.2" rx="0.7"/>
    </g>
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
