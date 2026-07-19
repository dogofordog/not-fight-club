export function renderRegistration() {
  return `
    <div class="screen screen-registration">
      <h1>Not Fight Club</h1>
      <p class="subtitle">Enter your name to begin</p>
      <form id="registration-form" class="registration-form">
        <input
          type="text"
          id="name-input"
          placeholder="Your fighter name"
          maxlength="20"
          autocomplete="off"
          required
        />
        <button type="submit" id="register-btn" disabled>Enter the Club</button>
      </form>
    </div>
  `;
}
