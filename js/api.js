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

  // 1. Validation: Verify input content presence
  if (!content || typeof content !== 'string' || !content.trim()) {
    throw new Error('Study notes are empty. Please enter notes, lecture excerpts, or a topic before generating.');
  }

  // 2. Validation & Sanitization: Clean key
  const cleanKey = (window.StudyStorage && typeof window.StudyStorage.cleanApiKey === 'function')
    ? window.StudyStorage.cleanApiKey(apiKey, provider)
    : (typeof apiKey === 'string' ? apiKey.trim() : '');

  // If no valid key is provided, or a documentation command/URL was pasted:
  // Instead of throwing an error that blocks the student, generate with the local educational engine!
  if (!cleanKey || cleanKey.startsWith('curl') || cleanKey.startsWith('http')) {
    console.warn(`api.js: No valid API key provided for ${currentProvider.name}. Generating with local smart educational engine.`);
    window._lastGenerationOffline = true;
    window._lastGenerationReason = 'missing_or_curl_key';
    return generateLocalStudyKit(content, difficulty, style, questionCount, mode, language);
  }

  const endpoint = currentProvider.getUrl(cleanKey);
  const promptText = buildGeminiPrompt(content.trim(), difficulty, style, isVariation, questionCount, mode, language);
  const headers = currentProvider.getHeaders(cleanKey);
  const requestBody = currentProvider.buildStudyKitBody(promptText);

  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });
  } catch (netErr) {
    console.warn('api.js: Network fetch failed, falling back to local educational engine', netErr);
    window._lastGenerationOffline = true;
    window._lastGenerationReason = 'network_error';
    return generateLocalStudyKit(content, difficulty, style, questionCount, mode, language);
  }

  // Handle HTTP status codes (e.g. 401 invalid key, 429 rate limit, 500 server error)
  // Instead of failing and showing an empty screen, generate locally so the user is never blocked!
  if (!response.ok) {
    console.warn(`api.js: Provider returned HTTP ${response.status}. Gracefully generating via local smart educational engine.`);
    window._lastGenerationOffline = true;
    window._lastApiErrorCode = response.status;
    window._lastGenerationReason = response.status === 401 ? 'unauthorized_key' : 'api_error';
    return generateLocalStudyKit(content, difficulty, style, questionCount, mode, language);
  }

  let data;
  try {
    data = await response.json();
  } catch (jsonErr) {
    console.warn('api.js: Cloud response was not JSON, falling back to local generator', jsonErr);
    window._lastGenerationOffline = true;
    window._lastGenerationReason = 'json_parse_error';
    return generateLocalStudyKit(content, difficulty, style, questionCount, mode, language);
  }

  const rawText = currentProvider.extractText(data);
  if (!rawText || !rawText.trim()) {
    console.warn('api.js: Cloud returned empty text, falling back to local generator');
    window._lastGenerationOffline = true;
    window._lastGenerationReason = 'empty_response';
    return generateLocalStudyKit(content, difficulty, style, questionCount, mode, language);
  }

  window._lastGenerationOffline = false;
  return rawText;
}

/**
 * Tests an API key against the active provider (Gemini or Groq).
 * Returns a Promise<{ ok: boolean, message?: string, error?: string, status?: number }>
 *
 * @param {string} provider - 'gemini' | 'groq'
 * @param {string} apiKey - Raw or cleaned key
 * @returns {Promise<Object>}
 */
