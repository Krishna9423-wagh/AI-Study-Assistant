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
  PROVIDER: 'ai_study_assistant_provider',
  API_KEY_GEMINI: 'ai_study_assistant_api_key_gemini',
  API_KEY_GROQ: 'ai_study_assistant_api_key_groq',
  SETTINGS: 'ai_study_assistant_settings',
  HISTORY: 'ai_study_assistant_history',
  THEME: 'ai_study_assistant_theme',
  ACCENT_COLOR: 'ai_study_assistant_accent_color',
  DRAFT_NOTES: 'ai_study_assistant_draft_notes',
  STREAK_DATA: 'ai_study_assistant_streak_data',
  FLASHCARD_MASTERY_PREFIX: 'ai_study_assistant_mastery_',
  QUIZ_SCORES: 'ai_study_assistant_quiz_scores',
};

/**
 * Retrieves the currently active AI provider ('gemini' or 'groq').
 * Defaults to 'gemini'.
 * @returns {string} 'gemini' | 'groq'
 */
function getProvider() {
  try {
    return localStorage.getItem(STORAGE_KEYS.PROVIDER) || 'gemini';
  } catch (err) {
    return 'gemini';
  }
}

/**
 * Saves the selected AI provider to localStorage.
 * @param {string} provider - 'gemini' or 'groq'
 */
function saveProvider(provider) {
  try {
    const p = provider === 'groq' ? 'groq' : 'gemini';
    localStorage.setItem(STORAGE_KEYS.PROVIDER, p);
  } catch (err) {
    console.error('storage.js: Failed to save provider', err);
  }
}

/**
 * Retrieves the stored API key for a given provider.
 * Falls back to legacy key for Gemini if provider-specific key is not set.
 * @param {string} [provider] - 'gemini' or 'groq' (defaults to active provider)
 * @returns {string|null} The stored API key or null
 */
function getApiKey(provider) {
  const p = provider || getProvider();
  try {
    if (p === 'groq') {
      const groqKey = localStorage.getItem(STORAGE_KEYS.API_KEY_GROQ);
      return groqKey && groqKey.trim() ? groqKey.trim() : null;
    }
    // Gemini
    const geminiKey = localStorage.getItem(STORAGE_KEYS.API_KEY_GEMINI);
    if (geminiKey && geminiKey.trim()) return geminiKey.trim();
    // Legacy fallback
    const legacy = localStorage.getItem(STORAGE_KEYS.API_KEY);
    return legacy && legacy.trim() ? legacy.trim() : null;
  } catch (err) {
    console.error('storage.js: Unable to read API key from localStorage', err);
    return null;
  }
}

/**
 * Saves an API key for a specified provider.
 * @param {string} key - The API key provided by the user
 * @param {string} [provider] - 'gemini' or 'groq' (defaults to active provider)
 */
