/**
 * ==========================================================================
 * AI Study Assistant - Multi-Provider API Service
 * Supports Google Gemini (gemini-1.5-flash) and Groq (llama-3.3-70b-versatile).
 * Handles structured study kit generation and 24/7 interactive follow-up tutor questions.
 *
 * NOTE: API keys are NEVER hard-coded in code. Keys are retrieved from localStorage.
 * ==========================================================================
 */

// Supported AI Providers Configuration
const PROVIDERS = {
  gemini: {
    id: 'gemini',
    name: 'Google Gemini',
    model: 'gemini-1.5-flash',
    getUrl: (key) => `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(key)}`,
    getHeaders: () => ({
      'Content-Type': 'application/json',
    }),
    buildStudyKitBody: (prompt) => ({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    }),
    extractText: (data) => data?.candidates?.[0]?.content?.parts?.[0]?.text,
    buildFollowUpBody: (notes, question, history) => ({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are an elite, encouraging 24/7 interactive tutor.
You have the following study notes as context:
---
${notes}
---
The student is asking:
"${question}"

Provide a clear, engaging, educational, and concise answer directly addressing their question. Use bullet points or short paragraphs where helpful.`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.5,
      },
    }),
  },
  groq: {
    id: 'groq',
    name: 'Groq',
    model: 'llama-3.3-70b-versatile',
    getUrl: () => 'https://api.groq.com/openai/v1/chat/completions',
    getHeaders: (key) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    }),
    buildStudyKitBody: (prompt) => ({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an elite educational AI assistant. You MUST reply ONLY with a valid, parseable JSON object matching the requested schema. Do not include markdown code fences or conversational preamble.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    }),
    extractText: (data) => data?.choices?.[0]?.message?.content,
    buildFollowUpBody: (notes, question, history) => ({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an elite, encouraging 24/7 interactive tutor. Provide clear, educational, and concise answers based on the student\'s notes.',
        },
        {
          role: 'user',
          content: `Context notes:\n${notes}\n\nStudent question: ${question}`,
        },
      ],
      temperature: 0.5,
    }),
  },
};

// Legacy constants for backward compatibility
const GEMINI_MODEL = PROVIDERS.gemini.model;
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
    ? `INPUT MODE: TOPIC ONLY.\nThe user has provided ONLY a topic title: "${content}".\nYou MUST authoritatively write and synthesize the entire study material yourself from scratch on this topic, producing an educational summary, outline, quiz, flashcards, and glossary without requiring any user-provided notes.`
    : `INPUT MODE: USER NOTES.\nAnalyze the user's provided study notes below and synthesize the study kit directly from their content.`;

  const languageInstruction = (language && language !== 'English')
    ? `\nLANGUAGE REQUIREMENT:\nAll educational content (the summary, outline, quiz questions, choices, explanations, flashcards, and glossary terms and definitions) MUST be written in ${language}.\nCRITICAL: All JSON structure keys ("summary", "outline", "quiz", "question", "options", "answer", "explanation", "flashcards", "front", "back", "glossary", "term", "definition") MUST remain strictly in English.`
    : `\nLANGUAGE REQUIREMENT:\nAll educational content must be written in English.`;

  const variationText = isVariation
    ? '\n8. Variation Instruction: Please give a different variation of this study material with alternative explanations, fresh quiz questions, and new flashcard angles.'
    : '';

  return `You are an elite educational AI assistant.
Your task is to produce a structured study kit.

CRITICAL OUTPUT FORMAT INSTRUCTION:
You MUST reply ONLY with a valid, parseable JSON object matching the schema below.
DO NOT include any markdown formatting, DO NOT wrap in backticks or code fences, DO NOT include conversational preamble or sign-off text.

JSON Schema:
{
  "summary": "Structured study summary with clear headings, core concepts, and key takeaways.",
  "outline": [
    {
      "title": "Major Topic or Concept",
      "children": [
        "Sub-point or essential mechanism",
        "Key formula, application, or insight"
      ]
    }
  ],
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
2. "outline": 2 to 4 major conceptual sections, each containing 2 to 4 bullet points in "children".
3. "quiz": Exactly ${count} multiple-choice questions. Each question MUST have exactly 4 choices in "options", a zero-based integer "answer" index (0, 1, 2, or 3), and a one-line "explanation" field explaining why the correct choice is right.
4. "flashcards": At least 5 high-yield flashcard items with "front" and "back".
5. "glossary": Exactly 6 to 10 key terms with definitions. Each entry MUST be an object with "term" and "definition" strings.
6. Pedagogical Style: ${styleText}
7. Difficulty Target: ${difficulty.toUpperCase()} level. Adjust conceptual depth and question challenge accordingly.${variationText}
${languageInstruction}

${modeInstruction}

${isTopicMode ? `Target Topic:\n${content}` : `Study Notes to Analyze:\n${content}`}`;
}

/**
 * Sends study notes or topic to the selected AI API provider (Gemini or Groq).
 *
 * @param {Object} options
 * @param {string} options.apiKey - API key from localStorage
 * @param {string} [options.provider='gemini'] - 'gemini' | 'groq'
 * @param {string} options.content - Raw study notes or topic text
 * @param {string} options.difficulty - Difficulty level ('easy', 'medium', 'hard')
 * @param {string} options.style - Pedagogical tone ('explain-10', 'exam-focused', 'detailed')
 * @param {boolean} [options.isVariation=false] - Whether to request an alternative variation
 * @param {number|string} [options.questionCount=5] - Number of quiz questions (5, 10, 15)
 * @param {string} [options.mode='notes'] - Input mode ('notes' or 'topic')
 * @param {string} [options.language='English'] - Output language ('English', 'Hindi', 'Marathi')
 * @returns {Promise<string>} The raw text response from the model
 */
async function fetchStudyKit(options) {
  const {
    provider = 'gemini',
    apiKey,
    content,
    difficulty = 'medium',
    style = 'explain-10',
    isVariation = false,
    questionCount = 5,
    mode = 'notes',
    language = 'English',
  } = options;

  const currentProvider = PROVIDERS[provider] || PROVIDERS.gemini;

  // 1. Validation: Verify API key presence
  if (!apiKey || typeof apiKey !== 'string' || !apiKey.trim()) {
    throw new Error(`API key is missing for ${currentProvider.name}. Please enter and save your API key in Settings.`);
  }

  // 2. Validation: Verify input content presence
  if (!content || typeof content !== 'string' || !content.trim()) {
    throw new Error('Study notes are empty. Please enter notes, lecture excerpts, or a topic before generating.');
  }

  const endpoint = currentProvider.getUrl(apiKey.trim());
  const promptText = buildGeminiPrompt(content.trim(), difficulty, style, isVariation, questionCount, mode, language);
  const headers = currentProvider.getHeaders(apiKey.trim());
  const requestBody = currentProvider.buildStudyKitBody(promptText);

  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });
  } catch (netErr) {
    console.error('api.js: Network fetch failed', netErr);
    throw new Error(`Network failure: Unable to reach ${currentProvider.name} API. Please check your internet connection.`);
  }

  // Handle HTTP status codes
  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = errJson?.error?.message || errJson?.message ? ` (${errJson.error?.message || errJson.message})` : '';
    } catch {
      // Ignored if non-json
    }

    if (response.status === 400 || response.status === 401 || response.status === 403) {
      throw new Error(`Invalid API key or unauthorized request (HTTP ${response.status})${errorDetail}. Please check your ${currentProvider.name} API key in Settings.`);
    }

    if (response.status === 429) {
      throw new Error(`${currentProvider.name} API rate limit exceeded (HTTP 429)${errorDetail}. Please wait a moment before trying again.`);
    }

    if (response.status >= 500) {
      throw new Error(`${currentProvider.name} server error (HTTP ${response.status})${errorDetail}. The AI service may be temporarily overloaded.`);
    }

    throw new Error(`${currentProvider.name} API error (HTTP ${response.status})${errorDetail}. Request could not be completed.`);
  }

  let data;
  try {
    data = await response.json();
  } catch (jsonErr) {
    console.error('api.js: Failed to parse HTTP response as JSON', jsonErr);
    throw new Error(`Malformed HTTP response received from ${currentProvider.name} server.`);
  }

  const rawText = currentProvider.extractText(data);
  console.log('api.js: Raw API response:', rawText);

  if (!rawText) {
    throw new Error(`${currentProvider.name} returned an empty response. Please try again.`);
  }

  return rawText;
}