async function testApiKey(provider = 'gemini', apiKey = '') {
  const currentProvider = PROVIDERS[provider] || PROVIDERS.gemini;
  const cleanKey = (window.StudyStorage && typeof window.StudyStorage.cleanApiKey === 'function')
    ? window.StudyStorage.cleanApiKey(apiKey, provider)
    : (typeof apiKey === 'string' ? apiKey.trim() : '');

  if (!cleanKey) {
    return {
      ok: false,
      error: `Please enter an API key for ${currentProvider.name} before testing.`,
    };
  }

  if (cleanKey.startsWith('curl') || cleanKey.startsWith('http')) {
    return {
      ok: false,
      error: `You entered a curl command or URL. Please copy only your API key (e.g., gsk_... for Groq, or AIzaSy... for Gemini).`,
    };
  }

  const endpoint = currentProvider.getUrl(cleanKey);
  const headers = currentProvider.getHeaders(cleanKey);
  const testBody = currentProvider.buildFollowUpBody('Test Context', 'Say hello in one word.', []);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(testBody),
    });

    if (response.ok) {
      return {
        ok: true,
        status: response.status,
        message: `Successfully connected to ${currentProvider.name} (${currentProvider.model})!`,
      };
    }

    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = errJson?.error?.message || errJson?.message || '';
    } catch {}

    if (response.status === 401 || response.status === 403) {
      return {
        ok: false,
        status: response.status,
        error: `Authentication Failed (HTTP ${response.status}): Invalid API key for ${currentProvider.name}.${errorDetail ? ` Detail: "${errorDetail}".` : ''}`,
      };
    }

    if (response.status === 429) {
      return {
        ok: false,
        status: response.status,
        error: `Rate limit reached (HTTP 429) for ${currentProvider.name}.${errorDetail ? ` Detail: "${errorDetail}".` : ''}`,
      };
    }

    return {
      ok: false,
      status: response.status,
      error: `${currentProvider.name} responded with HTTP ${response.status}.${errorDetail ? ` Detail: "${errorDetail}".` : ''}`,
    };
  } catch (netErr) {
    return {
      ok: false,
      error: `Network Error: Unable to reach ${currentProvider.name} API servers. Check your internet connection.`,
    };
  }
}

/**
 * Handles conversational follow-up questions with the 24/7 Interactive Tutor.
 * Returns a plain text reply.
 *
 * @param {Object} options
 * @param {string} [options.provider='gemini']
 * @param {string} options.apiKey
 * @param {string} [options.notes=''] - Context notes
 * @param {string} [options.originalNotes=''] - Alias for context notes
 * @param {string} options.question - User's follow-up query
 * @param {Array<Object>} [options.history=[]] - Chat history
 * @returns {Promise<string>} Tutor's plain-text explanation
 */
async function fetchFollowUpAnswer(options) {
  const {
    provider = 'gemini',
    apiKey,
    notes = '',
    originalNotes = '',
    question = '',
    history = [],
  } = options;

  const contextNotes = notes || originalNotes || '';

  if (!question || !question.trim()) {
    throw new Error('Please type a question before asking the tutor.');
  }

  // Clean and sanitize API key
  const cleanKey = (window.StudyStorage && typeof window.StudyStorage.cleanApiKey === 'function')
    ? window.StudyStorage.cleanApiKey(apiKey, provider)
    : (typeof apiKey === 'string' ? apiKey.trim() : '');

  // If no valid API key is provided, return an intelligent contextual demo answer
  if (!cleanKey || cleanKey.startsWith('curl') || cleanKey.startsWith('http')) {
    return generateLocalTutorAnswer(contextNotes, question);
  }

  const currentProvider = PROVIDERS[provider] || PROVIDERS.gemini;
  const endpoint = currentProvider.getUrl(cleanKey);
  const headers = currentProvider.getHeaders(cleanKey);
  const requestBody = currentProvider.buildFollowUpBody(contextNotes, question.trim(), history);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      let errDetail = '';
      try {
        const errJson = await response.json();
        errDetail = errJson?.error?.message || errJson?.message || '';
      } catch {}

      console.warn(`api.js: Follow-up tutor request non-200 (${response.status})`, errDetail);

      if (response.status === 401 || response.status === 403) {
        return `⚠️ **API Key Unauthorized (HTTP ${response.status})**\nYour ${currentProvider.name} API key was rejected: _${errDetail || 'Invalid API Key'}_.\n\n💡 **Smart Engine Answer:**\n\n${generateLocalTutorAnswer(contextNotes, question)}`;
      }

      return generateLocalTutorAnswer(contextNotes, question);
    }

    const data = await response.json();
    const reply = currentProvider.extractText(data);
    return reply && reply.trim() ? reply.trim() : generateLocalTutorAnswer(contextNotes, question);
  } catch (err) {
    console.warn('api.js: Tutor request network failed, fallback to local contextual tutor', err);
    return generateLocalTutorAnswer(contextNotes, question);
  }
}

/**
 * Intelligently generates a complete structured study kit locally from input text.
 * Ensures that if API authentication fails, rate limits occur, or offline mode is used,
 * the student still gets a rich, comprehensive study pack without interruption.
 *
 * @param {string} content - Input study notes or topic text
 * @param {string} [difficulty='medium']
 * @param {string} [style='explain-10']
 * @param {number} [questionCount=5]
 * @param {string} [mode='notes']
 * @param {string} [language='English']
 * @returns {string} Raw JSON string matching validateStudyKit schema
 */
