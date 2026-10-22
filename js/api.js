/**
 * ==========================================================================
 * AI Study Assistant - API Service
 * Handles network requests to the Google Gemini API using fetch() with
 * async/await and POST.
 *
 * NOTE: API keys are NEVER hard-coded. Keys are passed dynamically from
 * localStorage via the settings configuration.
 * ==========================================================================
 */

// Current official free-tier Google Gemini model
const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Builds the comprehensive prompt including user notes, answer style, and difficulty.
 * Instructs the model to return strict, raw JSON without markdown wrapping.
 *
 * @param {string} content - The study notes/input text
 * @param {string} difficulty - Selected difficulty ('easy', 'medium', 'hard')
 * @param {string} style - Selected answer style ('explain-10', 'exam-focused', 'detailed')
 * @param {boolean} [isVariation=false] - Whether to generate an alternative variation
 * @param {number|string} [questionCount=5] - Number of quiz questions (5, 10, 15)
 * @param {string} [mode='notes'] - Input mode ('notes' or 'topic')
 * @param {string} [language='English'] - Output language ('English', 'Hindi', 'Marathi')
 * @returns {string} The formatted prompt string
 */
function buildGeminiPrompt(content, difficulty, style, isVariation = false, questionCount = 5, mode = 'notes', language = 'English') {
  const styleGuides = {
    'explain-10': 'Explain concepts simply using intuitive analogies and accessible language suitable for a beginner or 10-year-old, while preserving scientific/factual accuracy.',
    'exam-focused': 'Focus on high-yield testable concepts, precise terminology, potential exam traps, formulas, and critical distinctions needed for top exam scores.',
    'detailed': 'Provide rigorous, comprehensive, in-depth academic explanations with thorough conceptual breakdowns, theoretical context, and nuanced insights.',
  };

  const styleText = styleGuides[style] || styleGuides['explain-10'];
  const count = parseInt(questionCount, 10) || 5;
  const isTopicMode = mode === 'topic';

  const modeInstruction = isTopicMode
    ? `INPUT MODE: TOPIC ONLY.\nThe user has provided ONLY a topic title: "${content}".\nYou MUST authoritatively write and synthesize the entire study material yourself from scratch on this topic, producing an educational summary, quiz, flashcards, and glossary without requiring any user-provided notes.`
    : `INPUT MODE: USER NOTES.\nAnalyze the user's provided study notes below and synthesize the study kit directly from their content.`;

  const languageInstruction = (language && language !== 'English')
    ? `\nLANGUAGE REQUIREMENT:\nAll educational content (the summary, quiz questions, choices, explanations, flashcards, and glossary terms and definitions) MUST be written in ${language}.\nCRITICAL: All JSON structure keys ("summary", "quiz", "question", "options", "answer", "explanation", "flashcards", "front", "back", "glossary", "term", "definition") MUST remain strictly in English.`
    : `\nLANGUAGE REQUIREMENT:\nAll educational content must be written in English.`;

  const variationText = isVariation
    ? '\n7. Variation Instruction: Please give a different variation of this study material with alternative explanations, fresh quiz questions, and new flashcard angles.'
    : '';

  return `You are an elite educational AI assistant.
Your task is to produce a structured study kit.

CRITICAL OUTPUT FORMAT INSTRUCTION:
You MUST reply ONLY with a valid, parseable JSON object matching the schema below.
DO NOT include any markdown formatting, DO NOT wrap in backticks or code fences, DO NOT include conversational preamble or sign-off text.

JSON Schema:
{
  "summary": "Structured study summary with clear headings, core concepts, and key takeaways.",
  "quiz": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 0,
      "explanation": "One-line concise explanation of why this answer is correct."
    }
  ],
  "flashcards": [
    {
      "front": "Key term, formula, or conceptual prompt",
      "back": "Clear definition, formula breakdown, or concise answer"
    }
  ],
  "glossary": [
    {
      "term": "Key Term",
      "definition": "Clear, concise definition of the term."
    }
  ]
}

Specific Requirements:
1. "summary": Provide a structured synthesis with clear headings and bullet points.
2. "quiz": Exactly ${count} multiple-choice questions. Each question MUST have exactly 4 choices in "options", a zero-based integer "answer" index (0, 1, 2, or 3), and a one-line "explanation" field explaining why the correct choice is right.
3. "flashcards": At least 5 high-yield flashcard items with "front" and "back".
4. "glossary": Exactly 6 to 10 key terms with definitions. Each entry MUST be an object with "term" and "definition" strings.
5. Pedagogical Style: ${styleText}
6. Difficulty Target: ${difficulty.toUpperCase()} level. Adjust conceptual depth and question challenge accordingly.${variationText}
${languageInstruction}

${modeInstruction}

${isTopicMode ? `Target Topic:\n${content}` : `Study Notes to Analyze:\n${content}`}`;
}

