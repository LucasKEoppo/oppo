const sheet = document.getElementById('update-sheet');
const mask = document.getElementById('sheet-mask');
const fill = document.getElementById('progress-fill');
const btnCancel = document.getElementById('btn-cancel');
const btnBack = document.getElementById('btn-back');

let timer = null;
let progress = 0;

function openSheet() {
  sheet.classList.add('show');
  mask.classList.add('show');
  startProgress();
}

function closeSheet() {
  sheet.classList.remove('show');
  mask.classList.remove('show');
  stopProgress();
  progress = 0;
  fill.style.width = '0%';
}

function startProgress() {
  stopProgress();
  progress = 12;
  fill.style.width = `${progress}%`;
  timer = setInterval(() => {
    if (progress >= 96) return;
    progress += Math.random() * 4 + 1.2;
    if (progress > 96) progress = 96;
    fill.style.width = `${progress}%`;
  }, 280);
}

function stopProgress() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

btnCancel.addEventListener('click', closeSheet);
mask.addEventListener('click', closeSheet);
btnBack.addEventListener('click', () => {
  closeSheet();
});

requestAnimationFrame(() => openSheet());
