import { CONDITION_TYPES, createEmptyCondition } from './data.js';

const modalOverlay = document.getElementById('modal-overlay');
const conditionRows = document.getElementById('condition-rows');

let conditions = [createEmptyCondition(1)];
let nextId = 2;

function openModal() {
  modalOverlay.classList.remove('hidden');
}

function closeModal() {
  modalOverlay.classList.add('hidden');
}

function renderConditionRows() {
  conditionRows.innerHTML = conditions
    .map((row, index) => {
      const options = CONDITION_TYPES.map(
        (type) =>
          `<option value="${type}" ${row.type === type ? 'selected' : ''}>${type}</option>`
      ).join('');

      return `
        <tr data-id="${row.id}">
          <td class="col-id">
            <span class="row-index">#${index + 1}</span>
          </td>
          <td class="col-type">
            <select class="form-select condition-type" data-id="${row.id}">
              <option value="">请选择</option>
              ${options}
            </select>
          </td>
          <td class="col-filter">
            <textarea class="form-textarea condition-value" data-id="${row.id}" rows="3">${row.value}</textarea>
          </td>
          <td class="col-action">
            <button class="btn-add-row" data-after="${row.id}" title="新增条件">+</button>
            ${conditions.length > 1 ? `<button class="btn-remove-row" data-id="${row.id}" title="删除">×</button>` : ''}
          </td>
        </tr>`;
    })
    .join('');

  bindRowEvents();
}

function bindRowEvents() {
  document.querySelectorAll('.condition-type').forEach((el) => {
    el.addEventListener('change', (e) => {
      const id = Number(e.target.dataset.id);
      const row = conditions.find((r) => r.id === id);
      if (row) {
        row.type = e.target.value;
        renderConditionRows();
      }
    });
  });

  document.querySelectorAll('.condition-value').forEach((el) => {
    el.addEventListener('input', (e) => {
      const id = Number(e.target.dataset.id);
      const row = conditions.find((r) => r.id === id);
      if (row) row.value = e.target.value;
    });
  });

  document.querySelectorAll('.btn-add-row').forEach((el) => {
    el.addEventListener('click', () => {
      const afterId = Number(el.dataset.after);
      const index = conditions.findIndex((r) => r.id === afterId);
      conditions.splice(index + 1, 0, createEmptyCondition(nextId++));
      renderConditionRows();
    });
  });

  document.querySelectorAll('.btn-remove-row').forEach((el) => {
    el.addEventListener('click', () => {
      const id = Number(el.dataset.id);
      conditions = conditions.filter((r) => r.id !== id);
      renderConditionRows();
    });
  });
}

document.getElementById('btn-open-modal').addEventListener('click', openModal);
document.getElementById('btn-close-modal').addEventListener('click', closeModal);
document.getElementById('btn-cancel').addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.getElementById('btn-confirm').addEventListener('click', () => {
  const logic = document.querySelector('input[name="logic"]:checked')?.value;
  const logicLabel = logic === 'any' ? '满足任意条件' : '满足所有条件';
  console.log('提交定投配置', { logic: logicLabel, conditions });
  alert('原型演示：定投配置已提交');
  closeModal();
});

renderConditionRows();
