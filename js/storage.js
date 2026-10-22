/**
 * ==========================================================================
 * AI Study Assistant - Local Storage Manager
 * Handles browser localStorage persistence for API keys, user settings,
 * themes, and study history sessions.
 *
 * NOTE: API keys are strictly read from/written to browser localStorage.
 * No API key is ever hard-coded.
 * ==========================================================================
 */

const STORAGE_KEYS = {
  API_KEY: 'ai_study_assistant_api_key',
  SETTINGS: 'ai_study_assistant_settings',
  HISTORY: 'ai_study_assistant_history',
  THEME: 'ai_study_assistant_theme',
};

/**
 * Retrieves the stored Gemini API key from localStorage.
 * @returns {string|null} The stored API key or null if not set
 */
function getApiKey() {
  try {
    const key = localStorage.getItem(STORAGE_KEYS.API_KEY);
    return key && key.trim() ? key.trim() : null;
  } catch (err) {
    console.error('storage.js: Unable to read API key from localStorage', err);
    return null;
  }
}

/**
 * Saves the user's Gemini API key to localStorage.
 * @param {string} key - The API key provided by the user
 */
function saveApiKey(key) {
  try {
    if (typeof key === 'string') {
      localStorage.setItem(STORAGE_KEYS.API_KEY, key.trim());
    }
  } catch (err) {
    console.error('storage.js: Unable to save API key to localStorage', err);
  }
}

/**
 * Retrieves general assistant settings (answer style, difficulty, etc.).
 * @returns {Object}
 */
function getSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : { answerStyle: 'explain-10', difficulty: 'medium' };
  } catch (err) {
    console.error('storage.js: Unable to read settings from localStorage', err);
    return { answerStyle: 'explain-10', difficulty: 'medium' };
  }
}

/**
 * Saves assistant settings to localStorage.
 * @param {Object} settings
 */
function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('storage.js: Unable to save settings to localStorage', err);
  }
}

/**
 * Retrieves saved UI theme ('light' or 'dark').
 * @returns {string}
 */
function getTheme() {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  } catch (err) {
    return 'light';
  }
}

/**
 * Saves UI theme to localStorage.
 * @param {string} theme - 'light' or 'dark'
 */
function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (err) {
    console.error('storage.js: Unable to save theme', err);
  }
}

/**
 * Retrieves all saved study history sessions.
 * @returns {Array<Object>} List of history items: [{ id, title, notes, result, date }]
 */
function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('storage.js: Failed to parse history from localStorage', err);
    return [];
  }
}

/**
 * Saves a successful study result to history in localStorage.
 * Required schema: { title, notes, result, date }
 *
 * @param {Object} item
 * @param {string} item.title - Descriptive topic or heading
 * @param {string} item.notes - Original raw input notes
 * @param {Object} item.result - Generated study kit { summary, quiz, flashcards }
 * @param {string} item.date - Formatted date string or ISO timestamp
 * @returns {Object} The saved history item with unique id
 */
function saveHistoryItem(item) {
  try {
    const history = getHistory();
    const newItem = {
      id: 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: item.title || 'Untitled Study Kit',
      notes: item.notes || '',
      difficulty: item.difficulty || 'medium',
      answerStyle: item.answerStyle || '',
      result: item.result,
      date: item.date || new Date().toISOString(),
    };

    // Prepend to show most recent first
    history.unshift(newItem);

    // Keep up to 50 sessions
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 50)));
    return newItem;
  } catch (err) {
    console.error('storage.js: Failed to save history item', err);
    return null;
  }
}

/**
 * Deletes a single history item by its unique ID.
 * @param {string} id - The ID of the item to delete
 * @returns {boolean} True if deleted successfully
 */
function deleteHistoryItem(id) {
  try {
    const history = getHistory();
    const filtered = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('storage.js: Failed to delete history item', err);
    return false;
  }
}

/**
 * Clears all saved study history sessions.
 * @returns {boolean} True if cleared successfully
 */
function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    return true;
  } catch (err) {
    console.error('storage.js: Failed to clear history', err);
    return false;
  }
}

// Global namespace exposure
window.StudyStorage = {
  STORAGE_KEYS,
  getApiKey,
  saveApiKey,
  getSettings,
  saveSettings,
  getTheme,
  saveTheme,
  getHistory,
  saveHistoryItem,
  deleteHistoryItem,
  clearHistory,
};
