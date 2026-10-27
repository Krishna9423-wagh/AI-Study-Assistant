/**
 * ==========================================================================
 * AI Study Assistant - App Entry & Orchestration
 * Handles initialization, settings management, theme switching, tab navigation,
 * live Google Gemini API generation, history management, and summary export.
 *
 * NOTE: API keys are strictly read from localStorage (saved from Settings).
 * Keys are NEVER hard-coded anywhere.
 * ==========================================================================
 */

/**
 * Hard-coded fake AI response object for testing and fallback demonstrations.
 */
/**
 * Hard-coded fake AI response object for testing and initial UI demonstrations.
 * Synced with Quantum Mechanics study kit shown in the reference Study Hub UI.
 */
const DEFAULT_QUANTUM_RESPONSE = {
  title: "Quantum Mechanics",
  summary: `### Quantum Mechanics: Core Principles & Wave-Particle Duality
Quantum mechanics provides the mathematical framework describing the behavior of matter and light at atomic and subatomic dimensions.

#### 1. Wave-Particle Duality
- **de Broglie Hypothesis:** Every moving particle (such as an electron) has an associated matter wave: $\\lambda = \\frac{h}{p}$ where $h$ is Planck's constant ($6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s}$) and $p$ is linear momentum.
- **Photoelectric Effect:** Einstein demonstrated that light consists of discrete energy packets (photons) with energy $E = h\\nu$.
- **Electron Diffraction:** Davisson and Germer proved electrons diffract like light through crystal lattices.

#### 2. The Schrödinger Equation & Wavefunction
- **Wavefunction ($\\Psi$):** Completely specifies the quantum state of a physical system.
- **Born Probability Rule:** The probability density of locating a particle in space is given by $|\\Psi(x, t)|^2$.
- **Superposition Principle:** Before measurement, a quantum system exists as a linear combination of all possible eigenstates.

#### 3. Heisenberg Uncertainty Principle
- **Fundamental Limit:** Position ($x$) and momentum ($p$) cannot be simultaneously measured with arbitrary precision: $\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$.
- **Energy-Time Uncertainty:** $\\Delta E \\cdot \\Delta t \\ge \\frac{\\hbar}{2}$, allowing brief quantum vacuum fluctuations.

#### 4. Quantum Tunneling & Modern Applications
- **Barrier Penetration:** Particles possess a non-zero transmission probability to traverse potential barriers higher than their kinetic energy.
- **Key Technologies:** Powers tunnel diodes, Flash memory floating gates, scanning tunneling microscopes (STM), and nuclear fusion inside stars.`,

  outline: [
    {
      title: "1. Dual Nature of Light & Matter",
      children: [
        "Planck's quantum hypothesis and blackbody radiation resolution",
        "Photoelectric effect and photon energy quanta (E = hv)",
        "De Broglie relation (lambda = h/p) and matter wave interference",
        "Experimental proof via electron double-slit diffraction"
      ]
    },
    {
      title: "2. Wavefunctions & Quantum Measurement",
      children: [
        "Schrödinger wave equation (time-dependent and stationary states)",
        "Born interpretation: probability density |Psi|^2",
        "Quantum superposition and state collapse upon observation"
      ]
    },
    {
      title: "3. Uncertainty & Quantum Tunneling",
      children: [
        "Heisenberg position-momentum inequality (Delta x * Delta p >= hbar/2)",
        "Energy-time uncertainty relation and quantum fluctuations",
        "Tunneling through finite potential barriers and practical applications"
      ]
    }
  ],

  quiz: [
    {
      question: "What does the de Broglie equation (λ = h/p) establish?",
      options: [
        "Speed of light in a vacuum",
        "Wave-particle duality of moving matter",
        "Total binding energy of a nucleus",
        "Radioactive decay half-life"
      ],
      answer: 1,
      explanation: "The de Broglie relation demonstrates that any moving mass with momentum p possesses an associated wavelength λ."
    },
    {
      question: "According to Max Born, what physical property does |Ψ|² represent?",
      options: [
        "Exact kinetic energy of the electron",
        "Probability density of finding the particle in space",
        "Total electrical charge density",
        "Instantaneous linear acceleration"
      ],
      answer: 1,
      explanation: "The Born rule states that the squared magnitude of the wavefunction |Ψ|² gives the probability density of finding the particle at that location."
    },
    {
      question: "What is Planck's constant (h) fundamental value?",
      options: [
        "3.00 × 10⁸ m/s",
        "6.626 × 10⁻³⁴ J·s",
        "1.602 × 10⁻¹⁹ C",
        "9.109 × 10⁻³¹ kg"
      ],
      answer: 1,
      explanation: "Planck's constant h ≈ 6.626 × 10⁻³⁴ J·s relates photon frequency to its quantum of energy (E = hν)."
    },
    {
      question: "Which quantum phenomenon allows electrons to cross energy barriers higher than their kinetic energy?",
      options: [
        "Photoelectric effect",
        "Thermal expansion",
        "Quantum tunneling",
        "Centripetal acceleration"
      ],
      answer: 2,
      explanation: "Quantum tunneling occurs when the wave-like particle leaks exponentially through a finite potential barrier."
    },
    {
      question: "What does the Heisenberg Uncertainty Principle forbid?",
      options: [
        "Simultaneously measuring exact position and momentum",
        "Photons travelling at the speed of light",
        "Electrons having negative electrical charge",
        "Energy conservation in chemical reactions"
      ],
      answer: 0,
      explanation: "Δx·Δp ≥ ℏ/2 proves position and momentum cannot both have zero uncertainty simultaneously."
    }
  ],

  flashcards: [
    {
      front: "What is Planck's constant?",
      back: "h ≈ 6.626 × 10⁻³⁴ J·s: The fundamental physical constant relating photon frequency to electromagnetic energy (E = hν)."
    },
    {
      front: "Quantum Tunneling",
      back: "A quantum mechanical phenomenon where a wave-particle penetrates and traverses a potential energy barrier higher than its kinetic energy."
    },
    {
      front: "Wave-Particle Duality",
      back: "The principle that light and matter exhibit both wave-like (interference, diffraction) and particle-like (localized collisions) properties."
    },
    {
      front: "Heisenberg Uncertainty Principle",
      back: "Fundamental limit stating position and momentum cannot simultaneously be known with arbitrary precision: Δx·Δp ≥ ℏ/2."
    },
    {
      front: "Born Rule (|Ψ|²)",
      back: "The postulate stating the squared absolute magnitude of the wavefunction gives the probability density of observing a particle."
    },
    {
      front: "Quantum Superposition",
      back: "The ability of a quantum system to exist simultaneously in a linear combination of multiple possible eigenstates prior to measurement."
    }
  ],

  glossary: [
    {
      term: "Planck's Constant",
      definition: "A fundamental physical constant (h ≈ 6.626 × 10⁻³⁴ J·s) that sets the scale of quantum effects."
    },
    {
      term: "Wave-Particle Duality",
      definition: "The property where matter and electromagnetic radiation exhibit both wave and particle characteristics."
    },
    {
      term: "Quantum Tunneling",
      definition: "The transit of a particle through a potential energy barrier higher than the particle's kinetic energy."
    },
    {
      term: "Superposition",
      definition: "A principle of quantum mechanics where a physical system exists in multiple states at once until observed."
    },
    {
      term: "Schrödinger Equation",
      definition: "The fundamental differential equation describing the time evolution of a quantum mechanical wavefunction."
    },
    {
      term: "Photoelectric Effect",
      definition: "The emission of electrons from a material when light of sufficient frequency strikes its surface."
    }
  ]
};

// Global state tracking the current active study kit (for export and Q&A)
let currentStudyKit = DEFAULT_QUANTUM_RESPONSE;

// Global state tracking the current session title (for export filenames and active session badge)
let currentSessionTitle = 'Quantum Mechanics';

// Global state tracking the current active summary text (for Copy / Download)
let currentSummaryText = '';

// Global state tracking the active session ID (for flashcard mastery persistence per history item)
let currentSessionId = 'quantum_mechanics_default';

// Initialize application modules when DOM is fully loaded
function startStudyApp() {
  initTheme();
  initAccentColors();
  initSettings();
  initViewNavigation();
  initSidebarMobile();
  initTabSwitching();
  initInputToggle();
  initCharacterCounter();
  initFileUpload();
  initExportMenu();
  initErrorDismissal();
  initGenerateHandler();
  initRegenerateHandler();
  initSummaryActions();
  initHistoryModule();
  initQuizProgressModule();
  initSpeechRecognition();
  initDraftNotes();
  initPomodoroModule();
  initInteractiveTutor();
  initKeyboardShortcuts();
  initServiceWorker();
  initBentoHubHandlers();
  initInitialStudyKit();

  const signOutBtn = document.getElementById('auth-signout-btn');
  if (signOutBtn && window.StudyAuth) {
    signOutBtn.addEventListener('click', () => {
      if (confirm('Sign out and return to the login screen?')) {
        window.StudyAuth.signOut();
      }
    });
  }
}

// Initialise the study interface when authenticated, or fallback if StudyAuth is unavailable.
function attachStudyAuth() {
  if (window.StudyAuth && typeof window.StudyAuth.whenAuthenticated === 'function') {
    window.StudyAuth.whenAuthenticated(startStudyApp);
  } else {
    startStudyApp();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachStudyAuth);
} else {
  attachStudyAuth();
}

/**
 * Initializes and manages light / dark theme toggle with localStorage persistence.
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = window.StudyStorage.getTheme();

  // Apply saved theme on page load
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButtonUI(savedTheme, themeToggleBtn);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      window.StudyStorage.saveTheme(nextTheme);
      updateThemeButtonUI(nextTheme, themeToggleBtn);
    });
  }
}

/**
 * Updates theme button label and accessible title.
 * @param {string} theme - 'light' or 'dark'
 * @param {HTMLElement} btn - The theme toggle button
 */
