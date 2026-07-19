import { renderNav } from './nav.js';
import { AVATARS } from '../game/config.js';

export function renderCharacter(state, showPicker) {
  const { player } = state;

  const pickerHtml = showPicker
    ? `
    <div class="avatar-picker">
      ${AVATARS.map(
        (avatar) => `
        <button
          class="avatar-option ${avatar === player.avatar ? 'selected' : ''}"
          data-action="pick-avatar"
          data-avatar="${avatar}"
        ><img src="${avatar}" alt="avatar option" /></button>
      `
      ).join('')}
    </div>
  `
    : '';

  return `
    <div class="screen screen-character">
      ${renderNav(player, 'character')}
      <div class="character-content">
        <h1>Character</h1>
        <div class="character-avatar"><img src="${player.avatar}" alt="character avatar" /></div>
        <p class="character-name">${player.name}</p>
        <div class="character-record">
          <span class="record-wins">Wins: ${player.wins}</span>
          <span class="record-losses">Losses: ${player.losses}</span>
        </div>
        <button class="secondary-btn" data-action="toggle-avatar-picker">
          ${showPicker ? 'Close' : 'Change Avatar'}
        </button>
        ${pickerHtml}
      </div>
    </div>
  `;
}