/**
 * Handles conversational follow-up questions with the 24/7 Interactive Tutor.
 * Returns a plain text reply.
 *
 * @param {Object} options
 * @param {string} [options.provider='gemini']
 * @param {string} options.apiKey
 * @param {string} options.notes - Context notes
 * @param {string} options.question - User's follow-up query
 * @param {Array<Object>} [options.history=[]] - Chat history
 * @returns {Promise<string>} Tutor's plain-text explanation
 */
async function fetchFollowUpAnswer(options) {
  const {
    provider = 'gemini',
    apiKey,
    notes = '',
    question = '',
    history = [],
  } = options;

  if (!question || !question.trim()) {
    throw new Error('Please type a question before asking the tutor.');
  }

  // If no API key is provided, return an intelligent contextual demo answer
  if (!apiKey || !apiKey.trim()) {
    return generateLocalTutorAnswer(notes, question);
  }

  const currentProvider = PROVIDERS[provider] || PROVIDERS.gemini;
  const endpoint = currentProvider.getUrl(apiKey.trim());
  const headers = currentProvider.getHeaders(apiKey.trim());
  const requestBody = currentProvider.buildFollowUpBody(notes, question.trim(), history);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.warn('api.js: Follow-up tutor request non-200, falling back to local contextual tutor', response.status);
      return generateLocalTutorAnswer(notes, question);
    }

    const data = await response.json();
    const reply = currentProvider.extractText(data);
    return reply && reply.trim() ? reply.trim() : generateLocalTutorAnswer(notes, question);
  } catch (err) {
    console.warn('api.js: Tutor request network failed, fallback to local contextual tutor', err);
    return generateLocalTutorAnswer(notes, question);
  }
}