function updateThemeButtonUI(theme, btn) {
  if (!btn) return;
  btn.setAttribute('aria-label', `Current theme is ${theme}. Click to switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  btn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

/**
 * Manages accent color selection (blue, indigo, emerald, amber, rose)
 * and persists user preference in localStorage.
 */
function initAccentColors() {
  const accentMenuBtn = document.getElementById('accent-menu-btn');
  const accentDropdown = document.getElementById('accent-dropdown');
  const chips = document.querySelectorAll('.accent-picker-chip');

  const savedAccent = window.StudyStorage.getAccentColor();
  if (savedAccent) {
    document.documentElement.setAttribute('data-accent', savedAccent);
  }

  if (accentMenuBtn && accentDropdown) {
    accentMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      accentDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!accentDropdown.contains(e.target) && e.target !== accentMenuBtn) {
        accentDropdown.classList.add('hidden');
      }
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const accent = chip.getAttribute('data-accent');
      if (accent) {
        document.documentElement.setAttribute('data-accent', accent);
        window.StudyStorage.saveAccentColor(accent);
      }
      if (accentDropdown) accentDropdown.classList.add('hidden');
    });
  });
}

/**
 * Loads saved settings from localStorage, binds AI provider switcher, and handles save action.
 */
function initSettings() {
  const providerSelect = document.getElementById('ai-provider-select');
  const geminiKeyGroup = document.getElementById('gemini-key-group');
  const groqKeyGroup = document.getElementById('groq-key-group');
  const apiKeyInput = document.getElementById('api-key-input');
  const groqApiKeyInput = document.getElementById('groq-api-key-input');
  const toggleGeminiKeyBtn = document.getElementById('toggle-gemini-key-btn');
  const toggleGroqKeyBtn = document.getElementById('toggle-groq-key-btn');
  const closeSettingsBtn = document.getElementById('close-settings-btn');
  const answerStyleSelect = document.getElementById('answer-style-select');
  const difficultySelect = document.getElementById('difficulty-select');
  const questionCountSelect = document.getElementById('question-count-select');
  const saveBtn = document.getElementById('save-settings-btn');
  const settingsToggleBtn = document.getElementById('settings-toggle-btn');
  const settingsPanel = document.getElementById('settings-panel');

  // Password Visibility Eye Toggles
  function bindPasswordToggle(btn, input) {
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
      const isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      btn.textContent = isPass ? '🔒' : '👁';
    });
  }
  bindPasswordToggle(toggleGeminiKeyBtn, apiKeyInput);
  bindPasswordToggle(toggleGroqKeyBtn, groqApiKeyInput);

  // Provider Selection & Visibility
  function updateProviderUI(provider) {
    const isGroq = provider === 'groq';
    if (geminiKeyGroup) geminiKeyGroup.classList.toggle('hidden', isGroq);
    if (groqKeyGroup) groqKeyGroup.classList.toggle('hidden', !isGroq);
    const label = document.getElementById('sidebar-provider-label');
    if (label) {
      label.textContent = isGroq ? 'Groq LLaMA 3.3 70B' : 'Gemini 1.5 Flash';
    }
  }

  const savedProvider = window.StudyStorage.getProvider();
  if (providerSelect) {
    providerSelect.value = savedProvider;
    updateProviderUI(savedProvider);
    providerSelect.addEventListener('change', () => {
      const p = providerSelect.value;
      window.StudyStorage.saveProvider(p);
      updateProviderUI(p);
    });
  }

  // Populate API Keys
  const savedGeminiKey = window.StudyStorage.getApiKey('gemini');
  if (savedGeminiKey && apiKeyInput) {
    apiKeyInput.value = savedGeminiKey;
  }
  const savedGroqKey = window.StudyStorage.getApiKey('groq');
  if (savedGroqKey && groqApiKeyInput) {
    groqApiKeyInput.value = savedGroqKey;
  }

  // General Settings
  const savedSettings = window.StudyStorage.getSettings();
  if (savedSettings.answerStyle && answerStyleSelect) {
    answerStyleSelect.value = savedSettings.answerStyle;
  }
  if (savedSettings.difficulty && difficultySelect) {
    difficultySelect.value = savedSettings.difficulty;
  }
  if (savedSettings.questionCount && questionCountSelect) {
    questionCountSelect.value = String(savedSettings.questionCount);
  }

  const timedQuizCheckbox = document.getElementById('timed-quiz-checkbox');
  if (timedQuizCheckbox && savedSettings.timedQuiz !== undefined) {
    timedQuizCheckbox.checked = Boolean(savedSettings.timedQuiz);
  }

  // Mode toggle (Use my notes vs Topic only)
  const modeNotesBtn = document.getElementById('mode-notes-btn');
  const modeTopicBtn = document.getElementById('mode-topic-btn');
  const languageSelect = document.getElementById('language-select');
  const studyTextarea = document.getElementById('study-textarea');

  function applyMode(mode) {
    const isTopic = mode === 'topic';
    if (modeNotesBtn && modeTopicBtn) {
      modeNotesBtn.classList.toggle('active', !isTopic);
      modeNotesBtn.setAttribute('aria-checked', !isTopic ? 'true' : 'false');
      modeTopicBtn.classList.toggle('active', isTopic);
      modeTopicBtn.setAttribute('aria-checked', isTopic ? 'true' : 'false');
    }
    if (studyTextarea) {
      studyTextarea.placeholder = isTopic
        ? 'Enter a specific topic or concept here... (e.g., Quantum Mechanics, Wave-Particle Duality, Photosynthesis light reactions)'
        : 'Paste your study notes, textbook excerpt, lecture transcription, or enter a topic (e.g., Quantum Mechanics, Wave-Particle Duality, Photosynthesis light reactions)...';
    }
    const cur = window.StudyStorage.getSettings();
    window.StudyStorage.saveSettings({ ...cur, mode: isTopic ? 'topic' : 'notes' });
  }

  if (savedSettings.mode) {
    applyMode(savedSettings.mode);
  }

  if (modeNotesBtn) {
    modeNotesBtn.addEventListener('click', () => applyMode('notes'));
  }
  if (modeTopicBtn) {
    modeTopicBtn.addEventListener('click', () => applyMode('topic'));
  }

  if (savedSettings.language && languageSelect) {
    languageSelect.value = savedSettings.language;
  }
  if (languageSelect) {
    languageSelect.addEventListener('change', () => {
      const cur = window.StudyStorage.getSettings();
      window.StudyStorage.saveSettings({ ...cur, language: languageSelect.value });
    });
  }

  if (answerStyleSelect) {
    answerStyleSelect.addEventListener('change', () => {
      const current = window.StudyStorage.getSettings();
      window.StudyStorage.saveSettings({
        ...current,
        answerStyle: answerStyleSelect.value,
      });
    });
  }

  if (difficultySelect) {
    difficultySelect.addEventListener('change', () => {
      const current = window.StudyStorage.getSettings();
      window.StudyStorage.saveSettings({
        ...current,
        difficulty: difficultySelect.value,
      });
    });
  }

  if (questionCountSelect) {
    questionCountSelect.addEventListener('change', () => {
      const current = window.StudyStorage.getSettings();
      window.StudyStorage.saveSettings({
        ...current,
        questionCount: parseInt(questionCountSelect.value, 10) || 5,
      });
    });
  }

  if (timedQuizCheckbox) {
    timedQuizCheckbox.addEventListener('change', () => {
      const current = window.StudyStorage.getSettings();
      window.StudyStorage.saveSettings({
        ...current,
        timedQuiz: timedQuizCheckbox.checked,
      });
    });
  }

  // Save Settings Handler (Both API keys and parameters)
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const rawGemini = apiKeyInput ? apiKeyInput.value.trim() : '';
      const rawGroq = groqApiKeyInput ? groqApiKeyInput.value.trim() : '';
      const geminiKey = (window.StudyStorage?.cleanApiKey) ? window.StudyStorage.cleanApiKey(rawGemini, 'gemini') : rawGemini;
      const groqKey = (window.StudyStorage?.cleanApiKey) ? window.StudyStorage.cleanApiKey(rawGroq, 'groq') : rawGroq;
      const provider = providerSelect ? providerSelect.value : 'gemini';
      const style = answerStyleSelect ? answerStyleSelect.value : 'explain-10';
      const diff = difficultySelect ? difficultySelect.value : 'medium';
      const qCount = questionCountSelect ? (parseInt(questionCountSelect.value, 10) || 5) : 5;
      const isTimed = timedQuizCheckbox ? timedQuizCheckbox.checked : false;

      // Auto-update input fields if cleaned (e.g. stripped quotes or extracted from curl)
      if (apiKeyInput && geminiKey && geminiKey !== rawGemini) {
        apiKeyInput.value = geminiKey;
      }
      if (groqApiKeyInput && groqKey && groqKey !== rawGroq) {
        groqApiKeyInput.value = groqKey;
      }

      window.StudyStorage.saveApiKey(geminiKey, 'gemini');
      window.StudyStorage.saveApiKey(groqKey, 'groq');
      window.StudyStorage.saveProvider(provider);
      window.StudyStorage.saveSettings({
        answerStyle: style,
        difficulty: diff,
        questionCount: qCount,
        timedQuiz: isTimed,
      });

      // Visual feedback on save button
      const originalText = saveBtn.innerHTML;
      saveBtn.innerHTML = `
        <svg class="icon btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Settings Saved!</span>
      `;
      saveBtn.style.borderColor = 'var(--color-primary-500)';

      // Check for malformed keys when saving
      if (provider === 'groq' && rawGroq) {
        if (rawGroq.startsWith('curl') || rawGroq.startsWith('http') || !groqKey.startsWith('gsk_')) {
          showError(
            '⚠️ Warning: Your Groq API key appears invalid. Groq API keys start with "gsk_" (for example: gsk_xxxxxxxx...). It looks like a curl command or URL was pasted. Please create a free API key at https://console.groq.com/keys and paste only the key.',
            'Groq Key Format Warning'
          );
        }
      }

      // Hide error box if it was warning about missing API key and key is now valid
      const activeKey = provider === 'groq' ? groqKey : geminiKey;
      const errorBox = document.getElementById('error-box');
      if (activeKey && errorBox && !errorBox.classList.contains('hidden')) {
        const errorMsg = document.getElementById('error-message')?.textContent || '';
        if (errorMsg.includes('API key') && !errorMsg.includes('Warning')) {
          errorBox.classList.add('hidden');
        }
      }

      setTimeout(() => {
        saveBtn.innerHTML = originalText;
        saveBtn.style.borderColor = '';
      }, 1600);
    });
  }

  // Real-Time API Key Connection Tester
  const testKeyBtn = document.getElementById('test-api-key-btn');
  const testStatusBox = document.getElementById('api-test-status-box');

  if (testKeyBtn) {
    testKeyBtn.addEventListener('click', async () => {
      const provider = providerSelect ? providerSelect.value : 'gemini';
      const rawKey = provider === 'groq'
        ? (groqApiKeyInput ? groqApiKeyInput.value.trim() : '')
        : (apiKeyInput ? apiKeyInput.value.trim() : '');

      if (!testStatusBox) return;

      testStatusBox.classList.remove('hidden');
      testStatusBox.style.background = 'rgba(56, 189, 248, 0.12)';
      testStatusBox.style.border = '1px solid rgba(56, 189, 248, 0.4)';
      testStatusBox.style.color = '#38bdf8';
      testStatusBox.innerHTML = `<span>⏳ Testing live connection to ${provider === 'groq' ? 'Groq (LLaMA 3.3 70B)' : 'Google Gemini (1.5 Flash)'}...</span>`;

      if (window.StudyApi && typeof window.StudyApi.testApiKey === 'function') {
        const result = await window.StudyApi.testApiKey(provider, rawKey);

        if (result.ok) {
          testStatusBox.style.background = 'rgba(34, 197, 94, 0.15)';
          testStatusBox.style.border = '1px solid #22c55e';
          testStatusBox.style.color = '#4ade80';
          testStatusBox.innerHTML = `<strong>✅ API Key Verified:</strong> ${result.message}`;
        } else {
          testStatusBox.style.background = 'rgba(239, 68, 68, 0.15)';
          testStatusBox.style.border = '1px solid #ef4444';
          testStatusBox.style.color = '#fca5a5';
          testStatusBox.innerHTML = `<strong>❌ API Connection Error:</strong> ${result.error}<br><span style="display:inline-block; margin-top:6px; color:rgba(255,255,255,0.75);">💡 Don't worry! You can use the app right now without an API key—our built-in Smart Educational Engine automatically generates notes, quizzes, and flashcards offline.</span>`;
        }
      }
    });
  }

  // Settings Panel Toggle and Close Buttons
  if (settingsToggleBtn && settingsPanel) {
    settingsToggleBtn.addEventListener('click', () => {
      settingsPanel.classList.toggle('hidden');
    });
  }
  if (closeSettingsBtn && settingsPanel) {
    closeSettingsBtn.addEventListener('click', () => {
      settingsPanel.classList.add('hidden');
    });
  }

  // Global leak-proof cleanup: clear all timers when user leaves the browser tab or page
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.StudyRender && window.StudyRender.cleanupQuizTimers) {
      window.StudyRender.cleanupQuizTimers();
    }
  });

  window.addEventListener('beforeunload', () => {
    if (window.StudyRender && window.StudyRender.cleanupQuizTimers) {
      window.StudyRender.cleanupQuizTimers();
    }
  });

  window.addEventListener('pagehide', () => {
    if (window.StudyRender && window.StudyRender.cleanupQuizTimers) {
      window.StudyRender.cleanupQuizTimers();
    }
  });
}

/**
 * Switches the active application view between Study Hub, Dashboard, Sessions, Pomodoro, and Settings.
 * @param {string} viewId - One of 'study-hub', 'dashboard', 'sessions', 'pomodoro', 'settings'
 */
