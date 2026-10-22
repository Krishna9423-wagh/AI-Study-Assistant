/**
 * ==========================================================================
 * AI Study Assistant - Leitner Spaced Repetition System (SRS)
 *
 * Implements a 3-box Leitner learning system for flashcard retention:
 * - Box 1: New / challenging cards (reviewed most frequently)
 * - Box 2: Familiar cards (reviewed moderately)
 * - Box 3: Mastered cards (reviewed least frequently)
 *
 * Answering "Not known" drops the card back to Box 1.
 * Answering "Known" promotes the card up one box (Box 1 -> 2, Box 2 -> 3).
 * ==========================================================================
 */

const SRS_STORAGE_KEY = 'ai_study_assistant_srs_boxes';

/**
 * Generates a stable deterministic hash ID for a flashcard based on its front & back text.
 * @param {Object} card - Flashcard with front and back strings
 * @returns {string} Unique card ID
 */
function getCardIdentifier(card) {
  if (!card) return 'card_empty';
  if (typeof card === 'string') return card;
  const raw = `${card.front || ''}::${card.back || ''}`.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return 'card_' + Math.abs(hash);
}

/**
 * Retrieves all stored SRS card records from localStorage.
 * @returns {Object} Map of cardId -> { cardId, front, back, box, lastReviewed, streak }
 */
function getSrsStore() {
  try {
    const raw = localStorage.getItem(SRS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('srs.js: Failed to load SRS store from localStorage', err);
    return {};
  }
}

/**
 * Saves SRS card records map to localStorage.
 * @param {Object} store - Map of cardId -> card record
 */
function saveSrsStore(store) {
  try {
    localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(store || {}));
  } catch (err) {
    console.error('srs.js: Failed to save SRS store to localStorage', err);
  }
}

/**
 * Gets the current box number (1, 2, or 3) for a card. Defaults to Box 1 for new cards.
 * @param {Object|string} card - Flashcard object or card ID
 * @returns {number} Box 1, 2, or 3
 */
function getCardBox(card) {
  const store = getSrsStore();
  const cardId = getCardIdentifier(card);
  return store[cardId]?.box || 1;
}

/**
 * Promotes a card up one box when user marks it as "Known".
 * Box 1 -> Box 2, Box 2 -> Box 3, Box 3 -> stays in Box 3.
 *
 * @param {Object|string} card - Flashcard { front, back } or card ID
 * @returns {number} The new box number
 */
function promoteCard(card) {
  const store = getSrsStore();
  const cardId = getCardIdentifier(card);
  const currentBox = store[cardId]?.box || 1;
  const newBox = Math.min(currentBox + 1, 3);

  store[cardId] = {
    cardId,
    front: typeof card === 'object' && card !== null ? card.front : cardId,
    back: typeof card === 'object' && card !== null ? card.back : '',
    box: newBox,
    lastReviewed: Date.now(),
    knownCount: (store[cardId]?.knownCount || 0) + 1,
  };

  saveSrsStore(store);
  return newBox;
}

/**
 * Demotes a card to Box 1 when user marks it as "Not known".
 *
 * @param {Object|string} card - Flashcard { front, back } or card ID
 * @returns {number} Always returns 1
 */
function demoteCard(card) {
  const store = getSrsStore();
  const cardId = getCardIdentifier(card);

  store[cardId] = {
    cardId,
    front: typeof card === 'object' && card !== null ? card.front : cardId,
    back: typeof card === 'object' && card !== null ? card.back : '',
    box: 1,
    lastReviewed: Date.now(),
    notKnownCount: (store[cardId]?.notKnownCount || 0) + 1,
  };

  saveSrsStore(store);
  return 1;
}

/**
 * Calculates current statistics for all cards across the 3 Leitner boxes.
 * @returns {Object} { box1: number, box2: number, box3: number, total: number }
 */
function getBoxCounts() {
  const store = getSrsStore();
  const counts = { box1: 0, box2: 0, box3: 0, total: 0 };

  Object.values(store).forEach((record) => {
    counts.total++;
    if (record.box === 2) counts.box2++;
    else if (record.box === 3) counts.box3++;
    else counts.box1++;
  });

  return counts;
}

/**
 * Builds a weighted review session based on the 3 boxes:
 * - Box 1 cards appear with 60% probability / weight (most frequent)
 * - Box 2 cards appear with 30% probability / weight
 * - Box 3 cards appear with 10% probability / weight (least frequent)
 *
 * @param {Array<Object>} availableCards - Full list of cards from active deck or store
 * @param {number} [sessionSize=8] - Target count of cards to review
 * @returns {Array<Object>} Weighted list of cards for this review session
 */
function buildWeightedReviewSession(availableCards, sessionSize = 8) {
  if (!Array.isArray(availableCards) || availableCards.length === 0) {
    // If no active cards passed, fallback to all cards in SRS storage
    const store = getSrsStore();
    availableCards = Object.values(store).map((r) => ({ front: r.front, back: r.back }));
  }

  if (availableCards.length === 0) return [];

  // Group available cards into 3 buckets by their current Leitner box
  const box1Cards = [];
  const box2Cards = [];
  const box3Cards = [];

  availableCards.forEach((c) => {
    const box = getCardBox(c);
    if (box === 3) box3Cards.push(c);
    else if (box === 2) box2Cards.push(c);
    else box1Cards.push(c);
  });

  // Calculate target quotas based on Leitner weights (60% Box 1, 30% Box 2, 10% Box 3)
  const quota1 = Math.round(sessionSize * 0.6);
  const quota2 = Math.round(sessionSize * 0.3);
  const quota3 = Math.max(1, sessionSize - quota1 - quota2);

  // Helper shuffle
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const picked = [];
  const s1 = shuffle(box1Cards);
  const s2 = shuffle(box2Cards);
  const s3 = shuffle(box3Cards);

  // Pick up to quota from each box
  picked.push(...s1.slice(0, quota1));
  picked.push(...s2.slice(0, quota2));
  picked.push(...s3.slice(0, quota3));

  // If we didn't fill sessionSize, fill from remaining cards prioritizing Box 1 then Box 2 then Box 3
  if (picked.length < sessionSize) {
    const remaining = [
      ...s1.slice(quota1),
      ...s2.slice(quota2),
      ...s3.slice(quota3),
    ];
    for (const c of remaining) {
      if (picked.length >= sessionSize) break;
      picked.push(c);
    }
  }

  // Final random shuffle so cards from different boxes are intermingled
  return shuffle(picked.slice(0, sessionSize));
}

// Global namespace exposure
window.StudySRS = {
  getCardIdentifier,
  getSrsStore,
  getCardBox,
  promoteCard,
  demoteCard,
  getBoxCounts,
  buildWeightedReviewSession,
};