function saveApiKey(key, provider) {
  const p = provider || getProvider();
  try {
    const val = typeof key === 'string' ? key.trim() : '';
    if (p === 'groq') {
      localStorage.setItem(STORAGE_KEYS.API_KEY_GROQ, val);
    } else {
      localStorage.setItem(STORAGE_KEYS.API_KEY_GEMINI, val);
      // Also update legacy key for backward compatibility
      localStorage.setItem(STORAGE_KEYS.API_KEY, val);
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
    const defaults = {
      answerStyle: 'explain-10',
      difficulty: 'medium',
      questionCount: 5,
      mode: 'notes',
      language: 'English',
    };
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return { ...defaults, ...parsed };
  } catch (err) {
    console.error('storage.js: Unable to read settings from localStorage', err);
    return {
      answerStyle: 'explain-10',
      difficulty: 'medium',
      questionCount: 5,
      mode: 'notes',
      language: 'English',
    };
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

/**
 * Retrieves saved flashcard mastery state for a specific history item / session ID.
 * @param {string} sessionId
 * @returns {Object} Mapping of { [cardIndex]: 'known' | 'not-known' }
 */
function getFlashcardMastery(sessionId) {
  const sid = sessionId || 'current_session';
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FLASHCARD_MASTERY_PREFIX + sid);
    if (raw) return JSON.parse(raw);

    // Fallback: check if stored inside the history item itself
    const history = getHistory();
    const item = history.find((h) => h.id === sid);
    return item && item.mastery ? item.mastery : {};
  } catch (err) {
    console.error('storage.js: Failed to read flashcard mastery', err);
    return {};
  }
}

/**
 * Saves flashcard mastery state for a specific history item / session ID to localStorage.
 * @param {string} sessionId
 * @param {Object} masteryMap - Object with card indices mapped to 'known' | 'not-known'
 */
function saveFlashcardMastery(sessionId, masteryMap) {
  const sid = sessionId || 'current_session';
  try {
    localStorage.setItem(STORAGE_KEYS.FLASHCARD_MASTERY_PREFIX + sid, JSON.stringify(masteryMap));

    // Also update history item in STORAGE_KEYS.HISTORY if it exists
    const history = getHistory();
    const item = history.find((h) => h.id === sid);
    if (item) {
      item.mastery = masteryMap;
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    }
  } catch (err) {
    console.error('storage.js: Failed to save flashcard mastery', err);
  }
}

/**
 * Clears saved flashcard mastery state for a session ID.
 * @param {string} sessionId
 */
function clearFlashcardMastery(sessionId) {
  const sid = sessionId || 'current_session';
  try {
    localStorage.removeItem(STORAGE_KEYS.FLASHCARD_MASTERY_PREFIX + sid);
    const history = getHistory();
    const item = history.find((h) => h.id === sid);
    if (item && item.mastery) {
      delete item.mastery;
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    }
  } catch (err) {
    console.error('storage.js: Failed to clear flashcard mastery', err);
  }
}

/**
 * Retrieves saved quiz score history from localStorage.
 * @returns {Array<Object>} List of score records [{ id, date, topicTitle, score, total, difficulty }]
 */
function getQuizScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('storage.js: Failed to retrieve quiz scores', err);
    return [];
  }
}

/**
 * Saves a completed quiz score record { date, topicTitle, score, total, difficulty } to localStorage.
 * @param {Object} entry
 * @param {string} [entry.date] - ISO timestamp or formatted date
 * @param {string} [entry.topicTitle] - Title of the topic / session
 * @param {number} entry.score - Points scored
 * @param {number} entry.total - Total points
 * @param {string} [entry.difficulty] - 'easy' | 'medium' | 'hard'
 * @returns {Object} The saved score entry
 */
function saveQuizScore(entry) {
  try {
    const scores = getQuizScores();
    const newEntry = {
      id: 'score_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      date: entry.date || new Date().toISOString(),
      topicTitle: entry.topicTitle || 'Study Session Quiz',
      score: typeof entry.score === 'number' ? entry.score : 0,
      total: typeof entry.total === 'number' ? entry.total : 5,
      difficulty: entry.difficulty || 'medium',
    };
    scores.push(newEntry);
    localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(scores));
    return newEntry;
  } catch (err) {
    console.error('storage.js: Failed to save quiz score', err);
    return null;
  }
}

/**
 * Clears all saved quiz score records from localStorage.
 */
function clearQuizScores() {
  try {
    localStorage.removeItem(STORAGE_KEYS.QUIZ_SCORES);
  } catch (err) {
    console.error('storage.js: Failed to clear quiz scores', err);
  }
}

/**
 * Retrieves the user-selected accent color preset from localStorage.
 * Defaults to 'blue' (Gemini Blue).
 * @returns {string} Preset name ('blue', 'indigo', 'emerald', 'amber', 'rose')
 */
function getAccentColor() {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACCENT_COLOR) || 'blue';
  } catch (err) {
    return 'blue';
  }
}

/**
 * Saves the selected accent color preset to localStorage.
 * @param {string} colorName - 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose'
 */
function saveAccentColor(colorName) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACCENT_COLOR, colorName);
  } catch (err) {
    console.error('storage.js: Failed to save accent color', err);
  }
}

/**
 * Retrieves auto-saved draft study notes from localStorage.
 * @returns {string}
 */