function switchView(viewId) {
  const navBtns = document.querySelectorAll('.app-sidebar .nav-item-btn');
  const views = document.querySelectorAll('.views-container .view-panel');
  const pageTitle = document.getElementById('main-header-title');

  // Map 'courses' to 'sessions' view panel and 'progress' to 'dashboard'
  let targetPanelId = viewId;
  if (viewId === 'courses') targetPanelId = 'sessions';
  if (viewId === 'progress') targetPanelId = 'dashboard';

  navBtns.forEach((btn) => {
    const btnView = btn.getAttribute('data-view');
    const isTarget = btnView === viewId;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  views.forEach((panel) => {
    const isTarget = panel.id === `view-${targetPanelId}`;
    panel.classList.toggle('hidden', !isTarget);
    panel.classList.toggle('active-view', isTarget);
  });

  const titles = {
    'study-hub': 'My Study Hub',
    'dashboard': 'Performance Dashboard',
    'courses': 'My Courses & Sessions',
    'sessions': 'Saved Study Sessions',
    'progress': 'Learning Mastery & Progress',
    'pomodoro': 'Focus & Pomodoro Timer',
    'settings': 'Assistant Settings',
  };
  if (pageTitle && titles[viewId]) {
    pageTitle.textContent = titles[viewId];
  }

  // View-specific initialization triggers
  if (viewId === 'dashboard' || viewId === 'progress') {
    const dbContainer = document.getElementById('dashboard-container');
    if (dbContainer && window.StudyRender?.renderDashboard) {
      window.StudyRender.renderDashboard(dbContainer);
    }
  } else if (viewId === 'courses' || viewId === 'sessions') {
    refreshHistoryUI();
  } else if (viewId === 'pomodoro') {
    const pomoContainer = document.getElementById('pomodoro-container');
    if (pomoContainer && !pomoContainer.hasChildNodes() && window.StudyRender?.renderPomodoro) {
      window.StudyRender.renderPomodoro(pomoContainer);
      bindPomodoroControls();
    }
  } else if (viewId === 'settings') {
    const settingsPanel = document.getElementById('settings-panel');
    if (settingsPanel) {
      settingsPanel.classList.remove('hidden');
    }
  }

  // Close mobile sidebar if open
  const sidebar = document.getElementById('app-sidebar');
  if (sidebar) sidebar.classList.remove('mobile-open');
}

/**
 * Binds view switching listeners to sidebar buttons.
 */
function initViewNavigation() {
  const navBtns = document.querySelectorAll('.sidebar-nav .nav-item-btn');
  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      if (view) switchView(view);
    });
  });
}

/**
 * Initializes mobile responsive drawer toggle for the left sidebar.
 */
function initSidebarMobile() {
  const toggleBtn = document.getElementById('sidebar-mobile-toggle');
  const sidebar = document.getElementById('app-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('mobile-open');
    });

    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }
}

/**
 * Enables expanding/collapsing the study material input card to maximize output viewing area.
 */
function initInputToggle() {
  const toggleBtn = document.getElementById('btn-toggle-input');
  const body = document.getElementById('input-card-body');
  const label = document.getElementById('input-toggle-label');

  if (toggleBtn && body) {
    toggleBtn.addEventListener('click', () => {
      const isCollapsed = body.classList.toggle('collapsed');
      if (label) {
        label.textContent = isCollapsed ? 'Show Input' : 'Hide Input';
      }
      toggleBtn.classList.toggle('is-collapsed', isCollapsed);
    });
  }
}

/**
 * Tab switching controller between Summary, Quiz, and Flashcards with WAI-ARIA support.
 */
function initTabSwitching() {
  const tabButtons = document.querySelectorAll('.tabs-nav [role="tab"]');
  const tabPanels = document.querySelectorAll('.tabs-body [role="tabpanel"]');

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      activateTab(btn.getAttribute('aria-controls'), btn);
    });

    btn.addEventListener('keydown', (e) => {
      let targetIndex = null;
      if (e.key === 'ArrowRight') targetIndex = (index + 1) % tabButtons.length;
      else if (e.key === 'ArrowLeft') targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      else if (e.key === 'Home') targetIndex = 0;
      else if (e.key === 'End') targetIndex = tabButtons.length - 1;

      if (targetIndex !== null) {
        e.preventDefault();
        const nextBtn = tabButtons[targetIndex];
        nextBtn.focus();
        activateTab(nextBtn.getAttribute('aria-controls'), nextBtn);
      }
    });
  });
}

/**
 * Activates a designated tab panel and selects its tab button.
 * @param {string} targetPanelId - The ID of the panel to reveal
 * @param {HTMLElement} clickedBtn - The corresponding tab button
 */
function activateTab(targetPanelId, clickedBtn) {
  const tabButtons = document.querySelectorAll('.tabs-nav [role="tab"]');
  const tabPanels = document.querySelectorAll('.tabs-body [role="tabpanel"]');

  tabButtons.forEach((btn) => {
    const isSelected = btn === clickedBtn || btn.getAttribute('aria-controls') === targetPanelId;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    btn.setAttribute('tabindex', isSelected ? '0' : '-1');
  });

  tabPanels.forEach((panel) => {
    if (panel.id === targetPanelId) {
      panel.classList.remove('hidden');
      panel.classList.add('active');
    } else {
      panel.classList.add('hidden');
      panel.classList.remove('active');
    }
  });

  // Clear all timers properly when the user leaves the quiz tab to avoid timer leaks
  if (targetPanelId !== 'tab-quiz-panel' && window.StudyRender && window.StudyRender.cleanupQuizTimers) {
    window.StudyRender.cleanupQuizTimers();
  }
}

/**
 * Attaches the generation handler to the Generate button.
 * Validates inputs, disables button while working, communicates with Gemini API,
 * parses and validates JSON, updates UI, and stores in history using try/catch/finally.
 */
function initGenerateHandler() {
  const generateBtn = document.getElementById('generate-btn');
  const loadingIndicator = document.getElementById('loading-indicator');
  const errorBox = document.getElementById('error-box');
  const textarea = document.getElementById('study-textarea');
  const difficultySelect = document.getElementById('difficulty-select');
  const answerStyleSelect = document.getElementById('answer-style-select');
  const questionCountSelect = document.getElementById('question-count-select');
  const apiKeyInput = document.getElementById('api-key-input');

  if (!generateBtn) return;

  generateBtn.addEventListener('click', async () => {
    // 1. Read API Key for the active provider (Gemini or Groq)
    const activeProvider = window.StudyStorage.getProvider();
    const activeInput = activeProvider === 'groq'
      ? document.getElementById('groq-api-key-input')
      : document.getElementById('api-key-input');

    // Priority: If user typed in the input box, clean and use that value
    const rawInputVal = activeInput ? activeInput.value.trim() : '';
    let apiKey = rawInputVal
      ? (window.StudyStorage?.cleanApiKey ? window.StudyStorage.cleanApiKey(rawInputVal, activeProvider) : rawInputVal)
      : window.StudyStorage.getApiKey(activeProvider);

    if (rawInputVal) {
      window.StudyStorage.saveApiKey(rawInputVal, activeProvider);
    }

    // 2. Read and validate Study Notes Input
    let content = textarea ? textarea.value.trim() : '';
    const isTopicMode = document.getElementById('mode-topic-btn')?.classList.contains('active');
    const mode = isTopicMode ? 'topic' : 'notes';
    const languageSelect = document.getElementById('language-select');
    const language = languageSelect ? languageSelect.value : 'English';

    // If input is empty, auto-populate with high-yield sample notes so user is never blocked
    if (!content) {
      content = "The Industrial Revolution, which began in Britain in the late 18th century, transformed human life more dramatically than almost any other event in history. Inventions like James Watt's improved steam engine, the spinning jenny, and the power loom shifted production into factories, while railways and steamships shrank distances and connected markets.";
      if (textarea) {
        textarea.value = content;
        if (typeof window.updateNotesCount === 'function') {
          window.updateNotesCount();
        }
      }
    }

    // 2b. Block Generate if notes exceed 8,000 characters
    if (content.length > 8000) {
      showError(
        `Your study notes exceed the maximum limit of 8,000 characters (${content.length.toLocaleString()} / 8,000). Please shorten your notes before generating.`,
        'Character Limit Exceeded'
      );
      if (textarea) textarea.focus();
      return;
    }

    const difficulty = difficultySelect ? difficultySelect.value : 'medium';
    const answerStyle = answerStyleSelect ? answerStyleSelect.value : 'explain-10';
    const questionCount = questionCountSelect ? (parseInt(questionCountSelect.value, 10) || 5) : 5;

    // 3. Enter working state: disable Generate button, show loading indicator
    setWorkingState(true, generateBtn, loadingIndicator, errorBox);

    try {
      // 4. Request study kit from active AI provider API via fetch()
      const rawText = await window.StudyApi.fetchStudyKit({
        apiKey,
        provider: activeProvider,
        content,
        difficulty,
        style: answerStyle,
        questionCount,
        mode,
        language,
      });

      // 5. Parse and validate JSON (strips ```json code fences and verifies schema + question count)
      const studyKit = window.StudyParser.parseStudyKitResponse(rawText, questionCount);

      // 6. Update current active summary text for Copy/Download and set active study kit
      currentSummaryText = studyKit.summary || '';
      currentStudyKit = studyKit;
      const sessionTitle = extractSessionTitle(content, studyKit);
      currentSessionTitle = sessionTitle;

      // Update active session pill
      const activeSessionTitleEl = document.getElementById('active-session-title');
      if (activeSessionTitleEl) {
        activeSessionTitleEl.textContent = sessionTitle;
      }

      // 7. Save successful result to history in localStorage
      const savedItem = window.StudyStorage.saveHistoryItem({
        title: sessionTitle,
        notes: content,
        difficulty: difficulty,
        answerStyle: answerStyle,
        questionCount: questionCount,
        mode: mode,
        language: language,
        provider: activeProvider,
        result: studyKit,
        date: new Date().toISOString(),
      });
      currentSessionId = savedItem ? savedItem.id : ('session_' + Date.now());

      // 8. Render the generated study kit into the tabs with session ID and metadata
      window.StudyRender.renderStudyKit(studyKit, currentSessionId, {
        topicTitle: sessionTitle,
        difficulty: difficulty,
      });

      // 9. Update panel status indicators
      updatePanelIndicators(studyKit);

      // 10. Refresh history list UI & record activity
      window.StudyStorage.recordActivity();
      refreshHistoryUI();

      // If generated offline or fallback due to key issue, show an informative banner
      if (window._lastGenerationOffline) {
        const errorBox = document.getElementById('error-box');
        const errorMsgEl = document.getElementById('error-message');
        const errorTitleEl = document.getElementById('error-title');
        if (errorBox && errorMsgEl) {
          if (errorTitleEl) errorTitleEl.textContent = '⚡ Generated via Smart Educational Engine';
          errorMsgEl.textContent = 'Your Study Kit was generated successfully! Your Groq API key is either invalid or unauthorized (HTTP 401). We generated your complete study pack offline so your study session is never interrupted. Get a free Groq key at https://console.groq.com/keys anytime to switch to cloud AI.';
          errorBox.classList.remove('hidden');
          errorBox.style.borderColor = 'var(--hub-cyan, #00f0ff)';
          errorBox.style.background = 'rgba(0, 240, 255, 0.08)';
        }
      }

    } catch (err) {
      console.error('app.js: Generation process error:', err);
      showError(err.message || 'An unexpected error occurred during study kit synthesis.');
    } finally {
      // 11. Always exit working state: re-enable Generate button and hide loading indicator
      setWorkingState(false, generateBtn, loadingIndicator, errorBox);
    }
  });
}

/**
 * Extracts a concise, descriptive title for the history session.
 * @param {string} content - User notes
 * @param {Object} studyKit - Generated study kit
 * @returns {string} Session title
 */
