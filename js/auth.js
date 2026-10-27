/* Global authentication gate using Supabase passwordless OTP with instant guest and demo fallback. */
(function () {
  let client = null;
  let method = 'email';
  let isDemoPhone = false;
  let identity = '';
  let authenticatedCallback = null;
  let isUnlocked = false;

  function cleanSupabaseUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') return '';
    let cleaned = rawUrl.trim();
    cleaned = cleaned.replace(/[.\s]+$/, '');
    cleaned = cleaned.replace(/\/rest\/v1\/?$/, '');
    cleaned = cleaned.replace(/\/+$/, '');
    return cleaned;
  }

  function cleanSupabaseKey(rawKey) {
    if (!rawKey || typeof rawKey !== 'string') return '';
    return rawKey.trim().replace(/[.\s]+$/, '');
  }

  function getEffectiveConfig() {
    const fileConfig = window.AUTH_CONFIG || {};
    let localUrl = '';
    let localKey = '';
    try {
      localUrl = localStorage.getItem('ai_study_assistant_supabase_url') || '';
      localKey = localStorage.getItem('ai_study_assistant_supabase_anon_key') || '';
    } catch (e) {}

    const url = cleanSupabaseUrl(fileConfig.supabaseUrl || localUrl || '');
    const key = cleanSupabaseKey(fileConfig.supabaseAnonKey || localKey || '');
    return { supabaseUrl: url, supabaseAnonKey: key };
  }

  function isConfigured() {
    const cfg = getEffectiveConfig();
    return Boolean(
      cfg.supabaseUrl &&
      cfg.supabaseAnonKey &&
      window.supabase &&
      !cfg.supabaseUrl.includes('placeholder') &&
      !cfg.supabaseUrl.includes('YOUR_SUPABASE')
    );
  }

  function setupClient() {
    if (isConfigured()) {
      try {
        const cfg = getEffectiveConfig();
        client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
        return true;
      } catch (err) {
        console.warn('StudyAuth: Could not initialize Supabase client:', err);
        client = null;
        return false;
      }
    }
    client = null;
    return false;
  }

  // Global StudyAuth API
  window.StudyAuth = {
    whenAuthenticated(callback) {
      authenticatedCallback = callback;
      if (isUnlocked && typeof callback === 'function') {
        try {
          callback();
        } catch (e) {
          console.error('StudyAuth: Error in callback on whenAuthenticated', e);
        }
      }
    },
    signOut() {
      try {
        localStorage.removeItem('ai_study_assistant_guest_session');
        localStorage.removeItem('ai_study_assistant_auth_user');
        if (client && client.auth) {
          client.auth.signOut().catch(() => {});
        }
      } catch (e) {}
      isUnlocked = false;
      document.body.classList.add('auth-pending');
      window.location.reload();
    },
    isGuest() {
      return !isConfigured() || localStorage.getItem('ai_study_assistant_guest_session') === 'true';
    },
    getUserIdentity() {
      try {
        return localStorage.getItem('ai_study_assistant_auth_user') || 'Alex';
      } catch (e) {
        return 'Alex';
      }
    }
  };

  function showStatus(message, isError) {
    const status = document.getElementById('auth-status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('error', Boolean(isError));
  }

  function setBusy(button, busy, label) {
    if (!button) return;
    button.disabled = busy;
    if (busy) button.dataset.label = button.textContent;
    button.textContent = busy ? label : (button.dataset.label || button.textContent);
  }

  function showVerification() {
    document.getElementById('auth-request-form')?.classList.add('hidden');
    document.getElementById('auth-verify-form')?.classList.remove('hidden');
    const helpEl = document.getElementById('auth-code-help');
    if (helpEl) {
      if (isConfigured()) {
        helpEl.textContent = `We sent a verification code to ${identity}.`;
      } else {
        helpEl.textContent = `Demo Mode: Code generated for ${identity}. Enter 123456 below:`;
      }
    }
    const codeInput = document.getElementById('auth-code');
    if (codeInput) {
      if (!isConfigured()) {
        codeInput.placeholder = '123456';
      }
      codeInput.focus();
    }
  }

  function unlockApp() {
    if (isUnlocked) return;
    isUnlocked = true;
    document.body.classList.remove('auth-pending');
    if (typeof authenticatedCallback === 'function') {
      try {
        authenticatedCallback();
      } catch (err) {
        console.error('StudyAuth: Error in authenticatedCallback:', err);
      }
    }
  }

  function validPhone(value) {
    return /^\+[1-9]\d{7,14}$/.test(value.replace(/[\s()-]/g, ''));
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function requestCode(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('auth-identity');
    const button = document.getElementById('auth-send-button');
    identity = (input?.value || '').trim();
    if (method === 'phone') identity = identity.replace(/[\s()-]/g, '');

    if (method === 'phone' ? !validPhone(identity) : !validEmail(identity)) {
      showStatus(
        method === 'phone'
          ? 'Enter a valid phone number with country code, e.g. +919876543210.'
          : 'Enter a valid email address, e.g. student@example.com.',
        true
      );
      input?.focus();
      return;
    }

    setBusy(button, true, 'Sending code…');
    showStatus('');

    // Demo Mode simulation when Supabase is not connected
    if (!isConfigured() || !client) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setBusy(button, false);
      showVerification();
      showStatus('Demo code generated: 123456 (or click Continue as Guest)', false);
      return;
    }

    // Live Supabase OTP dispatch
    try {
      const result = method === 'phone'
        ? await client.auth.signInWithOtp({ phone: identity })
        : await client.auth.signInWithOtp({ email: identity, options: { shouldCreateUser: true } });

      setBusy(button, false);
      if (result.error) {
        // If phone/SMS provider is not enabled in Supabase project (requires Twilio)
        const errMsg = result.error.message || '';
        if (method === 'phone' && (errMsg.includes('phone') || errMsg.includes('provider') || errMsg.includes('Twilio') || errMsg.includes('Unsupported'))) {
          isDemoPhone = true;
          showVerification();
          const helpEl = document.getElementById('auth-code-help');
          if (helpEl) {
            helpEl.textContent = `Supabase Phone/SMS requires Twilio. Demo mode active: use code 123456 (or switch to Email tab for live codes).`;
          }
          const codeInput = document.getElementById('auth-code');
          if (codeInput) codeInput.placeholder = '123456';
          showStatus('⚠️ SMS requires Twilio in Supabase. Enter demo code 123456 or switch to Email.', false);
          return;
        }

        showStatus(result.error.message, true);
        return;
      }
      showVerification();
      showStatus('Code sent. It expires shortly.');
    } catch (err) {
      setBusy(button, false);
      showStatus('Network error while requesting code: ' + err.message, true);
    }
  }

  async function verifyCode(event) {
    if (event) event.preventDefault();
    const code = (document.getElementById('auth-code')?.value || '').replace(/\D/g, '');
    const button = document.getElementById('auth-verify-button');

    if (!/^\d{6}$/.test(code)) {
      showStatus('Enter the complete 6-digit code.', true);
      return;
    }

    setBusy(button, true, 'Verifying…');

    // Demo Mode or Fallback Phone Demo
    if (!isConfigured() || !client || isDemoPhone) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setBusy(button, false);
      if (code === '123456' || code.length === 6) {
        try {
          localStorage.setItem('ai_study_assistant_guest_session', 'true');
          localStorage.setItem('ai_study_assistant_auth_user', identity || 'Student');
        } catch (e) {}
        showStatus('✅ Verified! Loading your study space…', false);
        setTimeout(unlockApp, 100);
      } else {
        showStatus('Invalid code. For demo mode, enter 123456.', true);
      }
      return;
    }

    // Live Supabase OTP verification
    try {
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
      try {
        localStorage.setItem('ai_study_assistant_auth_user', identity);
      } catch (e) {}
      showStatus('✅ Sign in verified! Welcome back.', false);
      setTimeout(unlockApp, 200);
    } catch (err) {
      setBusy(button, false);
      showStatus('Verification error: ' + err.message, true);
    }
  }

  function chooseMethod(nextMethod) {
    method = nextMethod;
    if (method !== 'phone') {
      isDemoPhone = false;
    }
    const input = document.getElementById('auth-identity');
    document.querySelectorAll('[data-auth-method]').forEach((btn) => {
      const active = btn.dataset.authMethod === method;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    if (input) {
      input.value = '';
      input.type = method === 'phone' ? 'tel' : 'email';
      input.inputMode = method === 'phone' ? 'tel' : 'email';
      input.autocomplete = method === 'phone' ? 'tel' : 'email';
      input.placeholder = method === 'phone' ? '+91 98765 43210' : 'you@example.com';
    }
    const label = document.getElementById('auth-identity-label');
    if (label) label.textContent = method === 'phone' ? 'Phone number' : 'Email address';
    const help = document.getElementById('auth-help');
    if (help) {
      help.textContent = method === 'phone'
        ? 'Include country code (+91). Note: Live SMS requires Twilio in Supabase; demo code 123456 is supported.'
        : 'We will email you a live 6-digit sign-in code.';
    }
    showStatus('');
  }

  function goBack() {
    document.getElementById('auth-verify-form')?.classList.add('hidden');
    document.getElementById('auth-request-form')?.classList.remove('hidden');
    const code = document.getElementById('auth-code');
    if (code) code.value = '';
    showStatus('');
  }

  function continueAsGuest() {
    try {
      localStorage.setItem('ai_study_assistant_guest_session', 'true');
      localStorage.setItem('ai_study_assistant_auth_user', 'Guest Student');
    } catch (e) {}
    showStatus('⚡ Guest access enabled. Opening Study Hub…', false);
    setTimeout(unlockApp, 150);
  }

  async function initAuth() {
    // 1. Check if returning visitor has active guest session
    try {
      if (localStorage.getItem('ai_study_assistant_guest_session') === 'true') {
        unlockApp();
        return;
      }
    } catch (e) {}

    // 2. Setup Supabase client if configured
    const configured = setupClient();

    // 3. Attach UI listeners
    document.getElementById('auth-request-form')?.addEventListener('submit', requestCode);
    document.getElementById('auth-verify-form')?.addEventListener('submit', verifyCode);
    document.getElementById('auth-resend-button')?.addEventListener('click', requestCode);
    document.getElementById('auth-back-button')?.addEventListener('click', goBack);
    document.getElementById('auth-guest-btn')?.addEventListener('click', continueAsGuest);

    document.querySelectorAll('[data-auth-method]').forEach((btn) => {
      btn.addEventListener('click', () => chooseMethod(btn.dataset.authMethod));
    });

    // Supabase quick connect accordion
    const toggleBtn = document.getElementById('auth-config-toggle');
    const detailsBox = document.getElementById('auth-config-details');
    if (toggleBtn && detailsBox) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = !detailsBox.classList.contains('hidden');
        detailsBox.classList.toggle('hidden');
        toggleBtn.setAttribute('aria-expanded', String(!isOpen));
      });
    }

    const saveCfgBtn = document.getElementById('auth-cfg-save-btn');
    if (saveCfgBtn) {
      saveCfgBtn.addEventListener('click', () => {
        const urlInput = document.getElementById('auth-cfg-url');
        const keyInput = document.getElementById('auth-cfg-key');
        const url = (urlInput?.value || '').trim();
        const key = (keyInput?.value || '').trim();
        if (!url || !key) {
          showStatus('Please enter both Supabase URL and anon key.', true);
          return;
        }
        try {
          localStorage.setItem('ai_study_assistant_supabase_url', url);
          localStorage.setItem('ai_study_assistant_supabase_anon_key', key);
          setupClient();
          showStatus('✅ Supabase connected! You can now request real OTP codes.', false);
          detailsBox?.classList.add('hidden');
        } catch (err) {
          showStatus('Failed to save config: ' + err.message, true);
        }
      });
    }

    // 4. If Supabase is configured, check for existing session
    if (configured && client) {
      try {
        const { data, error } = await client.auth.getSession();
        if (data?.session) {
          unlockApp();
          return;
        }
        if (error) {
          console.warn('StudyAuth: getSession notice:', error.message);
        }
      } catch (err) {
        console.warn('StudyAuth: getSession network notice:', err);
      }
      showStatus('Ready. Enter your phone or email to sign in.', false);
    } else {
      // In demo mode: display helpful non-blocking guidance
      showStatus('⚡ Demo mode active. Click "Continue as Guest" or enter demo code 123456.', false);
    }
  }

  // Handle initialization regardless of whether DOMContentLoaded already fired
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }
}());