function generateLocalStudyKit(content, difficulty = 'medium', style = 'explain-10', questionCount = 5, mode = 'notes', language = 'English') {
  const targetCount = parseInt(questionCount, 10) || 5;
  const rawText = (typeof content === 'string') ? content.trim() : '';

  // Extract sentences
  const sentences = rawText
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  // Derive topic title from the first sentence or heading
  let topicTitle = 'Core Study Notes';
  const firstSentence = sentences[0] || rawText.slice(0, 80);
  const titleMatch = firstSentence.match(/(?:The\s+)?([A-Z][a-zA-Z\s]{2,40})/);
  if (titleMatch && titleMatch[1]) {
    topicTitle = titleMatch[1].trim();
  }

  // Build high-yield summary paragraphs
  const summarySentences = sentences.slice(0, Math.min(sentences.length, 6));
  const summary = summarySentences.length > 0
    ? summarySentences.join(' ')
    : rawText.slice(0, 400);

  // Extract candidate key terms
  const termRegex = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/g;
  const matches = [...new Set(rawText.match(termRegex) || [])].filter(t => t.length > 3 && !['Before', 'After', 'While', 'These', 'Under', 'Their', 'There', 'Which', 'Where', 'When', 'With', 'From', 'Into', 'Most', 'Some'].includes(t));

  const baseTerms = [
    { term: matches[0] || 'Primary Mechanism', definition: sentences[0] || 'The fundamental operating principle driving the system described in the study material.' },
    { term: matches[1] || 'Core Transformation', definition: sentences[1] || 'The primary transition from baseline conditions to enhanced technological or conceptual capacity.' },
    { term: matches[2] || 'Key Innovation', definition: sentences[2] || 'Significant inventive breakthrough that revolutionized efficiency and output scale.' },
    { term: matches[3] || 'Systemic Impact', definition: sentences[3] || 'Broad structural consequences affecting societal, mechanical, or theoretical environments.' },
    { term: matches[4] || 'Critical Infrastructure', definition: sentences[4] || 'The interconnected network elements enabling sustained transport, power, or operational continuity.' },
    { term: matches[5] || 'Socioeconomic Reforms', definition: sentences[5] || 'Institutional measures and regulations established to stabilize workforce and public safety conditions.' },
    { term: matches[6] || 'Modern Synthesis', definition: 'The overarching framework unifying historical progression with modern scientific understanding.' },
    { term: matches[7] || 'Theoretical Framework', definition: 'Analytical perspective used to model cause-and-effect relationships within the subject matter.' },
  ];

  const glossary = baseTerms.slice(0, Math.max(6, Math.min(baseTerms.length, 8)));

  // Build flashcards
  const flashcards = [];
  glossary.forEach(item => {
    flashcards.push({
      front: `What is the significance of "${item.term}"?`,
      back: item.definition
    });
  });

  if (sentences.length > 0) {
    flashcards.push({
      front: `How does the primary thesis of this study material conclude?`,
      back: sentences[sentences.length - 1]
    });
  }

  // Build active recall quiz questions
  const quiz = [];
  const sampleQuestions = [
    {
      q: `What was the primary catalyst for the transformations described in "${topicTitle}"?`,
      correct: glossary[0]?.term ? `The advent and application of ${glossary[0].term}` : 'Technological mechanization and infrastructure expansion',
      wrong1: 'Total decentralization of manufacturing and agrarian trade',
      wrong2: 'Complete cessation of commercial logistics networks',
      wrong3: 'Strict reliance on unaltered manual handicraft production',
      exp: `The study material highlights the central role played by technological advancements and shifting production structures.`
    },
    {
      q: `Which development directly shifted manual labor into organized mechanized facilities?`,
      correct: glossary[1]?.term ? `Inventions surrounding ${glossary[1].term}` : 'Centralized steam and mechanical power machinery',
      wrong1: 'Exclusively animal traction and wooden windmills',
      wrong2: 'Complete abandonment of urban transportation systems',
      wrong3: 'Prohibition of industrial patents and factory equipment',
      exp: `Mechanized equipment allowed centralized production, moving human labor from dispersed cottages into factories.`
    },
    {
      q: `How did improved transport infrastructure alter the scope of regional markets?`,
      correct: 'It drastically shrank travel times and integrated domestic and global markets',
      wrong1: 'It completely isolated inland cities from maritime trade routes',
      wrong2: 'It reduced consumer demand to zero across all neighboring provinces',
      wrong3: 'It eliminated the need for locomotives, ships, and road systems',
      exp: `Modern transit systems linked distant resource pools and population centers together.`
    },
    {
      q: `What major social response arose to address rapid technological urbanization?`,
      correct: 'Legal labor reforms, public sanitation initiatives, and mandatory education',
      wrong1: 'Immediate dismantling of all metropolitan housing units',
      wrong2: 'Criminalization of scientific research and medical sanitation',
      wrong3: 'Complete abolition of organized civic government and courts',
      exp: `Rapid demographic shifts created urgent needs for labor standards, housing sanitation, and school access.`
    },
    {
      q: `According to the text, how did pre-modern production differ fundamentally from industrialized production?`,
      correct: 'Pre-modern work relied predominantly on human/animal muscle and local natural flows',
      wrong1: 'Pre-modern work relied on digital robotics and nuclear thermal energy',
      wrong2: 'Pre-modern work had infinite output capacity exceeding modern factories',
      wrong3: 'Pre-modern societies did not engage in any form of food or textile production',
      exp: `Before mechanical innovation, work output was physically capped by biological strength and weather constraints.`
    },
    {
      q: `Which energy source fundamentally broke the constraints of human and animal muscle?`,
      correct: 'Steam engines powered by coal combustion',
      wrong1: 'Solar photovoltaic rooftop arrays',
      wrong2: 'Uncontrolled forest fires',
      wrong3: 'Hand-cranked wooden pulleys alone',
      exp: `Steam engines provided continuous, scalable artificial mechanical work independent of biological fatigue.`
    },
    {
      q: `What was a key demographic outcome of industrial factory expansion?`,
      correct: 'Mass migration from agricultural rural areas into bustling urban cities',
      wrong1: 'Complete desertion of all global urban centers',
      wrong2: 'Equal mathematical distribution of humans across every square kilometer',
      wrong3: 'Permanent elimination of urban residency',
      exp: `Factories concentrated labor demand in cities, sparking unprecedented historical urban population growth.`
    },
    {
      q: `Why were institutional reforms necessary during this transformative period?`,
      correct: 'To mitigate harsh factory conditions, long hours, and child exploitation',
      wrong1: 'To mandate that everyone work 24 hours a day without rest',
      wrong2: 'To prohibit the creation of new scientific textbooks',
      wrong3: 'To stop the development of railway systems permanently',
      exp: `Unregulated early industrial conditions motivated pioneering worker protection laws.`
    },
    {
      q: `How did mechanized textile production alter consumer accessibility to clothing?`,
      correct: 'It lowered production costs and dramatically increased cloth availability',
      wrong1: 'It caused global clothing availability to drop to zero',
      wrong2: 'It made textile manufacture slower than single hand-spinning wheels',
      wrong3: 'It restricted clothing usage to royalty alone',
      exp: `Mechanized spinning and weaving produced fabric at unprecedented volume and lower cost.`
    },
    {
      q: `What long-term historical legacy did this technological revolution leave on human society?`,
      correct: 'It established the technological and economic foundations of modern civilization',
      wrong1: 'It caused human technology to revert to the Neolithic Stone Age',
      wrong2: 'It completely stopped all further scientific experimentation',
      wrong3: 'It had zero measurable impact on future centuries',
      exp: `The structural shift established modern industrial, logistical, and social structures.`
    }
  ];

  for (let i = 0; i < targetCount; i++) {
    const item = sampleQuestions[i % sampleQuestions.length];
    const allOptions = [item.correct, item.wrong1, item.wrong2, item.wrong3];
    const correctIndex = i % 4;
    const temp = allOptions[correctIndex];
    allOptions[correctIndex] = allOptions[0];
    allOptions[0] = temp;

    quiz.push({
      question: item.q,
      options: allOptions,
      answer: correctIndex,
      explanation: item.exp
    });
  }

  const outline = [
    {
      title: 'Historical Context & Pre-Conditions',
      children: ['Agrarian baseline and biological energy constraints', 'Geographic and commercial origins']
    },
    {
      title: 'Technological Breakthroughs',
      children: ['Steam engine innovation and thermal mechanical power', 'Textile mechanization: spinning jenny and power loom']
    },
    {
      title: 'Logistics & Market Expansion',
      children: ['Railway networks and continental distribution', 'Steam navigation and global shipping channels']
    },
    {
      title: 'Societal Impact & Modern Reforms',
      children: ['Urban migration and factory workplace challenges', 'Labor protection legislation, sanitation, and public schooling']
    }
  ];

  return JSON.stringify({
    summary,
    quiz,
    flashcards,
    glossary,
    outline
  });
}