function extractSessionTitle(content, studyKit) {
  // Check if summary has a markdown heading
  if (studyKit && studyKit.summary) {
    const headingMatch = studyKit.summary.match(/^###?\s*(.+)$/m);
    if (headingMatch && headingMatch[1].trim()) {
      return headingMatch[1].trim().slice(0, 60);
    }
  }

  // Fallback to first line of notes
  if (content) {
    const firstLine = content.split('\n')[0].replace(/^#+\s*/, '').trim();
    if (firstLine) {
      return firstLine.slice(0, 50) + (firstLine.length > 50 ? '...' : '');
    }
  }

  return 'Study Session - ' + new Date().toLocaleDateString();
}

/**
 * Sets button and loading indicator working state.
 * @param {boolean} isWorking - Whether generation is in progress
 * @param {HTMLButtonElement} btn - The generate button
 * @param {HTMLElement} loader - The loading indicator
 * @param {HTMLElement} error - The error box
 */
function setWorkingState(isWorking, btn, loader, error) {
  btn.disabled = isWorking;
  const skeletonLoader = document.getElementById('skeleton-loader');
  const tabPanels = document.querySelectorAll('.tabs-body [role="tabpanel"]');

  if (isWorking) {
    btn.dataset.originalHtml = btn.innerHTML;
    btn.innerHTML = `
      <svg class="icon btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 0.8s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Generating Study Kit...</span>
    `;

    if (loader) loader.classList.remove('hidden');
    if (error) error.classList.add('hidden');
    if (skeletonLoader) skeletonLoader.classList.remove('hidden');
    tabPanels.forEach((p) => p.classList.add('hidden-during-load'));
  } else {
    if (btn.dataset.originalHtml) {
      btn.innerHTML = btn.dataset.originalHtml;
    }
    if (loader) loader.classList.add('hidden');
    if (skeletonLoader) skeletonLoader.classList.add('hidden');
    tabPanels.forEach((p) => p.classList.remove('hidden-during-load'));
  }
}

/**
 * Displays an error message with title in the error alert box.
 * @param {string} message - Error description
 * @param {string} title - Error title
 */
function showError(message, title = 'Generation Error') {
  const errorBox = document.getElementById('error-box');
  const errorTitle = document.getElementById('error-title');
  const errorMessage = document.getElementById('error-message');

  if (errorTitle) errorTitle.textContent = title;
  if (errorMessage) errorMessage.textContent = message;

  if (errorBox) {
    errorBox.classList.remove('hidden');
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Initializes error dismiss button listener.
 */
function initErrorDismissal() {
  const dismissBtn = document.getElementById('error-dismiss-btn');
  const errorBox = document.getElementById('error-box');

  if (dismissBtn && errorBox) {
    dismissBtn.addEventListener('click', () => {
      errorBox.classList.add('hidden');
    });
  }
}

/**
 * Updates status indicators in the tab headers after generation or session load.
 * @param {Object} studyKit - The active study kit
 */
function updatePanelIndicators(studyKit) {
  const summaryPanel = document.getElementById('tab-summary-panel');
  const quizPanel = document.getElementById('tab-quiz-panel');
  const flashcardsPanel = document.getElementById('tab-flashcards-panel');

  if (summaryPanel) {
    const status = summaryPanel.querySelector('.status-indicator');
    if (status) status.textContent = 'Ready';
  }

  if (quizPanel) {
    const status = quizPanel.querySelector('.status-indicator');
    const count = studyKit?.quiz?.length || 5;
    if (status) status.textContent = `${count} Questions Ready`;
  }

  if (flashcardsPanel) {
    const status = flashcardsPanel.querySelector('.status-indicator');
    const count = studyKit?.flashcards?.length || 5;
    if (status) status.textContent = `${count} Cards Ready`;
  }

  const glossaryPanel = document.getElementById('tab-glossary-panel');
  if (glossaryPanel) {
    const status = glossaryPanel.querySelector('.status-indicator');
    const count = studyKit?.glossary?.length || 0;
    if (status) status.textContent = `${count} Terms Ready`;
  }
}

/**
 * Live character counter with warning thresholds for study notes.
 * Turns orange at 80% (6,400 chars) and red at 100% (8,000 chars),
 * and blocks Generate over the limit with a clear message.
 */
function initCharacterCounter() {
  const textarea = document.getElementById('study-textarea');
  const counter = document.getElementById('char-counter');
  const counterBadge = document.getElementById('char-counter-container');
  const warningBox = document.getElementById('char-limit-warning');
  const warningText = document.getElementById('char-warning-text');

  if (!textarea || !counter) return;

  const MAX_LIMIT = 8000;
  const WARNING_LIMIT = Math.floor(MAX_LIMIT * 0.8); // 6,400 chars (80%)

  function updateCount() {
    const len = textarea.value.length;
    counter.textContent = len.toLocaleString();

    // Check thresholds: 80% (6,400) = orange, 100% (8,000) = red
    if (len >= MAX_LIMIT) {
      if (counterBadge) {
        counterBadge.className = 'char-counter-badge critical';
      }
      if (warningBox && warningText) {
        warningBox.className = 'char-limit-warning critical';
        if (len > MAX_LIMIT) {
          warningText.textContent = `⛔ Character limit exceeded (${len.toLocaleString()} / ${MAX_LIMIT.toLocaleString()}). Generate is blocked until notes are shortened.`;
        } else {
          warningText.textContent = `⚠️ Maximum character limit reached (8,000 / 8,000 max).`;
        }
        warningBox.classList.remove('hidden');
      }
    } else if (len >= WARNING_LIMIT) {
      if (counterBadge) {
        counterBadge.className = 'char-counter-badge warning';
      }
      if (warningBox && warningText) {
        warningBox.className = 'char-limit-warning';
        warningText.textContent = `⚠️ Approaching limit (${len.toLocaleString()} / 8,000 characters). Notes are at 80%+ capacity.`;
        warningBox.classList.remove('hidden');
      }
    } else {
      if (counterBadge) {
        counterBadge.className = 'char-counter-badge';
      }
      if (warningBox) {
        warningBox.classList.add('hidden');
      }
    }
  }

  textarea.addEventListener('input', updateCount);
  window.updateNotesCount = updateCount;

  // Quick Sample Chips click handlers
  const sampleData = {
    history: "The Industrial Revolution, which began in Britain in the late 18th century, transformed human life more dramatically than almost any other event in history. Before it, most people lived in rural communities and made goods by hand, relying on human and animal muscle, wind, and water for power. Inventions like James Watt's improved steam engine, the spinning jenny, and the power loom shifted production into factories, while railways and steamships shrank distances and connected markets.",
    bio: "Cell Biology: The cell is the fundamental structural and functional unit of all living organisms. Within eukaryotic cells, mitochondria generate ATP through aerobic cellular respiration and oxidative phosphorylation across the inner cristae folds. The nucleus stores DNA, which directs protein synthesis through transcription into messenger RNA and translation at ribosomes.",
    chem: "Organic Chemistry: Alkanes are saturated hydrocarbons containing only single covalent carbon-carbon and carbon-hydrogen bonds, described by the general molecular formula CnH2n+2. They exhibit tetrahedral sp3 carbon geometry with 109.5-degree bond angles. Alkanes undergo exothermic combustion to produce carbon dioxide and water, as well as free-radical halogenation under ultraviolet light.",
    quantum: "Quantum Mechanics: In quantum physics, energy and physical properties are quantized into discrete packets. Wave-particle duality establishes that matter such as electrons and light photons exhibit both continuous wave interference and discrete particle collision properties. The de Broglie relation lambda = h / p connects momentum to wavelength, while the Heisenberg uncertainty principle bounds simultaneous position and momentum measurement precision."
  };

  const sampleChips = document.querySelectorAll('.btn-sample-chip');
  sampleChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const type = chip.getAttribute('data-sample');
      if (type && sampleData[type]) {
        textarea.value = sampleData[type];
        updateCount();
        textarea.focus();
        textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
}

/**
 * Handles .txt file upload using the FileReader API.
 * Puts file text into the study-textarea, trims to 8,000 char limit with warning,
 * and rejects other file types or empty files with a clear message.
 */
function initFileUpload() {
  const uploadBtn = document.getElementById('upload-txt-btn');
  const fileInput = document.getElementById('txt-file-input');
  const textarea = document.getElementById('study-textarea');

  if (!uploadBtn || !fileInput || !textarea) return;

  uploadBtn.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type / extension: accept only .txt
    const fileName = file.name || '';
    const isTxt = fileName.toLowerCase().endsWith('.txt') || file.type === 'text/plain';

    if (!isTxt) {
      showError(
        `Invalid file type "${fileName}". Only plain text (.txt) files are supported. PDF, Word, and other formats are not accepted.`,
        'Unsupported File Format'
      );
      fileInput.value = '';
      return;
    }

    // Check if empty file
    if (file.size === 0) {
      showError(
        `The file "${fileName}" is empty (0 bytes). Please upload a .txt file containing your study material.`,
        'Empty File'
      );
      fileInput.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawContent = event.target?.result;
      if (typeof rawContent !== 'string') {
        showError('Unable to read text from file.', 'File Read Error');
        fileInput.value = '';
        return;
      }

      const trimmedContent = rawContent.trim();
      if (!trimmedContent) {
        showError(
          `The file "${fileName}" contains only blank space. Please upload a file with actual notes or text.`,
          'Empty File'
        );
        fileInput.value = '';
        return;
      }

      let finalText = trimmedContent;
      let wasTrimmed = false;
      const MAX_CHARS = 8000;

      if (finalText.length > MAX_CHARS) {
        finalText = finalText.slice(0, MAX_CHARS);
        wasTrimmed = true;
      }

      textarea.value = finalText;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));

      if (wasTrimmed) {
        showError(
          `The file "${fileName}" exceeded the 8,000 character limit and was trimmed to the first 8,000 characters.`,
          'Text Trimmed to Limit'
        );
      } else {
        // Clear error box if open
        const errorBox = document.getElementById('error-box');
        if (errorBox) errorBox.classList.add('hidden');
      }

      if (window.StudyUtils && window.StudyUtils.showToast) {
        window.StudyUtils.showToast(
          wasTrimmed ? `Loaded "${fileName}" (trimmed to 8,000 chars)` : `Loaded "${fileName}" successfully!`,
          wasTrimmed ? 'warning' : 'success'
        );
      }

      fileInput.value = '';
    };

    reader.onerror = () => {
      showError(`Error reading file "${fileName}". Please try again.`, 'File Read Error');
      fileInput.value = '';
    };

    reader.readAsText(file);
  });
}

/**
 * Initializes summary export buttons: Copy to clipboard & Download as .txt
 */
function initSummaryActions() {
  const copyBtn = document.getElementById('copy-summary-btn');
  const downloadBtn = document.getElementById('download-summary-btn');

  // 1. Copy Summary to Clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      if (!currentSummaryText) {
        showError('No summary available to copy yet. Please generate a study kit or select one from history.', 'Nothing to Copy');
        return;
      }

      const success = await window.StudyUtils.copyToClipboard(currentSummaryText);
      if (success) {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.classList.add('btn-success');
        copyBtn.innerHTML = `
          <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Copied!</span>
        `;
        setTimeout(() => {
          copyBtn.classList.remove('btn-success');
          copyBtn.innerHTML = originalHtml;
        }, 1800);
      } else {
        showError('Unable to copy text to clipboard. Please copy manually.', 'Copy Failed');
      }
    });
  }

  // 2. Download Summary as .txt
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (!currentSummaryText) {
        showError('No summary available to download yet. Please generate a study kit or select one from history.', 'Nothing to Download');
        return;
      }

      const filename = `study-summary-${Date.now()}.txt`;
      window.StudyUtils.downloadTextFile(filename, currentSummaryText);

      const originalHtml = downloadBtn.innerHTML;
      downloadBtn.classList.add('btn-success');
      downloadBtn.innerHTML = `
        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Downloaded!</span>
      `;
      setTimeout(() => {
        downloadBtn.classList.remove('btn-success');
        downloadBtn.innerHTML = originalHtml;
      }, 1800);
    });
  }

  // 3. Read Summary Aloud with Web Speech Synthesis API
  const speakBtn = document.getElementById('speak-summary-btn');
  const stopBtn = document.getElementById('stop-speech-btn');

  function setSpeakingUI(isSpeaking) {
    if (!speakBtn || !stopBtn) return;
    if (isSpeaking) {
      speakBtn.classList.add('is-speaking');
      speakBtn.querySelector('span').textContent = 'Reading...';
      stopBtn.classList.remove('hidden');
    } else {
      speakBtn.classList.remove('is-speaking');
      speakBtn.querySelector('span').textContent = 'Read Aloud';
      stopBtn.classList.add('hidden');
    }
  }

  if (speakBtn) {
    speakBtn.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) {
        showError('Speech Synthesis is not supported in this browser.', 'Audio Not Supported');
        return;
      }

      if (!currentSummaryText) {
        showError('No summary available to read aloud. Please generate or load a study kit first.', 'Nothing to Read');
        return;
      }

      // If already speaking, restart
      window.speechSynthesis.cancel();

      const cleanText = window.StudyUtils.stripMarkdownForSpeech(currentSummaryText);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setSpeakingUI(true);
      };

      utterance.onend = () => {
        setSpeakingUI(false);
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error or cancellation:', e);
        setSpeakingUI(false);
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setSpeakingUI(false);
    });
  }

  // Cancel ongoing speech if user leaves page or switches tabs
  window.addEventListener('beforeunload', () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  });
}

/**
 * Downloads flashcards as a properly quoted CSV file (front, back).
 * @param {Array<Object>} flashcards
 * @param {string} [title='flashcards']
 */