function getDraftNotes() {
  try {
    return localStorage.getItem(STORAGE_KEYS.DRAFT_NOTES) || '';
  } catch (err) {
    return '';
  }
}

/**
 * Auto-saves user draft study notes to localStorage.
 * @param {string} text
 */
function saveDraftNotes(text) {
  try {
    if (typeof text === 'string') {
      localStorage.setItem(STORAGE_KEYS.DRAFT_NOTES, text);
    }
  } catch (err) {
    console.error('storage.js: Failed to save draft notes', err);
  }
}

/**
 * Clears auto-saved draft notes from localStorage.
 */
function clearDraftNotes() {
  try {
    localStorage.removeItem(STORAGE_KEYS.DRAFT_NOTES);
  } catch (err) {
    console.error('storage.js: Failed to clear draft notes', err);
  }
}

/**
 * Retrieves streak and activity data from localStorage.
 * @returns {Object} { currentStreak: number, bestStreak: number, lastActiveDate: string, activeDates: string[] }
 */
function getStreakData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK_DATA);
    const defaults = {
      currentStreak: 1,
      bestStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      activeDates: [new Date().toISOString().split('T')[0]],
    };
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return { ...defaults, ...parsed };
  } catch (err) {
    return {
      currentStreak: 1,
      bestStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      activeDates: [],
    };
  }
}

/**
 * Records a learning activity (generating material, completing quiz, reviewing flashcards).
 * Updates streak calculations based on consecutive days.
 * @returns {Object} Updated streak object
 */
function recordActivity() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const data = getStreakData();

    if (!data.activeDates) data.activeDates = [];

    if (!data.activeDates.includes(today)) {
      data.activeDates.push(today);

      if (data.lastActiveDate) {
        const last = new Date(data.lastActiveDate);
        const curr = new Date(today);
        const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          data.currentStreak = (data.currentStreak || 0) + 1;
        } else if (diffDays > 1) {
          data.currentStreak = 1;
        }
      } else {
        data.currentStreak = 1;
      }

      data.lastActiveDate = today;
      data.bestStreak = Math.max(data.bestStreak || 1, data.currentStreak || 1);
      localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(data));
    }

    return data;
  } catch (err) {
    console.error('storage.js: Failed to record activity', err);
    return getStreakData();
  }
}

/**
 * Aggregates live dashboard metrics from storage.
 * @returns {Object} Metrics for dashboard cards
 */
function getDashboardStats() {
  const history = getHistory();
  const quizScores = getQuizScores();
  const streak = getStreakData();

  let totalScore = 0;
  let totalPossible = 0;
  quizScores.forEach((s) => {
    totalScore += s.score || 0;
    totalPossible += s.total || 5;
  });

  const avgPercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  // Count cards in Leitner Box 3
  let cardsMastered = 0;
  try {
    if (window.StudySRS && typeof window.StudySRS.getBoxCounts === 'function') {
      const counts = window.StudySRS.getBoxCounts();
      cardsMastered = counts.box3 || 0;
    }
  } catch {
    // Fallback
  }

  return {
    totalGenerations: history.length,
    quizzesCompleted: quizScores.length,
    averageScorePercent: avgPercentage,
    cardsMastered,
    currentStreak: streak.currentStreak || 1,
    bestStreak: streak.bestStreak || 1,
    recentScores: quizScores.slice(-10),
  };
}

// Global namespace exposure
window.StudyStorage = {
  STORAGE_KEYS,
  getProvider,
  saveProvider,
  getApiKey,
  saveApiKey,
  getSettings,
  saveSettings,
  getTheme,
  saveTheme,
  getAccentColor,
  saveAccentColor,
  getDraftNotes,
  saveDraftNotes,
  clearDraftNotes,
  getStreakData,
  recordActivity,
  getDashboardStats,
  getHistory,
  saveHistoryItem,
  deleteHistoryItem,
  clearHistory,
  getFlashcardMastery,
  saveFlashcardMastery,
  clearFlashcardMastery,
  getQuizScores,
  saveQuizScore,
  clearQuizScores,
};