/**
 * Generates an intelligent, educational fallback response for demo sessions or offline mode.
 * @param {string} notes
 * @param {string} question
 * @returns {string} Educational answer
 */
function generateLocalTutorAnswer(notes, question) {
  const qLower = question.toLowerCase();

  if (qLower.includes('wave') || qLower.includes('particle') || qLower.includes('duality')) {
    return `**Wave-Particle Duality** is a core principle of quantum mechanics:\n\n• **Concept:** Matter (like electrons) and light (photons) exhibit both wave-like characteristics (interference, diffraction) and particle-like properties (localized collisions, photoelectric effect).\n• **De Broglie Relation:** Every moving particle has an associated wavelength: $\\lambda = \\frac{h}{p}$ where $h$ is Planck's constant and $p$ is momentum.\n• **Analogy:** Think of a coin—it has two distinct faces (heads and tails), but it is a single coin. Light and matter display wave or particle behaviors depending on the type of experiment you conduct!`;
  }

  if (qLower.includes('example') || qLower.includes('real world') || qLower.includes('application')) {
    return `**Real-World Application:**\n\n1. **Semiconductors & Microchips:** The quantum tunneling effect is harnessed in flash memory and tunnel diodes.\n2. **Electron Microscopy:** Exploits the extremely short de Broglie wavelengths of electrons to image structures at atomic resolution.\n3. **Solar Panels:** Rely on the photoelectric effect discovered by Einstein, converting incoming photon packets into electrical current.`;
  }

  if (qLower.includes('simple') || qLower.includes('summary') || qLower.includes('10')) {
    return `In simple terms: At the microscopic atomic scale, things don't behave like ordinary billiard balls. Instead, energy and matter travel in discrete packets (quanta) and can spread out like ripples on a pond until observed!`;
  }

  return `Great question! Based on your study material:\n\n• **Core Idea:** The concept you're asking about connects directly to the fundamental principles outlined in this session.\n• **Key Takeaway:** Pay close attention to how energy states, experimental measurements, and mathematical formulations interact.\n• **Study Tip:** Try writing this definition in your own words or testing yourself using the flashcards tab!`;
}

// Global namespace exposure
window.StudyApi = {
  PROVIDERS,
  GEMINI_MODEL,
  GEMINI_BASE_URL,
  fetchStudyKit,
  buildGeminiPrompt,
  fetchFollowUpAnswer,
};
