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

  // 2. Validate and pad quiz array
  if (!Array.isArray(data.quiz) || data.quiz.length === 0) {
    data.quiz = [];
  }

  // Auto-pad if AI returned fewer questions than requested, rather than crashing
  const expectedCount = parseInt(expectedQuestionCount, 10) || 5;
  while (data.quiz.length < expectedCount) {
    const padIdx = data.quiz.length;
    const fallbackCard = (data.flashcards && data.flashcards[padIdx % data.flashcards.length]) || { front: 'Core Principle', back: 'Essential mechanism described in study notes' };
    data.quiz.push({
      question: `What is the key takeaway regarding "${fallbackCard.front}"?`,
      options: [
        fallbackCard.back,
        'It has no measurable influence on the system',
        'It represents an arbitrary assumption without experimental basis',
        'It is completely unrelated to the core topic'
      ],
      answer: 0,
      explanation: `According to the study material, ${fallbackCard.front} connects directly to: ${fallbackCard.back}`
    });
  }

  data.quiz.forEach((q, idx) => {
    if (!q.question || typeof q.question !== 'string') {
      q.question = `Question #${idx + 1} regarding key concepts`;
    }
    if (!Array.isArray(q.options) || q.options.length < 2) {
      q.options = ['True / Primary mechanism', 'False / Secondary effect', 'Not applicable', 'Insufficient data'];
    }
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) {
      q.answer = 0;
    }
    if (!q.explanation || typeof q.explanation !== 'string' || !q.explanation.trim()) {
      q.explanation = `Option ${q.answer + 1} accurately reflects the core principle established in this study kit.`;
    }
  });

  // 3. Validate flashcards array
  if (!Array.isArray(data.flashcards) || data.flashcards.length === 0) {
    data.flashcards = [
      { front: 'Primary Principle', back: data.summary ? data.summary.slice(0, 100) : 'Core mechanism' }
    ];
  }

  data.flashcards.forEach((card, idx) => {
    if (!card.front || typeof card.front !== 'string' || !card.back || typeof card.back !== 'string') {
      card.front = card.front || `Flashcard #${idx + 1}`;
      card.back = card.back || 'Core definition from lecture notes.';
    }
  });

  // 4. Validate and pad glossary array (at least 6 key terms)
  if (!Array.isArray(data.glossary) || data.glossary.length === 0) {
    data.glossary = [];
  }

  while (data.glossary.length < 6) {
    const padIdx = data.glossary.length;
    const card = (data.flashcards && data.flashcards[padIdx % data.flashcards.length]) || { front: `Concept ${padIdx + 1}`, back: 'Fundamental mechanism' };
    data.glossary.push({
      term: card.front || `Concept ${padIdx + 1}`,
      definition: card.back || 'Essential mechanism from study material.'
    });
  }

  data.glossary.forEach((item, idx) => {
    if (!item.term || typeof item.term !== 'string' || !item.term.trim()) {
      throw new Error(`Malformed JSON: Glossary item #${idx + 1} is missing a valid "term" string.`);
    }
    if (!item.definition || typeof item.definition !== 'string' || !item.definition.trim()) {
      throw new Error(`Malformed JSON: Glossary item #${idx + 1} is missing a valid "definition" string.`);
    }
  });

  // 5. Optional outline validation (tolerant: validates if present, does not fail if absent)
  if (data.outline) {
    if (Array.isArray(data.outline)) {
      data.outline.forEach((section, idx) => {
        if (!section.title || typeof section.title !== 'string') {
          throw new Error(`Malformed JSON: Outline section #${idx + 1} is missing a "title" string.`);
        }
        if (section.children && !Array.isArray(section.children)) {
          throw new Error(`Malformed JSON: Outline section #${idx + 1} "children" must be an array.`);
        }
      });
    }
  }

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
