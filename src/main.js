import './style.css';
import { state, updateState, updatePlayer } from './state.js';
import { renderRegistration } from './screens/registration.js';
import { renderHome } from './screens/home.js';
import { renderCharacter } from './screens/character.js';
import { renderSettings } from './screens/settings.js';
import { renderBattle } from './screens/battle.js';
import { pickRandomOpponent, PLAYER_PROFILE } from './game/config.js';
import { resolveTurn } from './game/battle.js';

const app = document.getElementById('app');

let showAvatarPicker = false;
let battleSelection = { attack: null, defend: [] };

function resetBattleSelection() {
  battleSelection = { attack: null, defend: [] };
}

function render() {
  let html = '';
  switch (state.screen) {
    case 'registration':
      html = renderRegistration();
      break;
    case 'home':
      html = renderHome(state);
      break;
    case 'character':
      html = renderCharacter(state, showAvatarPicker);
      break;
    case 'settings':
      html = renderSettings(state);
      break;
    case 'battle':
      html = renderBattle(state, battleSelection);
      break;
    default:
      html = renderHome(state);
  }
  app.innerHTML = html;
  attachScreenSpecificListeners();
}

function attachScreenSpecificListeners() {
  const registrationForm = document.getElementById('registration-form');
  if (registrationForm) {
    const nameInput = document.getElementById('name-input');
    const registerBtn = document.getElementById('register-btn');
    nameInput.addEventListener('input', () => {
      registerBtn.disabled = nameInput.value.trim().length === 0;
    });
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      if (!name) return;
      updatePlayer({ name });
      updateState({ screen: 'home' });
      render();
    });
  }

  const settingsForm = document.getElementById('settings-form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('settings-name-input');
      const name = input.value.trim();
      if (!name) return;
      updatePlayer({ name });
      render();
    });
  }
}

function startBattle() {
  if (state.battle) {
    updateState({ screen: 'battle' });
    resetBattleSelection();
    render();
    return;
  }

  const opponent = pickRandomOpponent();
  const battle = {
    opponent: { ...opponent, currentHp: opponent.maxHp },
    playerCurrentHp: PLAYER_PROFILE.maxHp,
    turnNumber: 1,
    log: [],
    finished: false,
    result: null,
  };
  updateState({ screen: 'battle', battle });
  resetBattleSelection();
  render();
}

function confirmTurn() {
  const battle = state.battle;
  if (!battle || battle.finished) return;
  if (!battleSelection.attack || battleSelection.defend.length !== PLAYER_PROFILE.defendCount) return;

  const { logEntries, playerDamageTaken, opponentDamageTaken } = resolveTurn({
    playerName: state.player.name,
    playerAttackZone: battleSelection.attack,
    playerDefendZones: battleSelection.defend,
    opponent: battle.opponent,
    playerProfile: PLAYER_PROFILE,
  });

  battle.opponent.currentHp = Math.max(0, battle.opponent.currentHp - opponentDamageTaken);
  battle.playerCurrentHp = Math.max(0, battle.playerCurrentHp - playerDamageTaken);
  battle.log.push(...logEntries);

  if (battle.opponent.currentHp <= 0 && battle.playerCurrentHp <= 0) {
    battle.finished = true;
    battle.result = 'loss';
    updatePlayer({ losses: state.player.losses + 1 });
  } else if (battle.opponent.currentHp <= 0) {
    battle.finished = true;
    battle.result = 'win';
    updatePlayer({ wins: state.player.wins + 1 });
  } else if (battle.playerCurrentHp <= 0) {
    battle.finished = true;
    battle.result = 'loss';
    updatePlayer({ losses: state.player.losses + 1 });
  } else {
    battle.turnNumber += 1;
  }

  updateState({ battle });
  resetBattleSelection();
  render();
}

function endBattle() {
  updateState({ screen: 'home', battle: null });
  resetBattleSelection();
  render();
}

app.addEventListener('click', (e) => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  switch (action) {
    case 'go-to-screen':
      updateState({ screen: target.dataset.screen });
      showAvatarPicker = false;
      render();
      break;

    case 'toggle-avatar-picker':
      showAvatarPicker = !showAvatarPicker;
      render();
      break;

    case 'pick-avatar':
      updatePlayer({ avatar: target.dataset.avatar });
      showAvatarPicker = false;
      render();
      break;

    case 'start-battle':
      startBattle();
      break;

    case 'select-attack-zone':
      battleSelection.attack = target.dataset.zone;
      render();
      break;

    case 'select-defend-zone': {
      const zone = target.dataset.zone;
      const idx = battleSelection.defend.indexOf(zone);
      if (idx >= 0) {
        battleSelection.defend.splice(idx, 1);
      } else if (battleSelection.defend.length < PLAYER_PROFILE.defendCount) {
        battleSelection.defend.push(zone);
      }
      render();
      break;
    }

    case 'confirm-turn':
      confirmTurn();
      break;

    case 'end-battle':
      endBattle();
      break;

    default:
      break;
  }
});

if (!state.player.name && state.screen !== 'registration') {
  updateState({ screen: 'registration' });
}
render();
