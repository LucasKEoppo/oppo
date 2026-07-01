import { currentResource, recommendResources } from './data.js';

const hero = document.getElementById('detail-hero');
const recommendList = document.getElementById('recommend-list');

hero.style.background = currentResource.gradient;

recommendList.innerHTML = recommendResources
  .map(
    (item) => `
    <div class="recommend-card" data-id="${item.id}">
      <div class="recommend-thumb" style="background: ${item.gradient}"></div>
      <span class="price-badge badge-paid">付费</span>
    </div>`
  )
  .join('');

document.getElementById('btn-back').addEventListener('click', () => {
  history.back();
});

document.getElementById('btn-set').addEventListener('click', () => {
  alert('原型演示：设为壁纸');
});

document.querySelectorAll('.recommend-card').forEach((card) => {
  card.addEventListener('click', () => {
    const item = recommendResources.find((r) => r.id === card.dataset.id);
    if (item) hero.style.background = item.gradient;
  });
});
