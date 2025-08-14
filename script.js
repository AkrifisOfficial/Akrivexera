document.addEventListener('DOMContentLoaded', () => {
  const animeContainer = document.getElementById('anime-list');
  const modal = document.getElementById('player-modal');
  const player = document.getElementById('video-player');
  const closeBtn = document.querySelector('.close');

  // Загрузка данных
  fetch('data.json')
    .then(response => response.json())
    .then(data => renderAnimeList(data));

  // Рендер списка аниме
  function renderAnimeList(animeList) {
    animeList.forEach(anime => {
      const card = document.createElement('div');
      card.className = 'anime-card';
      card.innerHTML = `
        <img src="${anime.image}" alt="${anime.title}">
        <div class="anime-info">
          <h3>${anime.title}</h3>
          <p>${anime.description}</p>
          <p><b>Озвучка:</b> ${anime.dubber}</p>
        </div>
      `;
      card.addEventListener('click', () => openPlayer(anime.episodes));
      animeContainer.appendChild(card);
    });
  }

  // Открыть плеер
  function openPlayer(episodes) {
    const firstEpisode = episodes[0].video;
    player.src = firstEpisode;
    modal.style.display = 'block';
  }

  // Закрыть модальное окно
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    player.src = '';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      player.src = '';
    }
  });
});
