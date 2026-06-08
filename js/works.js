/* ─────────────────────────────────────────────
   WORKS — load from JSON and render cards
───────────────────────────────────────────── */

function getYoutubeThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function buildCard(work, linkable = true) {
  const hasYoutube = !!work.youtube;
  const thumbHtml = hasYoutube
    ? `<img src="${getYoutubeThumbnail(work.youtube)}" alt="${work.title}" loading="lazy" />`
    : work.thumb
      ? `<img src="${work.thumb}" alt="${work.title}" loading="lazy" />`
      : `<div class="work-card-thumb-placeholder">[ image ]</div>`;

  const tagsHtml = work.tags.map(t => `<span class="tag">${t}</span>`).join('');

  const card = document.createElement('article');
  card.className = 'work-card';
  card.dataset.category = work.category;

  if (linkable && work.url) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => window.open(work.url, '_blank'));
  }

  card.innerHTML = `
    <div class="work-card-thumb">${thumbHtml}</div>
    <div class="work-card-body">
      <div class="work-card-tags">${tagsHtml}</div>
      <h3 class="work-card-title">${work.title}</h3>
      <p class="work-card-desc">${work.desc}</p>
    </div>
    ${work.url ? '<span class="work-card-arrow">></span>' : ''}
  `;

  return card;
}

async function loadWorks() {
  let works;
  try {
    const res = await fetch('works.json');
    works = await res.json();
  } catch (e) {
    console.error('Could not load works.json', e);
    return;
  }

  // ── work.html — full grid ──────────────────
  const fullGrid = document.querySelector('#work-grid-full');
  if (fullGrid) {
    works.forEach(work => fullGrid.appendChild(buildCard(work)));

    // wire up filter buttons now that cards exist
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        fullGrid.querySelectorAll('.work-card').forEach(card => {
          card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
        });
      });
    });
  }

  // ── index.html — featured preview (max 3) ─
  const previewGrid = document.querySelector('#work-grid-preview');
  if (previewGrid) {
    works
      .filter(w => w.featured)
      .slice(0, 3)
      .forEach(work => previewGrid.appendChild(buildCard(work)));
  }
}

loadWorks();