/**
 * Sends study notes or topic to the Google Gemini API to generate the study kit.
 *
 * @param {Object} options
 * @param {string} options.apiKey - Gemini API key retrieved from localStorage
 * @param {string} options.content - Raw study notes or topic text
 * @param {string} options.difficulty - Difficulty level ('easy', 'medium', 'hard')
 * @param {string} options.style - Pedagogical tone ('explain-10', 'exam-focused', 'detailed')
 * @param {boolean} [options.isVariation=false] - Whether to request an alternative variation
 * @param {number|string} [options.questionCount=5] - Number of quiz questions (5, 10, 15)
 * @param {string} [options.mode='notes'] - Input mode ('notes' or 'topic')
 * @param {string} [options.language='English'] - Output language ('English', 'Hindi', 'Marathi')
 * @returns {Promise<string>} The raw text response from the Gemini model
 */
async function fetchStudyKit(options) {
  const {
    apiKey,
    content,
    difficulty = 'medium',
    style = 'explain-10',
    isVariation = false,
    questionCount = 5,
    mode = 'notes',
    language = 'English',
  } = options;

  // 1. Validation: Verify API key presence
  if (!apiKey || typeof apiKey !== 'string' || !apiKey.trim()) {
    throw new Error('API key is missing. Please enter and save your Gemini API key in the Settings panel.');
  }

  // 2. Validation: Verify input content presence
  if (!content || typeof content !== 'string' || !content.trim()) {
    throw new Error('Study notes are empty. Please enter notes, lecture excerpts, or a topic before generating.');
  }

  // Construct official v1beta generateContent endpoint
  const endpoint = `${GEMINI_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
  const promptText = buildGeminiPrompt(content.trim(), difficulty, style, isVariation, questionCount, mode, language);

  // Request payload configured for JSON response mode
  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: promptText }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.3,
    }
  };

  let response;
  try {
    // 3. Network POST request using fetch with async/await
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  } catch (netErr) {
    console.error('api.js: Network fetch failed', netErr);
    throw new Error('Network failure: Unable to reach Google Gemini API. Please check your internet connection.');
  }

  // 4. Handle HTTP Status Errors with clear, actionable messages
  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = errJson?.error?.message ? ` (${errJson.error.message})` : '';
    } catch {
      // Fallback if error body is not JSON
    }

    if (response.status === 400 || response.status === 401 || response.status === 403) {
      throw new Error(`Invalid API key or unauthorized request (HTTP ${response.status})${errorDetail}. Please check your Gemini API key in Settings.`);
    }

    if (response.status === 429) {
      throw new Error(`Gemini API rate limit exceeded (HTTP 429)${errorDetail}. Please wait a moment before trying again.`);
    }

    if (response.status >= 500) {
      throw new Error(`Google Gemini server error (HTTP ${response.status})${errorDetail}. The AI service may be temporarily overloaded. Please try again shortly.`);
    }

    throw new Error(`Gemini API error (HTTP ${response.status})${errorDetail}. Request could not be completed.`);
  }

  // 5. Parse and inspect response envelope
  let data;
  try {
    data = await response.json();
  } catch (jsonErr) {
    console.error('api.js: Failed to parse HTTP response as JSON', jsonErr);
    throw new Error('Malformed HTTP response received from Gemini server.');
  }

  // Extract generated text part
  const candidate = data?.candidates?.[0];
  const rawText = candidate?.content?.parts?.[0]?.text;

  // Development logging: log raw response
  console.log('api.js: Raw Gemini API response:', rawText);

  if (!rawText) {
    const finishReason = candidate?.finishReason;
    if (finishReason === 'SAFETY') {
      throw new Error('Content generation blocked by Gemini safety filters. Please adjust the input material.');
    }
    throw new Error('Gemini API returned an empty response. Please try again.');
  }

  return rawText;
}

// Global namespace exposure
window.StudyApi = {
  GEMINI_MODEL,
  fetchStudyKit,
  buildGeminiPrompt,
};
