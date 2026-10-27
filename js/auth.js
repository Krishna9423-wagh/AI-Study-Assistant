/* Global authentication gate using Supabase passwordless OTP. */
(function () {
  const config = window.AUTH_CONFIG || {};
  let client;
  let method = 'phone';
  let identity = '';
  let authenticatedCallback = null;

  // Runs the app only after authentication succeeds or an existing session is restored.
  window.StudyAuth = {
    whenAuthenticated(callback) {
      authenticatedCallback = callback;
    },
  };

  // Returns an actionable setup message instead of allowing unprotected access.
  function configError() {
    return !config.supabaseUrl || !config.supabaseAnonKey || !window.supabase;
  }

  // Updates the screen-reader-friendly status message.
  function showStatus(message, isError) {
    const status = document.getElementById('auth-status');
    status.textContent = message;
    status.classList.toggle('error', Boolean(isError));
  }

  // Enables or disables form actions while a request is in flight.
  function setBusy(button, busy, label) {
    button.disabled = busy;
    if (busy) button.dataset.label = button.textContent;
    button.textContent = busy ? label : (button.dataset.label || button.textContent);
  }

  // Shows the verification form after a code is successfully requested.
  function showVerification() {
    document.getElementById('auth-request-form').classList.add('hidden');
    document.getElementById('auth-verify-form').classList.remove('hidden');
    document.getElementById('auth-code-help').textContent = `We sent a code to ${identity}.`;
    document.getElementById('auth-code').focus();
  }

  // Removes the gate and starts the main application.
  function unlockApp() {
    document.body.classList.remove('auth-pending');
    if (authenticatedCallback) authenticatedCallback();
  }

  // Uses E.164 format, required by SMS verification providers.
  function validPhone(value) {
    return /^\+[1-9]\d{7,14}$/.test(value.replace(/[\s()-]/g, ''));
  }

  // Validates the small email input without pretending to fully validate an address.
  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Requests either an SMS OTP or an email OTP from Supabase.
  async function requestCode(event) {
    event.preventDefault();
    const input = document.getElementById('auth-identity');
    const button = document.getElementById('auth-send-button');
    identity = input.value.trim();
    if (method === 'phone') identity = identity.replace(/[\s()-]/g, '');
    if (method === 'phone' ? !validPhone(identity) : !validEmail(identity)) {
      showStatus(method === 'phone' ? 'Enter a valid phone number with country code, such as +919876543210.' : 'Enter a valid email address.', true);
      input.focus();
      return;
    }
    setBusy(button, true, 'Sending code…');
    showStatus('');
    const result = method === 'phone'
      ? await client.auth.signInWithOtp({ phone: identity })
      : await client.auth.signInWithOtp({ email: identity, options: { shouldCreateUser: true } });
    setBusy(button, false);
    if (result.error) {
      showStatus(result.error.message, true);
      return;
    }
    showVerification();
    showStatus('Code sent. It expires shortly.');
  }

  // Verifies the server-issued OTP; browser-only checks are deliberately not trusted.
  async function verifyCode(event) {
    event.preventDefault();
    const code = document.getElementById('auth-code').value.replace(/\D/g, '');
    const button = document.getElementById('auth-verify-button');
    if (!/^\d{6}$/.test(code)) {
      showStatus('Enter the complete 6-digit code.', true);
      return;
    }
    setBusy(button, true, 'Verifying…');
    const result = await client.auth.verifyOtp({
      [method === 'phone' ? 'phone' : 'email']: identity,
      token: code,
      type: method === 'phone' ? 'sms' : 'email',
    });
    setBusy(button, false);
    if (result.error) {
      showStatus(result.error.message, true);
      return;
    }
    unlockApp();
  }

  // Switches the label, input semantics and explanation for the selected method.
  function chooseMethod(nextMethod) {
    method = nextMethod;
    const input = document.getElementById('auth-identity');
    document.querySelectorAll('[data-auth-method]').forEach((button) => {
      const active = button.dataset.authMethod === method;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    input.value = '';
    input.type = method === 'phone' ? 'tel' : 'email';
    input.inputMode = method === 'phone' ? 'tel' : 'email';
    input.autocomplete = method === 'phone' ? 'tel' : 'email';
    input.placeholder = method === 'phone' ? '+91 98765 43210' : 'you@example.com';
    document.getElementById('auth-identity-label').textContent = method === 'phone' ? 'Phone number' : 'Email address';
    document.getElementById('auth-help').textContent = method === 'phone' ? 'Include your country code, for example +91.' : 'We will email you a one-time sign-in code.';
    showStatus('');
  }

  // Returns from code entry to change the requested identity.
  function goBack() {
    document.getElementById('auth-verify-form').classList.add('hidden');
    document.getElementById('auth-request-form').classList.remove('hidden');
    document.getElementById('auth-code').value = '';
    showStatus('');
  }

  // Connects UI events after the page has parsed.
  document.addEventListener('DOMContentLoaded', async () => {
    if (configError()) {
      showStatus('Authentication is not configured yet. Add your Supabase URL and anon key in js/auth-config.js.', true);
      return;
    }
    client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    document.getElementById('auth-request-form').addEventListener('submit', requestCode);
    document.getElementById('auth-verify-form').addEventListener('submit', verifyCode);
    document.getElementById('auth-resend-button').addEventListener('click', requestCode);
    document.getElementById('auth-back-button').addEventListener('click', goBack);
    document.querySelectorAll('[data-auth-method]').forEach((button) => button.addEventListener('click', () => chooseMethod(button.dataset.authMethod)));
    const { data, error } = await client.auth.getSession();
    if (error) showStatus('Unable to check your sign-in session. Please try again.', true);
    if (data.session) unlockApp();
  });
}());