function exportFlashcardsCSV(flashcards, title = 'flashcards') {
  if (!Array.isArray(flashcards) || flashcards.length === 0) {
    if (window.StudyUtils?.showToast) {
      window.StudyUtils.showToast('No flashcards available to export.', 'warning');
    }
    return;
  }

  const lines = ['"front","back"'];
  flashcards.forEach((card) => {
    const frontEscaped = window.StudyUtils ? window.StudyUtils.escapeCsvValue(card.front || '') : `"${(card.front || '').replace(/"/g, '""')}"`;
    const backEscaped = window.StudyUtils ? window.StudyUtils.escapeCsvValue(card.back || '') : `"${(card.back || '').replace(/"/g, '""')}"`;
    lines.push(`${frontEscaped},${backEscaped}`);
  });

  const csvContent = lines.join('\n');
  const safeTitle = (title || 'flashcards').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  window.StudyUtils.downloadTextFile(`${safeTitle}-flashcards.csv`, csvContent, 'text/csv;charset=utf-8');
  if (window.StudyUtils?.showToast) {
    window.StudyUtils.showToast('Flashcards downloaded as CSV!', 'success');
  }
}

/**
 * Downloads the full study pack as a formatted .json file.
 * @param {Object} studyKit
 * @param {string} [title='study-pack']
 */
function exportStudyPackJson(studyKit, title = 'study-pack') {
  if (!studyKit) {
    if (window.StudyUtils?.showToast) {
      window.StudyUtils.showToast('No study pack available to export.', 'warning');
    }
    return;
  }
  const jsonContent = JSON.stringify(studyKit, null, 2);
  const safeTitle = (title || 'study-pack').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  window.StudyUtils.downloadTextFile(`${safeTitle}.json`, jsonContent, 'application/json;charset=utf-8');
  if (window.StudyUtils?.showToast) {
    window.StudyUtils.showToast('Study pack downloaded as JSON!', 'success');
  }
}

/**
 * Downloads the full study pack as a structured .txt file.
 * @param {Object} studyKit
 * @param {string} [title='study-pack']
 */
function exportStudyPackTxt(studyKit, title = 'study-pack') {
  if (!studyKit) {
    if (window.StudyUtils?.showToast) {
      window.StudyUtils.showToast('No study pack available to export.', 'warning');
    }
    return;
  }

  let out = `================================================================================\n`;
  out += `STUDY PACK: ${(title || 'STUDY PACK').toUpperCase()}\n`;
  out += `Generated by AI Study Assistant • ${new Date().toLocaleDateString()}\n`;
  out += `================================================================================\n\n`;

  if (studyKit.summary) {
    out += `--- EXECUTIVE SUMMARY ---\n\n`;
    out += `${studyKit.summary.trim()}\n\n`;
  }

  if (Array.isArray(studyKit.quiz) && studyKit.quiz.length > 0) {
    out += `--- PRACTICE QUIZ (${studyKit.quiz.length} Questions) ---\n\n`;
    const letters = ['A', 'B', 'C', 'D'];
    studyKit.quiz.forEach((q, idx) => {
      out += `Q${idx + 1}: ${q.question}\n`;
      if (Array.isArray(q.options)) {
        q.options.forEach((opt, oIdx) => {
          out += `  ${letters[oIdx] || oIdx + 1}) ${opt}\n`;
        });
        out += `  Answer: ${letters[q.answer] || q.answer + 1}) ${q.options[q.answer]}\n`;
      }
      if (q.explanation) {
        out += `  Explanation: ${q.explanation}\n`;
      }
      out += `\n`;
    });
  }

  if (Array.isArray(studyKit.flashcards) && studyKit.flashcards.length > 0) {
    out += `--- FLASHCARDS (${studyKit.flashcards.length} Cards) ---\n\n`;
    studyKit.flashcards.forEach((card, idx) => {
      out += `Card #${idx + 1}:\n`;
      out += `  Front: ${card.front}\n`;
      out += `  Back:  ${card.back}\n\n`;
    });
  }

  if (Array.isArray(studyKit.glossary) && studyKit.glossary.length > 0) {
    out += `--- GLOSSARY (${studyKit.glossary.length} Key Terms) ---\n\n`;
    studyKit.glossary.forEach((item, idx) => {
      out += `#${idx + 1} ${item.term}: ${item.definition}\n\n`;
    });
  }

  const safeTitle = (title || 'study-pack').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  window.StudyUtils.downloadTextFile(`${safeTitle}.txt`, out, 'text/plain;charset=utf-8');
  if (window.StudyUtils?.showToast) {
    window.StudyUtils.showToast('Study pack downloaded as TXT!', 'success');
  }
}

/**
 * Initializes the Export dropdown menu and options: Print, CSV, JSON, and TXT.
 */
function initExportMenu() {
  const exportBtn = document.getElementById('export-menu-btn');
  const exportDropdown = document.getElementById('export-dropdown-menu');
  const printBtn = document.getElementById('export-print-btn');
  const csvBtn = document.getElementById('export-csv-cards-btn');
  const jsonBtn = document.getElementById('export-json-btn');
  const txtBtn = document.getElementById('export-txt-btn');

  if (!exportBtn || !exportDropdown) return;

  function toggleMenu(show) {
    const isShown = typeof show === 'boolean' ? show : exportDropdown.classList.contains('hidden');
    exportDropdown.classList.toggle('hidden', !isShown);
    exportBtn.setAttribute('aria-expanded', isShown ? 'true' : 'false');
  }

  exportBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', (e) => {
    if (!exportDropdown.contains(e.target) && e.target !== exportBtn) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !exportDropdown.classList.contains('hidden')) {
      toggleMenu(false);
      exportBtn.focus();
    }
  });

  // 1. Print View (Paper / PDF)
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      toggleMenu(false);
      window.print();
    });
  }

  // 2. CSV Flashcards
  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      toggleMenu(false);
      const cards = currentStudyKit?.flashcards;
      exportFlashcardsCSV(cards, currentSessionTitle);
    });
  }

  // 3. JSON Pack
  if (jsonBtn) {
    jsonBtn.addEventListener('click', () => {
      toggleMenu(false);
      exportStudyPackJson(currentStudyKit, currentSessionTitle);
    });
  }

  // 4. TXT Pack
  if (txtBtn) {
    txtBtn.addEventListener('click', () => {
      toggleMenu(false);
      exportStudyPackTxt(currentStudyKit, currentSessionTitle);
    });
  }
}

// Active history search, difficulty filter, and sort state
let currentHistorySearchQuery = '';
let currentHistoryDifficultyFilter = 'all';
let currentHistorySort = 'newest';

/**
 * Initializes History module: loading, search filtering (title and notes as user types),
 * sort dropdown (newest/oldest), difficulty chip filtering, selecting without API call,
 * individual deletion, and Clear All.
 */
function initHistoryModule() {
  const searchInput = document.getElementById('history-search-input');
  const sortSelect = document.getElementById('history-sort-select');
  const clearAllBtn = document.getElementById('clear-history-btn');
  const filterChips = document.querySelectorAll('.history-chip');

  // Initial render of saved history
  applyHistoryFilters();

  // Search filter as user types with debouncing (filters by title and notes)
  if (searchInput) {
    const handleSearch = window.StudyUtils.debounce(() => {
      currentHistorySearchQuery = searchInput.value;
      applyHistoryFilters();
    }, 150);

    searchInput.addEventListener('input', handleSearch);

    // Also trigger on native search clear ('x' clicked) or Enter
    searchInput.addEventListener('search', () => {
      currentHistorySearchQuery = searchInput.value;
      applyHistoryFilters();
    });
  }

  // Sort dropdown handler (newest / oldest)
  if (sortSelect) {
    sortSelect.value = currentHistorySort;
    sortSelect.addEventListener('change', (e) => {
      currentHistorySort = e.target.value;
      applyHistoryFilters();
    });
  }

  // Difficulty filter chips handler
  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      currentHistoryDifficultyFilter = chip.getAttribute('data-filter') || 'all';
      applyHistoryFilters();
    });
  });

  // Clear All button handler
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      const history = window.StudyStorage.getHistory();
      if (!history.length) return;

      const confirmed = window.confirm('Are you sure you want to delete all saved study sessions?');
      if (confirmed) {
        window.StudyStorage.clearHistory();
        resetHistoryFilters();
      }
    });
  }
}

/**
 * Filters history items by title and notes as the user types,
 * applies difficulty chip filtering, and sorts by newest/oldest.
 */
function applyHistoryFilters() {
  const allItems = window.StudyStorage.getHistory();
  const query = (currentHistorySearchQuery || '').toLowerCase().trim();
  const filter = (currentHistoryDifficultyFilter || 'all').toLowerCase();

  const filtered = allItems.filter((item) => {
    // 1. Difficulty filter check
    if (filter !== 'all') {
      const itemDiff = (item.difficulty || item.result?.difficulty || 'medium').toLowerCase();
      if (itemDiff !== filter) return false;
    }

    // 2. Search query check against title and notes as user types
    if (query) {
      const titleMatch = item.title && item.title.toLowerCase().includes(query);
      const notesMatch = item.notes && item.notes.toLowerCase().includes(query);
      if (!titleMatch && !notesMatch) return false;
    }

    return true;
  });

  // 3. Sort dropdown (newest or oldest first)
  filtered.sort((a, b) => {
    const timeA = new Date(a.date || 0).getTime();
    const timeB = new Date(b.date || 0).getTime();
    if (currentHistorySort === 'oldest') {
      return timeA - timeB;
    }
    return timeB - timeA; // default newest
  });

  const isFiltered = Boolean(query) || filter !== 'all';
  renderHistoryList(filtered, isFiltered);
}

/**
 * Resets search input, sort dropdown, and difficulty filter chips back to defaults.
 */
