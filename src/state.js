const STORAGE_KEY = 'not-fight-club-state-v1';

function defaultState() {
  return {
    screen: 'registration',
    player: { name: '', avatar: `${import.meta.env.BASE_URL}avatars/warrior.svg`, wins: 0, losses: 0 },
    battle: null,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed, player: { ...defaultState().player, ...parsed.player } };
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable - fail silently
  }
}

export const state = loadState();

export function updateState(patch) {
  Object.assign(state, patch);
  saveState(state);
}

export function updatePlayer(patch) {
  Object.assign(state.player, patch);
  saveState(state);
}

export function persist() {
  saveState(state);
}
