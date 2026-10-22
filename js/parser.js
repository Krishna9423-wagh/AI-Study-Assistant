/**
 * ==========================================================================
 * AI Study Assistant - Content Parser
 * Handles stripping code fences, parsing JSON inside try/catch, and validating
 * that summary, quiz, and flashcards exist according to specification.
 * ==========================================================================
 */

/**
 * Strips markdown code fences (```json ... ``` or ``` ... ```) from raw text.
 * @param {string} text - Raw model response
 * @returns {string} Stripped, trimmed text
 */
function stripCodeFences(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text.trim();
  // Strip leading ```json or ```
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '');
  // Strip trailing ```
  cleaned = cleaned.replace(/\s*```$/i, '');
  return cleaned.trim();
}

/**
 * Validates that the parsed study kit object adheres to the required schema:
 * - summary: non-empty string
 * - quiz: array of items with question, options (array), answer (number index), and one-line explanation (string)
 * - flashcards: array of items with front and back
 *
 * @param {Object} data - Parsed JSON object
 * @param {number} [expectedQuestionCount=5] - Number of quiz questions expected
 * @returns {boolean} True if valid, throws an error otherwise
 */
function validateStudyKit(data, expectedQuestionCount = 5) {
  if (!data || typeof data !== 'object') {
    throw new Error('Malformed JSON: Root response is not a valid object.');
  }

  // 1. Validate summary field
  if (!data.summary || typeof data.summary !== 'string' || !data.summary.trim()) {
    throw new Error('Malformed JSON: Missing or empty "summary" in AI output.');
  }

  // 2. Validate quiz array
  if (!Array.isArray(data.quiz) || data.quiz.length === 0) {
    throw new Error('Malformed JSON: Missing or empty "quiz" questions array in AI output.');
  }

  // Helpful error if AI returned fewer questions than requested
  const expectedCount = parseInt(expectedQuestionCount, 10) || 5;
  if (data.quiz.length < expectedCount) {
    throw new Error(
      `The AI returned too few quiz questions (${data.quiz.length} received, ${expectedCount} requested). Please click "Regenerate" or try with more detailed study notes.`
    );
  }

  data.quiz.forEach((q, idx) => {
    if (!q.question || typeof q.question !== 'string') {
      throw new Error(`Malformed JSON: Quiz question #${idx + 1} is missing a "question" text.`);
    }
    if (!Array.isArray(q.options) || q.options.length < 2) {
      throw new Error(`Malformed JSON: Quiz question #${idx + 1} must include an array of choices.`);
    }
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) {
      throw new Error(`Malformed JSON: Quiz question #${idx + 1} has an invalid correct "answer" index.`);
    }
    if (!q.explanation || typeof q.explanation !== 'string' || !q.explanation.trim()) {
      throw new Error(`Malformed JSON: Quiz question #${idx + 1} is missing a one-line "explanation" field.`);
    }
  });

  // 3. Validate flashcards array
  if (!Array.isArray(data.flashcards) || data.flashcards.length === 0) {
    throw new Error('Malformed JSON: Missing or empty "flashcards" array in AI output.');
  }

  data.flashcards.forEach((card, idx) => {
    if (!card.front || typeof card.front !== 'string' || !card.back || typeof card.back !== 'string') {
      throw new Error(`Malformed JSON: Flashcard #${idx + 1} is missing "front" or "back" text.`);
    }
  });

  return true;
}

/**
 * Parses raw text from the AI API into a structured, validated study kit object.
 * Strips code fences first, parses with JSON.parse inside try/catch, and validates fields.
 *
 * @param {string} rawResponse - The raw output text from the Gemini model
 * @param {number} [expectedQuestionCount=5] - Number of quiz questions expected
 * @returns {Object} Validated study kit object { summary, quiz, flashcards }
 */
function parseStudyKitResponse(rawResponse, expectedQuestionCount = 5) {
  if (!rawResponse || typeof rawResponse !== 'string') {
    throw new Error('Malformed JSON: Received empty response from AI model.');
  }

  // 1. Strip markdown code fences
  const cleanedText = stripCodeFences(rawResponse);

  // 2. Parse inside try/catch
  let parsed;
  try {
    parsed = JSON.parse(cleanedText);
  } catch (err) {
    console.error('parser.js: JSON.parse failed on cleaned text:', cleanedText, err);
    throw new Error('Malformed JSON: The AI model response could not be parsed as valid JSON.');
  }

  // 3. Validate presence of required schema fields and question count
  validateStudyKit(parsed, expectedQuestionCount);

  return parsed;
}

// Global namespace exposure
window.StudyParser = {
  stripCodeFences,
  validateStudyKit,
  parseStudyKitResponse,
};
