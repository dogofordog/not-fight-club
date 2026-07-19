import { renderNav } from './nav.js';
import { ZONES, ZONE_LABELS, PLAYER_PROFILE } from '../game/config.js';

function renderHpBar(current, max, label) {
  const pct = Math.max(0, Math.round((current / max) * 100));
  return `
    <div class="hp-bar-wrap">
      <div class="hp-bar-label">${label}: ${Math.max(0, current)} / ${max} HP</div>
      <div class="hp-bar-track">
        <div class="hp-bar-fill" style="width: ${pct}%"></div>
      </div>
    </div>
  `;
}

export function renderBattle(state, selection) {
  const { player, battle } = state;
  if (!battle) {
    return `<div class="screen"><p>No battle in progress.</p></div>`;
  }

  const { opponent, playerCurrentHp, turnNumber, log, finished, result } = battle;

  const attackZoneButtons = ZONES.map(
    (zone) => `
    <button
      class="zone-btn ${selection.attack === zone ? 'selected' : ''}"
      data-action="select-attack-zone"
      data-zone="${zone}"
      ${finished ? 'disabled' : ''}
    >${ZONE_LABELS[zone]}</button>
  `
  ).join('');

  const defendZoneButtons = ZONES.map(
    (zone) => `
    <button
      class="zone-btn ${selection.defend.includes(zone) ? 'selected' : ''}"
      data-action="select-defend-zone"
      data-zone="${zone}"
      ${finished ? 'disabled' : ''}
    >${ZONE_LABELS[zone]}</button>
  `
  ).join('');

  const canConfirm = !!selection.attack && selection.defend.length === PLAYER_PROFILE.defendCount;

  const resultBanner = finished
    ? `
    <div class="battle-result ${result === 'win' ? 'result-win' : 'result-loss'}">
      <h2>${result === 'win' ? 'Victory!' : 'Defeat...'}</h2>
      <button class="primary-btn" data-action="end-battle">Back to Home</button>
    </div>
  `
    : '';

  return `
    <div class="screen screen-battle">
      ${renderNav(player, 'battle')}
      <div class="battle-content">
        <div class="battle-fighters">
          <div class="fighter-card">
            <div class="fighter-avatar"><img src="${player.avatar}" alt="${player.name}" /></div>
            <div class="fighter-name">${player.name}</div>
            ${renderHpBar(playerCurrentHp, PLAYER_PROFILE.maxHp, 'You')}
          </div>
          <div class="vs-label">VS</div>
          <div class="fighter-card">
            <div class="fighter-avatar"><img src="${opponent.avatar}" alt="${opponent.name}" /></div>
            <div class="fighter-name">${opponent.name}</div>
            ${renderHpBar(opponent.currentHp, opponent.maxHp, opponent.name)}
          </div>
        </div>

        ${resultBanner}

        ${
          !finished
            ? `
          <div class="turn-info">Turn ${turnNumber}</div>
          <div class="zone-selection">
            <div class="zone-group">
              <h3>Attack (pick 1)</h3>
              <div class="zone-buttons">${attackZoneButtons}</div>
            </div>
            <div class="zone-group">
              <h3>Defend (pick 2)</h3>
              <div class="zone-buttons">${defendZoneButtons}</div>
            </div>
          </div>
          <button
            id="confirm-turn-btn"
            class="primary-btn"
            data-action="confirm-turn"
            ${canConfirm ? '' : 'disabled'}
          >Confirm Turn</button>
        `
            : ''
        }

        <div class="battle-log">
          <h3>Battle Log</h3>
          <ul class="log-list">
            ${log
              .map((entry) => `<li class="log-entry">${entry.text}</li>`)
              .reverse()
              .join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}
