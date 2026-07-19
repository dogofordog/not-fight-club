export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function renderNav(player, activeScreen) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'character', label: 'Character' },
    { id: 'settings', label: 'Settings' },
  ];

  return `
    <nav class="app-nav">
      <div class="nav-identity">
        <img class="nav-avatar" src="${player.avatar}" alt="avatar" />
        <span class="nav-name">${escapeHtml(player.name)}</span>
      </div>
      <div class="nav-tabs">
        ${tabs
          .map(
            (tab) => `
          <button
            class="nav-tab ${activeScreen === tab.id ? 'active' : ''}"
            data-action="go-to-screen"
            data-screen="${tab.id}"
          >${tab.label}</button>
        `
          )
          .join('')}
      </div>
    </nav>
  `;
}
