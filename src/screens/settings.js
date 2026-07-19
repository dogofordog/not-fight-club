import { renderNav } from './nav.js';

export function renderSettings(state) {
  const { player } = state;

  return `
    <div class="screen screen-settings">
      ${renderNav(player, 'settings')}
      <div class="settings-content">
        <h1>Settings</h1>
        <form id="settings-form" class="settings-form">
          <label for="settings-name-input">Fighter name</label>
          <input
            type="text"
            id="settings-name-input"
            value="${player.name}"
            maxlength="20"
            autocomplete="off"
            required
          />
          <button type="submit" class="primary-btn">Save</button>
        </form>
      </div>
    </div>
  `;
}
