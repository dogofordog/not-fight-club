import { renderNav } from './nav.js';

export function renderHome(state) {
  const { player, battle } = state;
  const resumeNotice = battle
    ? `<p class="resume-notice">You have a battle in progress against ${battle.opponent.name}.</p>`
    : '';

  return `
    <div class="screen screen-home">
      ${renderNav(player, 'home')}
      <div class="home-content">
        <h1>Welcome, ${player.name}</h1>
        ${resumeNotice}
        <button id="start-battle-btn" data-action="start-battle" class="primary-btn">
          ${battle ? 'Resume Battle' : 'Start New Battle'}
        </button>
      </div>
    </div>
  `;
}