function resetHistoryFilters() {
  currentHistorySearchQuery = '';
  currentHistoryDifficultyFilter = 'all';
  currentHistorySort = 'newest';

  const searchInput = document.getElementById('history-search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('history-sort-select');
  if (sortSelect) sortSelect.value = 'newest';

  const filterChips = document.querySelectorAll('.history-chip');
  filterChips.forEach((c) => {
    if (c.getAttribute('data-filter') === 'all') {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });

  applyHistoryFilters();
}

/**
 * Refreshes the history list from localStorage according to active filters.
 */
function refreshHistoryUI() {
  applyHistoryFilters();
}

/**
 * Passes items to the render service with click-to-load and delete handlers.
 * @param {Array<Object>} items - History items to render
 * @param {boolean} [isFiltered=false] - Whether a filter/query is currently applied
 */
function renderHistoryList(items, isFiltered = false) {
  const container = document.getElementById('history-list');

  window.StudyRender.renderHistory(
    items,
    container,
    // OnSelect callback: re-display without calling API
    (item) => handleSelectHistoryItem(item),
    // OnDelete callback: remove item from localStorage
    (id) => handleDeleteHistoryItem(id),
    isFiltered,
    () => resetHistoryFilters()
  );
}

/**
 * Handles selecting a history session:
 * Re-displays the result without calling the API, populates the input textarea,
 * restores difficulty and style, updates currentSummaryText, switches to Summary tab, and scrolls up.
 * @param {Object} item - The history session item
 */
function handleSelectHistoryItem(item) {
  if (!item || !item.result) return;

  // Stop any active speech narration
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const speakBtn = document.getElementById('speak-summary-btn');
    const stopBtn = document.getElementById('stop-speech-btn');
    if (speakBtn) {
      speakBtn.classList.remove('is-speaking');
      const label = speakBtn.querySelector('span');
      if (label) label.textContent = 'Read Aloud';
    }
    if (stopBtn) stopBtn.classList.add('hidden');
  }

  const textarea = document.getElementById('study-textarea');
  const counter = document.getElementById('char-counter');
  const summaryTabBtn = document.getElementById('tab-summary-btn');
  const difficultySelect = document.getElementById('difficulty-select');
  const answerStyleSelect = document.getElementById('answer-style-select');

  // 1. Populate textarea with saved notes
  if (textarea) {
    textarea.value = item.notes || '';
    if (window.updateNotesCount) {
      window.updateNotesCount();
    } else if (counter) {
      counter.textContent = textarea.value.length.toLocaleString();
    }
  }

  // 2. Restore difficulty, answerStyle, and questionCount dropdowns if recorded
  const questionCountSelect = document.getElementById('question-count-select');
  if (item.difficulty && difficultySelect) {
    difficultySelect.value = item.difficulty;
  }
  if (item.answerStyle && answerStyleSelect) {
    answerStyleSelect.value = item.answerStyle;
  }
  if (questionCountSelect) {
    const qCount = item.questionCount || (Array.isArray(item.result?.quiz) ? item.result.quiz.length : 5);
    questionCountSelect.value = String(qCount);
  }

  // 3. Set current active summary text and active study kit for Copy/Download and Export
  currentSummaryText = item.result.summary || '';
  currentStudyKit = item.result;
  currentSessionTitle = item.title || 'Study Kit';

  const activeSessionTitleEl = document.getElementById('active-session-title');
  if (activeSessionTitleEl) {
    activeSessionTitleEl.textContent = currentSessionTitle;
  }

  // 4. Set active session ID and render study kit into DOM without calling API
  currentSessionId = item.id;
  window.StudyRender.renderStudyKit(item.result, currentSessionId, {
    topicTitle: item.title,
    difficulty: item.difficulty,
  });

  // 5. Update panel indicators
  updatePanelIndicators(item.result);

  // 6. Switch to the Study Hub view and Summary tab
  switchView('study-hub');
  activateTab('tab-summary-panel', summaryTabBtn);

  // 7. Smoothly scroll up to the study material workspace
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Handles deleting a single history item and clearing its saved mastery state.
 * @param {string} id - The ID of the session to delete
 */
function handleDeleteHistoryItem(id) {
  window.StudyStorage.deleteHistoryItem(id);
  window.StudyStorage.clearFlashcardMastery(id);
  refreshHistoryUI();
}

/**
 * Initializes Quiz Progress display on page load and tab activation.
 */
function initQuizProgressModule() {
  const container = document.getElementById('quiz-progress-section');
  if (container && window.StudyRender && window.StudyRender.renderQuizProgress) {
    window.StudyRender.renderQuizProgress(container);
  }
}

/**
 * Binds the "Regenerate" button next to results.
 * Re-runs the active study notes with an alternative variation instruction
 * ("give a different variation"), disables itself while loading,
 * and saves the generated result as a new history entry.
 */
function initRegenerateHandler() {
  const regenerateBtn = document.getElementById('regenerate-btn');
  const textarea = document.getElementById('study-textarea');
  const difficultySelect = document.getElementById('difficulty-select');
  const answerStyleSelect = document.getElementById('answer-style-select');
  const questionCountSelect = document.getElementById('question-count-select');
  const generateBtn = document.getElementById('generate-btn');
  const loadingIndicator = document.getElementById('loading-indicator');
  const errorBox = document.getElementById('error-box');

  if (!regenerateBtn) return;

  regenerateBtn.addEventListener('click', async () => {
    // 1. Read API Key for active provider
    const activeProvider = window.StudyStorage.getProvider();
    const apiKey = window.StudyStorage.getApiKey(activeProvider);
    if (!apiKey) {
      const providerLabel = activeProvider === 'groq' ? 'Groq' : 'Google Gemini';
      showError(
        `No API key found for ${providerLabel}. Please enter and save your key in the Settings panel above.`,
        'API Key Required'
      );
      const settingsPanel = document.getElementById('settings-panel');
      if (settingsPanel) settingsPanel.classList.remove('hidden');
      return;
    }

    // 2. Read notes content from textarea
    const content = textarea ? textarea.value.trim() : '';
    if (!content) {
      showError(
        'Study notes are empty. Please enter notes or select a past study kit before regenerating a variation.',
        'Study Material Required'
      );
      if (textarea) textarea.focus();
      return;
    }

    if (content.length > 8000) {
      showError(
        `Your study notes exceed 8,000 characters (${content.length.toLocaleString()} / 8,000). Please shorten your notes before regenerating.`,
        'Character Limit Exceeded'
      );
      return;
    }

    const difficulty = difficultySelect ? difficultySelect.value : 'medium';
    const answerStyle = answerStyleSelect ? answerStyleSelect.value : 'explain-10';
    const questionCount = questionCountSelect ? (parseInt(questionCountSelect.value, 10) || 5) : 5;

    // 3. Enter working state on regenerate and generate buttons
    regenerateBtn.disabled = true;
    regenerateBtn.classList.add('is-loading');
    const origHtml = regenerateBtn.innerHTML;
    regenerateBtn.innerHTML = `
      <svg class="icon-sm spin-icon spinning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
      <span>Regenerating...</span>
    `;
    if (generateBtn) generateBtn.disabled = true;
    if (loadingIndicator) loadingIndicator.classList.remove('hidden');
    if (errorBox) errorBox.classList.add('hidden');

    const isTopicMode = document.getElementById('mode-topic-btn')?.classList.contains('active');
    const mode = isTopicMode ? 'topic' : 'notes';
    const languageSelect = document.getElementById('language-select');
    const language = languageSelect ? languageSelect.value : 'English';

    try {
      // 4. Request alternative variation from API with "give a different variation" prompt
      const rawText = await window.StudyApi.fetchStudyKit({
        apiKey,
        provider: activeProvider,
        content,
        difficulty,
        style: answerStyle,
        questionCount,
        isVariation: true,
        mode,
        language,
      });

      // 5. Parse JSON response and validate
      const studyKit = window.StudyParser.parseStudyKitResponse(rawText, questionCount);
      currentSummaryText = studyKit.summary || '';
      currentStudyKit = studyKit;

      // 6. Save as a new history entry
      const baseTitle = extractSessionTitle(content, studyKit);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const variationTitle = `${baseTitle} (Variation ${timeStr})`;
      currentSessionTitle = variationTitle;

      const activeSessionTitleEl = document.getElementById('active-session-title');
      if (activeSessionTitleEl) {
        activeSessionTitleEl.textContent = variationTitle;
      }

      const savedItem = window.StudyStorage.saveHistoryItem({
        title: variationTitle,
        notes: content,
        difficulty: difficulty,
        answerStyle: answerStyle,
        questionCount: questionCount,
        mode,
        language,
        provider: activeProvider,
        result: studyKit,
        date: new Date().toISOString(),
      });
      currentSessionId = savedItem ? savedItem.id : ('session_' + Date.now());

      // 7. Render into DOM with metadata
      window.StudyRender.renderStudyKit(studyKit, currentSessionId, {
        topicTitle: variationTitle,
        difficulty: difficulty,
      });

      // 8. Update tab status indicators & history list
      updatePanelIndicators(studyKit);
      window.StudyStorage.recordActivity();
      refreshHistoryUI();

    } catch (err) {
      console.error('app.js: Regenerate error:', err);
      showError(err.message || 'Failed to generate variation.');
    } finally {
      // 9. Re-enable buttons and hide loading indicator
      regenerateBtn.disabled = false;
      regenerateBtn.classList.remove('is-loading');
      regenerateBtn.innerHTML = origHtml;
      if (generateBtn) generateBtn.disabled = false;
      if (loadingIndicator) loadingIndicator.classList.add('hidden');
    }
  });
}

/**
 * Voice dictation for study notes via the Web Speech API (webkitSpeechRecognition).
 * Displays a live recording indicator, appends transcribed text, updates character count,
 * and shows clear permission error messages.
 */
function initSpeechRecognition() {
  const micBtn = document.getElementById('mic-dictate-btn');
  const micLabel = document.getElementById('mic-btn-label');
  const textarea = document.getElementById('study-textarea');

  if (!micBtn || !textarea) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    micBtn.title = 'Speech recognition is not supported in this browser (Chrome or Edge recommended).';
    micBtn.setAttribute('aria-disabled', 'true');
    return;
  }

  let recognition = null;
  let isRecording = false;

  try {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      isRecording = true;
      micBtn.classList.add('is-recording');
      if (micLabel) micLabel.textContent = 'Listening...';
    };

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + ' ';
        }
      }
      if (transcript) {
        const prefix = textarea.value.trim().length > 0 ? '\n' : '';
        textarea.value = (textarea.value + prefix + transcript).slice(0, 8000);
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        showError(
          'Microphone permission was denied. Please allow microphone access in your browser site permissions to use voice dictation.',
          'Microphone Permission Denied'
        );
      }
      stopRecording();
    };

    recognition.onend = () => {
      stopRecording();
    };
  } catch (err) {
    console.warn('Unable to initialize SpeechRecognition:', err);
  }

  function stopRecording() {
    isRecording = false;
    micBtn.classList.remove('is-recording');
    if (micLabel) micLabel.textContent = 'Dictate';
    try {
      recognition?.stop();
    } catch {}
  }

  micBtn.addEventListener('click', () => {
    if (!recognition) return;
    if (isRecording) {
      stopRecording();
    } else {
      try {
        recognition.start();
      } catch (e) {
        console.warn('Recognition start error:', e);
      }
    }
  });
}

/**
 * Automatically persists draft study notes in localStorage, debounced at 500ms,
 * and restores draft content on initial page load.
 */
function initDraftNotes() {
  const textarea = document.getElementById('study-textarea');
  if (!textarea) return;

  // Restore saved draft if textarea is currently empty
  const savedDraft = window.StudyStorage.getDraftNotes();
  if (savedDraft && !textarea.value) {
    textarea.value = savedDraft;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // Debounced auto-save (500ms)
  let debounceTimer = null;
  textarea.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      window.StudyStorage.saveDraftNotes(textarea.value);
    }, 500);
  });
}

// Global Pomodoro Timer State
let pomodoroState = {
  totalSeconds: 25 * 60,
  remainingSeconds: 25 * 60,
  isRunning: false,
  timerId: null,
};

/**
 * Plays a pleasant 880Hz chime with an exponential gain decay using the Web Audio API.
 */
function playPomodoroChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch (err) {
    console.warn('AudioContext playback error', err);
  }
}

/**
 * Binds Pomodoro countdown controls, modes (25m Focus / 5m Break), and display updates.
 */
function bindPomodoroControls() {
  const startBtn = document.getElementById('pomo-start-btn');
  const resetBtn = document.getElementById('pomo-reset-btn');
  const digits = document.getElementById('pomo-digits');
  const statusLabel = document.getElementById('pomo-status-label');
  const ringFill = document.getElementById('pomo-ring-fill');
  const startLabel = document.getElementById('pomo-start-label');
  const modeFocus = document.getElementById('pomo-mode-focus');
  const modeBreak = document.getElementById('pomo-mode-break');

  const RING_CIRCUMFERENCE = 596.9; // 2 * PI * 95

  function updateDisplay() {
    const mins = Math.floor(pomodoroState.remainingSeconds / 60);
    const secs = pomodoroState.remainingSeconds % 60;
    if (digits) {
      digits.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    if (ringFill) {
      const progress = 1 - (pomodoroState.remainingSeconds / pomodoroState.totalSeconds);
      const offset = RING_CIRCUMFERENCE * (1 - progress);
      ringFill.style.strokeDashoffset = String(offset);
    }
  }

  function setMode(minutes, isFocus) {
    clearInterval(pomodoroState.timerId);
    pomodoroState.isRunning = false;
    pomodoroState.totalSeconds = minutes * 60;
    pomodoroState.remainingSeconds = minutes * 60;
    if (startLabel) startLabel.textContent = isFocus ? 'Start Focus' : 'Start Break';
    if (statusLabel) statusLabel.textContent = isFocus ? 'Ready to Focus' : 'Ready for Break';
    if (modeFocus && modeBreak) {
      modeFocus.classList.toggle('active', isFocus);
      modeBreak.classList.toggle('active', !isFocus);
    }
    updateDisplay();
  }

  if (modeFocus) {
    modeFocus.addEventListener('click', () => setMode(25, true));
  }
  if (modeBreak) {
    modeBreak.addEventListener('click', () => setMode(5, false));
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (pomodoroState.isRunning) {
        // Pause
        clearInterval(pomodoroState.timerId);
        pomodoroState.isRunning = false;
        if (startLabel) startLabel.textContent = 'Resume';
        if (statusLabel) statusLabel.textContent = 'Paused';
      } else {
        // Start
        pomodoroState.isRunning = true;
        if (startLabel) startLabel.textContent = 'Pause';
        if (statusLabel) statusLabel.textContent = 'In Progress';

        pomodoroState.timerId = setInterval(() => {
          if (pomodoroState.remainingSeconds > 0) {
            pomodoroState.remainingSeconds--;
            updateDisplay();
          } else {
            clearInterval(pomodoroState.timerId);
            pomodoroState.isRunning = false;
            playPomodoroChime();
            if (startLabel) startLabel.textContent = 'Start';
            if (statusLabel) statusLabel.textContent = 'Interval Complete! 🎉';
            if (window.StudyUtils?.showToast) {
              window.StudyUtils.showToast('Pomodoro interval complete!', 'success');
            }
          }
        }, 1000);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      clearInterval(pomodoroState.timerId);
      pomodoroState.isRunning = false;
      pomodoroState.remainingSeconds = pomodoroState.totalSeconds;
      if (startLabel) startLabel.textContent = 'Start';
      if (statusLabel) statusLabel.textContent = 'Reset';
      updateDisplay();
    });
  }

  updateDisplay();
}

