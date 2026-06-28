import {
  getResourceType,
  getTypeFromUrl,
  buildResultsUrl,
  buildSearchUrl,
  searchResources,
  isOfficialSearch,
} from './data.js';

const typeId = getTypeFromUrl();
const resourceType = getResourceType(typeId);
const params = new URLSearchParams(window.location.search);
const query = params.get('q') || '简约';

const searchInput = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');
const resultsCount = document.getElementById('results-count');
const btnClearInput = document.getElementById('btn-clear-input');

const results = searchResources(typeId, query);

searchInput.value = query;
searchInput.placeholder = resourceType.placeholder;
resultsCount.textContent = `已为您搜到 ${results.length} 个${resourceType.name}`;

function renderOfficialCard(item) {
  return `
    <div class="result-card result-card-official">
      <div class="result-thumb official-thumb" style="background:${item.color}">
        <span class="official-mark">系统</span>
      </div>
      <p class="result-title">${item.title}</p>
      ${item.showPrice ? '<p class="result-price"><span class="price-free">免费</span></p>' : ''}
    </div>`;
}

function renderNormalCard(item) {
  return `
    <div class="result-card">
      <div class="result-thumb" style="background:${item.color}"></div>
      <p class="result-title">
        ${item.tag ? `<span class="result-tag">${item.tag}</span>` : ''}${item.title}
      </p>
      <p class="result-price">
        ${item.price === '免费'
          ? '<span class="price-free">免费</span>'
          : `<span class="price-paid">${item.price}</span>${item.vip ? '<span class="price-vip">VIP 免费</span>' : ''}`
        }
      </p>
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

document.getElementById('sort-dropdown').addEventListener('click', () => {
  if (isOfficialSearch(query)) return;
  alert('原型演示：切换排序方式');
});