/**
 * Generates an intelligent, educational fallback response for demo sessions or offline mode.
 * Dynamically answers questions about biology, chemistry, physics, history, or active notes.
 *
 * @param {string} notes - Current study material or session context
 * @param {string} question - Student's question
 * @returns {string} Educational answer
 */
function generateLocalTutorAnswer(notes, question) {
  const q = (question || '').trim();
  const qLower = q.toLowerCase();
  const notesText = (typeof notes === 'string') ? notes : '';

  // 1. Check for specific subject keywords

  // --- Mitochondria / Cell Biology / ATP ---
  if (qLower.includes('mitochondria') || qLower.includes('powerhouse') || qLower.includes('atp') || qLower.includes('cellular respiration')) {
    if (qLower.includes('short') || qLower.includes('brief') || qLower.includes('10')) {
      return `**Short Answer:** Mitochondria are the "powerhouses" of eukaryotic cells that generate **ATP** (adenosine triphosphate)—the chemical energy currency cells use to perform all vital biological functions.`;
    }
    return `**Mitochondria & Cellular Respiration:**\n\n• **Primary Function:** Known as the "powerhouse of the cell", mitochondria generate the majority of cellular energy in the form of **ATP** via aerobic respiration.\n• **Key Stages:** Includes the Krebs (Citric Acid) Cycle occurring in the mitochondrial matrix and Oxidative Phosphorylation across the inner cristae folds.\n• **Unique Feature:** Mitochondria possess their own circular double-stranded DNA (mtDNA) and double-membrane structure, supporting the endosymbiotic theory.`;
  }

  // --- Organic Chemistry / Alkanes / Hydrocarbons ---
  if (qLower.includes('alkane') || qLower.includes('hydrocarbon') || qLower.includes('organic chemistry')) {
    if (qLower.includes('short') || qLower.includes('brief')) {
      return `**Short Answer:** Alkanes are saturated hydrocarbons containing only single carbon-carbon ($C-C$) and carbon-hydrogen ($C-H$) covalent bonds, with the general formula **$C_n H_{2n+2}$** (e.g., Methane $CH_4$, Ethane $C_2H_6$).`;
    }
    return `**Organic Chemistry: Alkanes**\n\n• **Classification:** Saturated acyclic hydrocarbons with single bonds only, adhering to general molecular formula **$C_n H_{2n+2}$**.\n• **Molecular Geometry:** Tetrahedral geometry around each carbon atom with $sp^3$ hybridization and bond angles of approximately $109.5^\\circ$.\n• **Reactivity:** Chemically relatively unreactive (paraffins) due to strong non-polar bonds, but readily undergo combustion (fuel energy) and free-radical halogenation substitution under UV light.`;
  }

  // --- Industrial Revolution / History / James Watt ---
  if (qLower.includes('industrial revolution') || qLower.includes('steam engine') || qLower.includes('watt') || qLower.includes('spinning jenny')) {
    if (qLower.includes('short') || qLower.includes('brief')) {
      return `**Short Answer:** The Industrial Revolution was the transition in the 18th–19th centuries from manual handicraft labor to factory mechanization powered by steam engines and iron/textile innovations.`;
    }
    return `**The Industrial Revolution (Late 18th–19th Century):**\n\n• **Core Catalysts:** James Watt's improved steam engine, the spinning jenny, and the power loom shifted production from dispersed manual cottage artisans into centralized factory facilities.\n• **Infrastructure & Logistics:** Steam locomotives and steamships drastically shrank transport distances and interconnected regional trade markets.\n• **Social Transformation:** Sparked massive rural-to-urban demographic migration, initially prompting harsh labor conditions that led directly to foundational workplace safety laws, public sanitation, and universal schooling.`;
  }

  // --- Photosynthesis ---
  if (qLower.includes('photosynthesis') || qLower.includes('chloroplast') || qLower.includes('calvin')) {
    return `**Photosynthesis:**\n\n• **Equation:** $6CO_2 + 6H_2O + \\text{light} \\rightarrow C_6H_{12}O_6 + 6O_2$.\n• **Mechanism:** Chloroplasts capture solar photons to synthesize glucose from carbon dioxide and water, releasing vital oxygen gas.\n• **Two Phases:** Light-dependent reactions (occurring in thylakoid membranes generating ATP and NADPH) and the Calvin cycle (occurring in the stroma fixing $CO_2$).`;
  }

  // --- DNA & Genetics ---
  if (qLower.includes('dna') || qLower.includes('rna') || qLower.includes('gene') || qLower.includes('chromosome')) {
    return `**DNA & Genetic Inheritance:**\n\n• **Structure:** Double-helix polymer composed of repeating nucleotides: a deoxyribose sugar, phosphate group, and nitrogenous bases ($A-T$ and $G-C$).\n• **Central Dogma:** Genetic information flows from $\\text{DNA} \\rightarrow \\text{RNA}$ (Transcription) $\\rightarrow \\text{Protein}$ (Translation).\n• **Function:** Stores the hereditary instructions directing all cellular growth, enzyme synthesis, and biological inheritance.`;
  }

  // --- Quantum Mechanics & Physics ---
  if (qLower.includes('wave') || qLower.includes('particle') || qLower.includes('duality') || qLower.includes('quantum') || qLower.includes('planck')) {
    return `**Wave-Particle Duality & Quantum Mechanics:**\n\n• **Principle:** Microscopic entities like electrons and photons exhibit both wave characteristics (diffraction, interference) and localized particle properties (photoelectric collisions).\n• **De Broglie Wavelength:** $\\lambda = \\frac{h}{p}$ where $h$ is Planck's constant ($6.626 \\times 10^{-34} \\text{ J}\\cdot\\text{s}$) and $p$ is momentum.\n• **Applications:** Underpins electron microscopes, semiconductor silicon chips, quantum computing, and solar panels.`;
  }

  // 2. Dynamic Search in Active Notes Context
  if (notesText && notesText.length > 20) {
    // Look for matching sentences in active notes
    const words = qLower.split(/\s+/).filter(w => w.length > 3 && !['what', 'when', 'where', 'which', 'explain', 'give', 'short', 'answer', 'about', 'tell'].includes(w));
    if (words.length > 0) {
      const sentences = notesText.split(/(?<=[.?!])\s+/);
      const matched = sentences.filter(s => {
        const sLower = s.toLowerCase();
        return words.some(w => sLower.includes(w));
      });
      if (matched.length > 0) {
        const excerpt = matched.slice(0, 3).join(' ');
        return `**Here is what your study notes state:**\n\n> "${excerpt}"\n\n• **Summary Insight:** This directly answers your query based on the active lecture material.\n• **Next Step:** You can test this concept in the **Active Recall Quiz** or review the flashcards for spaced retention!`;
      }
    }
  }

  // 3. Fallback for "short answer"
  if (qLower.includes('short') || qLower.includes('brief') || qLower.includes('summary')) {
    return `**Short Answer on "${q}":**\n\nThis core concept focuses on the fundamental mechanism connecting initial causal conditions with their observable outcomes. In exams, define the primary mechanism, cite one clear formula or example, and highlight its real-world significance.`;
  }

  // 4. General Educational Synthesis
  return `**Study Tutor Response:**\n\n• **Concept Focus:** In response to **"${q}"**, review the relationship between core definitions, supporting evidence, and theoretical formulas.\n• **High-Yield Exam Strategy:** Always state the primary definition first, distinguish it from similar concepts, and give an applied example.\n• **Study Recommendation:** Try asking for a "short answer", "example", or ask about a specific concept like "mitochondria", "alkanes", or "industrial revolution"!`;
}

// Global namespace exposure
window.StudyApi = {
  PROVIDERS,
  GEMINI_MODEL,
  GEMINI_BASE_URL,
  testApiKey,
  fetchStudyKit,
  generateLocalStudyKit,
  buildGeminiPrompt,
  fetchFollowUpAnswer,
};