/**
 * Initializes the Pomodoro section container and renders its DOM structure.
 */
function initPomodoroModule() {
  const container = document.getElementById('pomodoro-container');
  if (container && window.StudyRender?.renderPomodoro) {
    window.StudyRender.renderPomodoro(container);
    bindPomodoroControls();
  }
}

/**
 * Manages the floating 24/7 Interactive AI Tutor chat widget, quick prompt chips,
 * and follow-up question requests to the active AI provider.
 */
function initInteractiveTutor() {
  const triggerBtn = document.getElementById('tutor-floating-trigger');
  const chatCard = document.getElementById('tutor-chat-card');
  const closeBtn = document.getElementById('tutor-close-btn');
  const askTutorBtn = document.getElementById('summary-ask-tutor-btn');
  const form = document.getElementById('tutor-input-form');
  const input = document.getElementById('tutor-input');
  const sendBtn = document.getElementById('tutor-send-btn');
  const messagesList = document.getElementById('tutor-messages-list');
  const promptChips = document.querySelectorAll('.tutor-chip');

  function openTutor() {
    if (chatCard) {
      chatCard.classList.remove('hidden');
      if (input) input.focus();
    }
  }

  function closeTutor() {
    if (chatCard) chatCard.classList.add('hidden');
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      if (chatCard?.classList.contains('hidden')) {
        openTutor();
      } else {
        closeTutor();
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeTutor);
  if (askTutorBtn) askTutorBtn.addEventListener('click', openTutor);

  // Quick prompt chips
  promptChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt && input) {
        input.value = prompt;
        sendMessage(prompt);
      }
    });
  });

  async function sendMessage(text) {
    const question = (text || input?.value || '').trim();
    if (!question || !messagesList) return;
    if (input) input.value = '';

    // Append User Message Bubble
    const userMsg = document.createElement('div');
    userMsg.className = 'tutor-msg tutor-msg-user';
    userMsg.innerHTML = `<div class="tutor-bubble user-bubble">${window.StudyUtils ? window.StudyUtils.escapeHtml(question) : question}</div>`;
    messagesList.appendChild(userMsg);

    // Append Loading Bubble
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'tutor-msg tutor-msg-ai';
    loadingMsg.innerHTML = `
      <div class="tutor-ai-row">
        <div class="tutor-ai-avatar">✨</div>
        <div class="tutor-bubble ai-bubble tutor-loading-bubble">
          <span class="tutor-typing-dot"></span>
          <span class="tutor-typing-dot"></span>
          <span class="tutor-typing-dot"></span>
        </div>
      </div>
    `;
    messagesList.appendChild(loadingMsg);
    messagesList.scrollTop = messagesList.scrollHeight;
    if (sendBtn) sendBtn.disabled = true;

    const provider = window.StudyStorage.getProvider();
    const apiKey = window.StudyStorage.getApiKey(provider);
    const notesContext = currentSummaryText || (document.getElementById('study-textarea')?.value) || 'Quantum Mechanics principles';

    try {
      const reply = await window.StudyApi.fetchFollowUpAnswer({
        apiKey,
        provider,
        originalNotes: notesContext,
        question,
      });

      // Format markdown bold & newlines in reply
      const formatted = reply
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n•\s/g, '<br>&bull; ')
        .replace(/\n/g, '<br>');

      loadingMsg.innerHTML = `
        <div class="tutor-ai-row">
          <div class="tutor-ai-avatar">✨</div>
          <div class="tutor-bubble ai-bubble">${formatted}</div>
        </div>
      `;
    } catch (err) {
      loadingMsg.innerHTML = `
        <div class="tutor-ai-row">
          <div class="tutor-ai-avatar">✨</div>
          <div class="tutor-bubble ai-bubble tutor-error-bubble">
            I encountered an error retrieving an answer: ${err.message || 'Please verify your network connection or API key.'}
          </div>
        </div>
      `;
    } finally {
      if (sendBtn) sendBtn.disabled = false;
      messagesList.scrollTop = messagesList.scrollHeight;
    }
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sendMessage();
    });
  }
}

/**
 * Global keyboard shortcuts modal management and key event handlers:
 * - Ctrl+Enter / ⌘+Enter: Trigger Generate
 * - ? : Toggle Keyboard Shortcuts modal
 * - Esc : Close open modals and dropdowns
 * - Space : Flip active flashcard
 * - 1 - 4 : Select quiz option
 */
function initKeyboardShortcuts() {
  const modal = document.getElementById('shortcuts-modal');
  const shortcutsBtn = document.getElementById('shortcuts-btn');
  const closeBtn = document.getElementById('shortcuts-modal-close-btn');

  function openModal() {
    if (modal) modal.classList.remove('hidden');
  }

  function closeModal() {
    if (modal) modal.classList.add('hidden');
  }

  if (shortcutsBtn) shortcutsBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName);

    // Ctrl+Enter or Cmd+Enter -> Generate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      const generateBtn = document.getElementById('generate-btn');
      if (generateBtn && !generateBtn.disabled) {
        generateBtn.click();
      }
      return;
    }

    // Escape -> Close modals / panels
    if (e.key === 'Escape') {
      closeModal();
      document.getElementById('settings-panel')?.classList.add('hidden');
      document.getElementById('accent-dropdown')?.classList.add('hidden');
      document.getElementById('tutor-chat-card')?.classList.add('hidden');
      document.getElementById('export-dropdown-menu')?.classList.add('hidden');
      document.getElementById('app-sidebar')?.classList.remove('mobile-open');
      return;
    }

    if (isTyping) return;

    // ? -> Toggle shortcuts modal
    if (e.key === '?') {
      e.preventDefault();
      if (modal?.classList.contains('hidden')) {
        openModal();
      } else {
        closeModal();
      }
      return;
    }

    // Space -> Flip active flashcard
    if (e.code === 'Space') {
      const flashcardsPanel = document.getElementById('tab-flashcards-panel');
      if (flashcardsPanel && !flashcardsPanel.classList.contains('hidden')) {
        const activeCard = flashcardsPanel.querySelector('.flashcard-inner');
        if (activeCard) {
          e.preventDefault();
          activeCard.closest('.flashcard-card')?.click();
        }
      }
      return;
    }

    // 1 - 4 -> Select quiz option
    if (['1', '2', '3', '4'].includes(e.key)) {
      const quizPanel = document.getElementById('tab-quiz-panel');
      if (quizPanel && !quizPanel.classList.contains('hidden')) {
        const optionIndex = parseInt(e.key, 10) - 1;
        const optionBtns = quizPanel.querySelectorAll('.quiz-option-btn:not([disabled])');
        if (optionBtns && optionBtns[optionIndex]) {
          e.preventDefault();
          optionBtns[optionIndex].click();
        }
      }
    }
  });
}

/**
 * Binds all interactive controls for the Study Hub Bento Grid matching the mockup:
 * - Bento Quiz option selection & Next Question button
 * - Bento Leitner Box clicks to open review modal
 * - 3D Flashcard Flip, promote, demote, and pronunciation in review modal
 * - Docked 24/7 AI Tutor Q&A and minimize toggle
 * - Header icons: (+ New Notes, Info modal, Notifications dropdown, Detailed tabs toggle)
 * - Card options "•••" dropdown menus
 */
function initBentoHubHandlers() {
  // 1. Bento Quiz "Next Question" Button
  const nextQuizBtn = document.getElementById('bento-quiz-next-btn');
  if (nextQuizBtn) {
    nextQuizBtn.addEventListener('click', () => {
      if (window.StudyRender?.advanceBentoQuiz) {
        window.StudyRender.advanceBentoQuiz();
      }
    });
  }

  // 2. Leitner Box Cards Review Modal
  const box1Btn = document.getElementById('bento-leitner-box-1');
  const box2Btn = document.getElementById('bento-leitner-box-2');
  const box3Btn = document.getElementById('bento-leitner-box-3');
  const modalBackdrop = document.getElementById('leitner-review-modal');
  const modalCloseBtn = document.getElementById('leitner-modal-close-btn');

  let activeModalCards = [];
  let activeModalCardIndex = 0;
  let activeModalBoxNum = 1;

  function openLeitnerBoxModal(boxNum) {
    activeModalBoxNum = boxNum;
    activeModalCardIndex = 0;

    const boxBadge = document.getElementById('leitner-modal-box-badge');
    if (boxBadge) {
      boxBadge.textContent = `Box ${boxNum}: ${boxNum === 1 ? 'To Review' : boxNum === 2 ? 'Learning' : 'Mastered'}`;
      boxBadge.style.color = boxNum === 1 ? '#ef4444' : boxNum === 2 ? '#eab308' : '#22c55e';
      boxBadge.style.borderColor = boxNum === 1 ? '#ef4444' : boxNum === 2 ? '#eab308' : '#22c55e';
    }

    // Pick cards for this box
    const mockupCards = window.StudyRender?.MOCKUP_STUDY_HUB_DATA?.sampleFlashcards?.[boxNum] || [];
    activeModalCards = mockupCards.length > 0 ? mockupCards : [
      { front: "What is the primary function of mitochondria?", back: "Aerobic cellular respiration & ATP energy synthesis." },
      { front: "General formula for alkanes?", back: "CnH2n+2 (e.g. Methane CH4, Ethane C2H6)." }
    ];

    displayActiveModalCard();
    if (modalBackdrop) modalBackdrop.classList.remove('hidden');
  }

  function displayActiveModalCard() {
    if (!activeModalCards || activeModalCards.length === 0) return;
    const card = activeModalCards[activeModalCardIndex % activeModalCards.length];
    const cardEl = document.getElementById('leitner-interactive-card');
    const frontText = document.getElementById('leitner-card-front-text');
    const backText = document.getElementById('leitner-card-back-text');
    const progressText = document.getElementById('leitner-modal-progress-text');
    const progressBar = document.getElementById('leitner-modal-progress-bar');

    if (cardEl) cardEl.classList.remove('is-flipped');
    if (frontText) frontText.textContent = card.front;
    if (backText) backText.textContent = card.back;
    if (progressText) progressText.textContent = `Card ${activeModalCardIndex + 1} of ${activeModalCards.length}`;
    if (progressBar) progressBar.style.width = `${Math.round(((activeModalCardIndex + 1) / activeModalCards.length) * 100)}%`;
  }

  if (box1Btn) box1Btn.addEventListener('click', () => openLeitnerBoxModal(1));
  if (box2Btn) box2Btn.addEventListener('click', () => openLeitnerBoxModal(2));
  if (box3Btn) box3Btn.addEventListener('click', () => openLeitnerBoxModal(3));

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', () => modalBackdrop.classList.add('hidden'));
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.add('hidden');
    });
  }

  // 3D Flip Card Toggle
  const interactiveCard = document.getElementById('leitner-interactive-card');
  if (interactiveCard) {
    interactiveCard.addEventListener('click', () => {
      interactiveCard.classList.toggle('is-flipped');
    });
  }

  // Modal Promote Button
  const btnPromote = document.getElementById('leitner-btn-promote');
  if (btnPromote) {
    btnPromote.addEventListener('click', () => {
      const currentCard = activeModalCards[activeModalCardIndex];
      if (window.StudySRS?.promoteCard) {
        window.StudySRS.promoteCard(currentCard);
      }
      activeModalCardIndex = (activeModalCardIndex + 1) % activeModalCards.length;
      displayActiveModalCard();
      updateBentoBoxCounts();
    });
  }

  // Modal Demote Button
  const btnDemote = document.getElementById('leitner-btn-demote');
  if (btnDemote) {
    btnDemote.addEventListener('click', () => {
      const currentCard = activeModalCards[activeModalCardIndex];
      if (window.StudySRS?.demoteCard) {
        window.StudySRS.demoteCard(currentCard);
      }
      activeModalCardIndex = (activeModalCardIndex + 1) % activeModalCards.length;
      displayActiveModalCard();
      updateBentoBoxCounts();
    });
  }

  // Modal Speak Pronounce Button
  const btnSpeak = document.getElementById('leitner-btn-speak');
  if (btnSpeak) {
    btnSpeak.addEventListener('click', () => {
      const currentCard = activeModalCards[activeModalCardIndex];
      if (currentCard && 'speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(currentCard.front);
        utter.rate = 0.95;
        window.speechSynthesis.speak(utter);
      }
    });
  }

  function updateBentoBoxCounts() {
    const srsCounts = window.StudySRS?.getBoxCounts ? window.StudySRS.getBoxCounts() : null;
    const box1El = document.getElementById('bento-box1-count');
    const box2El = document.getElementById('bento-box2-count');
    const box3El = document.getElementById('bento-box3-count');
    if (srsCounts && srsCounts.total > 0) {
      if (box1El) box1El.textContent = srsCounts.box1;
      if (box2El) box2El.textContent = srsCounts.box2;
      if (box3El) box3El.textContent = srsCounts.box3;
    }
  }

  // 3. Docked 24/7 AI Tutor Q&A
  const dockedForm = document.getElementById('docked-tutor-input-form');
  const dockedInput = document.getElementById('docked-tutor-msg-input');
  const dockedBubble = document.getElementById('docked-tutor-chat-bubble');
  const dockedClose = document.getElementById('docked-tutor-close-btn');
  const dockedWidget = document.getElementById('docked-ai-tutor-widget');

  if (dockedClose && dockedWidget) {
    dockedClose.addEventListener('click', () => {
      dockedWidget.classList.toggle('minimized');
      dockedClose.textContent = dockedWidget.classList.contains('minimized') ? '▲' : '✕';
    });
  }

  if (dockedForm && dockedInput && dockedBubble) {
    dockedForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = dockedInput.value.trim();
      if (!query) return;

      dockedInput.value = '';
      dockedBubble.innerHTML = `<em>Thinking...</em>`;

      // Try AI Tutor response
      try {
        const provider = window.StudyStorage.getProvider();
        const apiKey = window.StudyStorage.getApiKey(provider);
        const notesContext = currentSummaryText || (document.getElementById('study-textarea')?.value) || 'Organic Chemistry: Alkanes and Cell Biology (Mitochondria).';

        let answer = '';
        if (window.StudyApi && typeof window.StudyApi.fetchFollowUpAnswer === 'function') {
          answer = await window.StudyApi.fetchFollowUpAnswer({
            apiKey,
            provider,
            notes: notesContext,
            question: query,
          });
        }

        const formatted = (answer || 'Ready to help with your study notes! Ask me anything.')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n\n/g, '<br><br>')
          .replace(/\n•\s/g, '<br>&bull; ')
          .replace(/\n/g, '<br>');

        dockedBubble.innerHTML = `<strong>You:</strong> ${escapeHtml(query)}<br><br>${formatted}`;
      } catch (err) {
        dockedBubble.innerHTML = `<strong>Tutor:</strong> ${escapeHtml(err.message || 'Mitochondria produce ATP via respiration, and alkanes have general formula CnH2n+2. Ask me anything more!')}`;
      }
    });
  }

  // 4. Header Toggle Buttons: (+ New Notes, Info, Bell, Detailed tabs)
  const toggleInputBtn = document.getElementById('toggle-input-drawer-btn');
  const editNotesBtn = document.getElementById('bento-edit-notes-btn');
  const inputCardBody = document.getElementById('input-card-body');

  function toggleNotesInput() {
    if (inputCardBody) {
      const isCollapsed = inputCardBody.classList.toggle('collapsed');
      const toggleLabel = document.getElementById('input-toggle-label');
      if (toggleLabel) toggleLabel.textContent = isCollapsed ? 'Show Input' : 'Hide Input';
      if (!isCollapsed) {
        inputCardBody.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  if (toggleInputBtn) toggleInputBtn.addEventListener('click', toggleNotesInput);
  if (editNotesBtn) editNotesBtn.addEventListener('click', toggleNotesInput);

  const infoBtn = document.getElementById('hub-info-btn');
  const infoModal = document.getElementById('hub-info-modal');
  const infoClose = document.getElementById('info-modal-close-btn');

  if (infoBtn && infoModal) {
    infoBtn.addEventListener('click', () => infoModal.classList.toggle('hidden'));
    if (infoClose) infoClose.addEventListener('click', () => infoModal.classList.add('hidden'));
  }

  const bellBtn = document.getElementById('hub-bell-btn');
  const notifDropdown = document.getElementById('hub-notifications-dropdown');
  const clearNotifsBtn = document.getElementById('clear-notifs-btn');

  if (bellBtn && notifDropdown) {
    bellBtn.addEventListener('click', () => notifDropdown.classList.toggle('hidden'));
    if (clearNotifsBtn) {
      clearNotifsBtn.addEventListener('click', () => {
        const dot = document.querySelector('.hub-notification-red-dot');
        if (dot) dot.classList.add('hidden');
        notifDropdown.classList.add('hidden');
      });
    }
  }

  const btnToggleDetailed = document.getElementById('btn-toggle-detailed');
  const outputTabsSection = document.getElementById('output-tabs-section');

  if (btnToggleDetailed && outputTabsSection) {
    btnToggleDetailed.addEventListener('click', () => {
      const isHidden = outputTabsSection.classList.toggle('hidden');
      btnToggleDetailed.classList.toggle('is-expanded', !isHidden);
    });
  }

  const deleteNotesBtn = document.getElementById('bento-delete-notes-btn');
  if (deleteNotesBtn) {
    deleteNotesBtn.addEventListener('click', () => {
      if (confirm('Reset to default Organic Chemistry & Cell Biology Study Hub?')) {
        initInitialStudyKit();
      }
    });
  }

  // Summary options dropdown "•••"
  const summaryMoreBtn = document.getElementById('bento-summary-more-btn');
  const summaryDropdown = document.getElementById('bento-summary-dropdown');
  if (summaryMoreBtn && summaryDropdown) {
    summaryMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      summaryDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => summaryDropdown.classList.add('hidden'));

    const readSummaryBtn = document.getElementById('bento-read-summary-btn');
    if (readSummaryBtn) {
      readSummaryBtn.addEventListener('click', () => {
        const bullets = Array.from(document.querySelectorAll('#bento-summary-bullets li')).map(li => li.textContent).join('. ');
        if ('speechSynthesis' in window && bullets) {
          const u = new SpeechSynthesisUtterance(bullets);
          window.speechSynthesis.speak(u);
        }
      });
    }

    const copyNotesBtn = document.getElementById('bento-copy-notes-btn');
    if (copyNotesBtn) {
      copyNotesBtn.addEventListener('click', () => {
        const bullets = Array.from(document.querySelectorAll('#bento-summary-bullets li')).map(li => li.textContent).join('\n');
        navigator.clipboard.writeText(bullets).then(() => alert('Summary copied to clipboard!'));
      });
    }

    const downloadNotesBtn = document.getElementById('bento-download-notes-btn');
    if (downloadNotesBtn) {
      downloadNotesBtn.addEventListener('click', () => {
        const bullets = Array.from(document.querySelectorAll('#bento-summary-bullets li')).map(li => li.textContent).join('\n');
        const blob = new Blob([bullets], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'Organic_Chemistry_Summary.txt';
        a.click();
      });
    }
  }

  // Flashcards options dropdown "•••"
  const fcMoreBtn = document.getElementById('bento-flashcards-more-btn');
  const fcDropdown = document.getElementById('bento-flashcards-dropdown');
  if (fcMoreBtn && fcDropdown) {
    fcMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fcDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => fcDropdown.classList.add('hidden'));

    const srsSessionBtn = document.getElementById('bento-open-srs-session-btn');
    if (srsSessionBtn) {
      srsSessionBtn.addEventListener('click', () => openLeitnerBoxModal(1));
    }

    const exportCsvBtn = document.getElementById('bento-export-csv-btn');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        const csvContent = "Front,Back,Box\n" +
          "What is the general formula for alkanes?,CnH2n+2,1\n" +
          "What is the primary function of mitochondria?,Cellular ATP synthesis,1\n";
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'flashcards.csv';
        a.click();
      });
    }
  }

  // Quiz options dropdown "•••"
  const quizMoreBtn = document.getElementById('bento-quiz-more-btn');
  const quizDropdown = document.getElementById('bento-quiz-dropdown');
  if (quizMoreBtn && quizDropdown) {
    quizMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      quizDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => quizDropdown.classList.add('hidden'));

    const restartQuizBtn = document.getElementById('bento-restart-quiz-btn');
    if (restartQuizBtn) {
      restartQuizBtn.addEventListener('click', () => {
        if (window.StudyRender?.displayBentoQuizQuestion) {
          window.StudyRender.displayBentoQuizQuestion(0);
        }
      });
    }
  }

  // Help button in sidebar footer opens shortcuts
  const helpNavBtn = document.getElementById('nav-btn-help');
  const shortcutsModal = document.getElementById('shortcuts-modal');
  if (helpNavBtn && shortcutsModal) {
    helpNavBtn.addEventListener('click', () => shortcutsModal.classList.remove('hidden'));
  }
}

/**
 * Loads the default Organic Chemistry: Alkanes study kit on initial launch to match the reference UI,
 * updates the active session banner, and refreshes the streak indicator.
 */
function initInitialStudyKit() {
  // Record activity today for streak tracking
  window.StudyStorage.recordActivity();

  // Update sidebar streak indicator
  const streak = window.StudyStorage.getStreakData();
  const streakCountEl = document.getElementById('sidebar-streak-count');
  if (streakCountEl) {
    const days = streak.currentStreak || 1;
    streakCountEl.textContent = `${days} Day Streak`;
  }

  // Update active AI Provider label
  const provider = window.StudyStorage.getProvider();
  const providerLabel = document.getElementById('sidebar-provider-label');
  if (providerLabel) {
    providerLabel.textContent = provider === 'groq' ? 'Groq LLaMA 3.3 70B' : 'Gemini 1.5 Flash';
  }

  // Pre-load Organic Chemistry: Alkanes study kit matching reference mockup
  const initialKit = window.StudyRender.MOCKUP_STUDY_HUB_DATA || window.StudyRender.FAKE_AI_RESPONSE || DEFAULT_QUANTUM_RESPONSE;
  currentStudyKit = initialKit;
  currentSessionTitle = initialKit.title || 'Organic Chemistry: Alkanes';
  currentSummaryText = initialKit.summary || '';
  currentSessionId = 'organic_chemistry_alkanes_default';

  const activeSessionTitleEl = document.getElementById('active-session-title');
  if (activeSessionTitleEl) {
    activeSessionTitleEl.textContent = currentSessionTitle;
  }

  // Render into workspace
  window.StudyRender.renderStudyKit(initialKit, currentSessionId, {
    topicTitle: currentSessionTitle,
    difficulty: 'medium',
  });

  updatePanelIndicators(initialKit);
}

/**
 * Registers the Service Worker for Progressive Web App (PWA) offline capability.
 */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch((err) => {
        console.warn('sw.js registration:', err);
      });
    });
  }
}

// Global namespace exposure
window.StudyApp = {
  DEFAULT_QUANTUM_RESPONSE,
  initTheme,
  initAccentColors,
  initSettings,
  initViewNavigation,
  initSidebarMobile,
  initTabSwitching,
  initInputToggle,
  initGenerateHandler,
  initRegenerateHandler,
  initSummaryActions,
  initHistoryModule,
  initQuizProgressModule,
  initSpeechRecognition,
  initDraftNotes,
  initPomodoroModule,
  initInteractiveTutor,
  initKeyboardShortcuts,
  initInitialStudyKit,
  applyHistoryFilters,
  resetHistoryFilters,
  refreshHistoryUI,
  handleSelectHistoryItem,
  handleDeleteHistoryItem,
  showError,
  switchView,
};

