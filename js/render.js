/**
 * ==========================================================================
 * AI Study Assistant - DOM Rendering Service
 * Renders structured study kits: Summary, Quiz with option locking & score,
 * and interactive 3D flip Flashcards.
 * ==========================================================================
 */

/**
 * Hard-coded fake AI response object representing synthesized study material.
 * Used for testing and initial UI demonstrations.
 */
const FAKE_AI_RESPONSE = {
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
      term: "Wavefunction",
      definition: "A mathematical function (Ψ) that completely characterizes the quantum state of a particle or system."
    },
    {
      term: "Superposition",
      definition: "A principle where a quantum system can exist in multiple distinct states concurrently until measured."
    },
    {
      term: "Photoelectric Effect",
      definition: "The emission of electrons from a material when illuminated by photons with energy above the work function."
    },
    {
      term: "Uncertainty Principle",
      definition: "Heisenberg's theorem establishing that conjugate physical variables cannot both be determined with infinite accuracy."
    },
    {
      term: "Photon",
      definition: "An elementary particle and quantum packet of electromagnetic radiation with zero rest mass."
    }
  ]
};

/**
 * Primary coordinator: renders summary, quiz, flashcards, glossary, outline, and quiz progress into DOM containers.
 * @param {Object} studyKit - Study kit object { summary, quiz, flashcards, glossary, outline }
 * @param {string} [sessionId=''] - Unique history session ID for tracking card mastery
 * @param {Object} [meta={}] - Session metadata { topicTitle, difficulty }
 */
function renderStudyKit(studyKit = FAKE_AI_RESPONSE, sessionId = '', meta = {}) {
  if (!studyKit || typeof studyKit !== 'object') {
    console.error('render.js: Invalid studyKit passed to renderStudyKit', studyKit);
    return;
  }

  // Update active session subtitle in top navbar
  const sessionBannerEl = document.getElementById('active-session-title');
  if (sessionBannerEl) {
    const topicTitle = meta.topicTitle || studyKit.title || 'Quantum Mechanics';
    sessionBannerEl.textContent = topicTitle;
  }

  const summaryEl = document.getElementById('summary-content');
  const quizEl = document.getElementById('quiz-content');
  const flashcardsEl = document.getElementById('flashcards-content');
  const glossaryEl = document.getElementById('glossary-content');
  const outlineEl = document.getElementById('outline-content');
  const outlineTabBtn = document.getElementById('tab-outline-btn');
  const progressEl = document.getElementById('quiz-progress-section');

  if (summaryEl && studyKit.summary) {
    renderSummary(studyKit.summary, summaryEl);
  }

  if (quizEl && Array.isArray(studyKit.quiz)) {
    renderQuiz(studyKit.quiz, quizEl, meta);
  }

  if (flashcardsEl && Array.isArray(studyKit.flashcards)) {
    renderFlashcards(studyKit.flashcards, flashcardsEl, sessionId);
  }

  if (glossaryEl && Array.isArray(studyKit.glossary)) {
    renderGlossary(studyKit.glossary, glossaryEl);
  }

  if (outlineEl && Array.isArray(studyKit.outline) && studyKit.outline.length > 0) {
    if (outlineTabBtn) outlineTabBtn.classList.remove('hidden');
    renderOutline(studyKit.outline, outlineEl);
  } else if (outlineTabBtn) {
    // If no outline present, keep tab hidden gracefully
    outlineTabBtn.classList.add('hidden');
  }

  if (progressEl) {
    renderQuizProgress(progressEl);
  }
}

/**
 * Formats and renders the AI study summary into the summary container.
 * @param {string} summaryText - Markdown / structured summary text
 * @param {HTMLElement} container - DOM container element
 */
function renderSummary(summaryText, container) {
  // Convert basic markdown markers into HTML sections
  const paragraphs = summaryText
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  let formattedHtml = '<article class="summary-rendered-article">';

  paragraphs.forEach((block) => {
    if (block.startsWith('###')) {
      const heading = block.replace(/^###\s*/, '');
      formattedHtml += `
        <div class="summary-section-block">
          <h4 class="summary-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            ${heading}
          </h4>
        </div>
      `;
    } else if (block.includes('\n- ') || block.startsWith('- ')) {
      const items = block
        .split('\n')
        .map((line) => line.replace(/^-\s*/, '').trim())
        .filter(Boolean);

      formattedHtml += '<ul class="summary-list">';
      items.forEach((item) => {
        // Simple bold parser: **text** -> <strong>text</strong>
        const parsedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedHtml += `
          <li class="summary-list-item">
            <span class="summary-list-bullet" aria-hidden="true"></span>
            <span>${parsedItem}</span>
          </li>
        `;
      });
      formattedHtml += '</ul>';
    } else {
      const parsedBlock = block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formattedHtml += `<p class="summary-paragraph">${parsedBlock}</p>`;
    }
  });

  formattedHtml += '</article>';
  container.innerHTML = formattedHtml;
}

// Global active quiz timer interval reference for timer leak prevention
let activeQuizTimerInterval = null;

/**
 * Clears and resets any active quiz timer interval to prevent memory/timer leaks.
 */
function cleanupQuizTimers() {
  if (activeQuizTimerInterval) {
    clearInterval(activeQuizTimerInterval);
    activeQuizTimerInterval = null;
  }
}

/**
 * Renders interactive quiz questions with optional timed quiz mode (30s per question).
 * Handles option selection, countdown timer per question, visual feedback,
 * auto-locking as wrong on timeout, and score tracking.
 *
 * @param {Array<Object>} quizQuestions - Question items with options and answer index
 * @param {HTMLElement} container - DOM container element
 * @param {Object} [meta={}] - Session metadata { topicTitle, difficulty }
 */
function renderQuiz(quizQuestions, container, meta = {}) {
  // Always clean up any previous timers before rendering
  cleanupQuizTimers();

  let score = 0;
  let answeredCount = 0;
  let hasRecordedScore = false;
  const total = quizQuestions.length;
  const userAnswers = [];

  container.innerHTML = '';

  // 1. Root quiz container
  const wrapper = document.createElement('div');
  wrapper.className = 'quiz-rendered-wrapper';

  // Check if timed quiz is enabled
  const timedCheckbox = document.getElementById('timed-quiz-checkbox');
  let isTimedMode = timedCheckbox ? timedCheckbox.checked : false;

  // 2. Score Banner with Shuffle Buttons
  const scoreBanner = document.createElement('div');
  scoreBanner.className = 'quiz-score-banner';
  scoreBanner.innerHTML = `
    <div class="quiz-score-info">
      <span class="quiz-score-badge" id="quiz-live-score">Score: 0 / ${total}</span>
      <span class="quiz-score-label" id="quiz-progress-label">0 of ${total} answered</span>
    </div>
    <div class="quiz-banner-toolbar">
      <button type="button" class="btn-quiz-shuffle" id="quiz-shuffle-questions-btn" title="Shuffle questions order">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="16 3 21 3 21 8"></polyline>
          <line x1="4" y1="20" x2="21" y2="3"></line>
          <polyline points="21 16 21 21 16 21"></polyline>
          <line x1="15" y1="15" x2="21" y2="21"></line>
          <line x1="4" y1="4" x2="9" y2="9"></line>
        </svg>
        <span>Shuffle Questions</span>
      </button>
      <button type="button" class="btn-quiz-shuffle" id="quiz-shuffle-options-btn" title="Shuffle answer choices (keeps correct answer mapped)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        <span>Shuffle Options</span>
      </button>
      <span class="status-indicator" id="quiz-mode-indicator">${isTimedMode ? 'Timed Practice (30s)' : 'Practice Mode'}</span>
    </div>
  `;
  wrapper.appendChild(scoreBanner);

  // Wire Shuffle Questions click handler
  const shuffleQBtn = scoreBanner.querySelector('#quiz-shuffle-questions-btn');
  if (shuffleQBtn) {
    shuffleQBtn.addEventListener('click', () => {
      if (window.StudyUtils && window.StudyUtils.shuffleArray) {
        const shuffledQuestions = window.StudyUtils.shuffleArray(quizQuestions);
        renderQuiz(shuffledQuestions, container, meta);
      }
    });
  }

  // Wire Shuffle Options click handler (keeps correct answer index mapped)
  const shuffleOptBtn = scoreBanner.querySelector('#quiz-shuffle-options-btn');
  if (shuffleOptBtn) {
    shuffleOptBtn.addEventListener('click', () => {
      if (window.StudyUtils && window.StudyUtils.shuffleQuestionOptions) {
        const shuffledOptQuestions = quizQuestions.map((q) => window.StudyUtils.shuffleQuestionOptions(q));
        renderQuiz(shuffledOptQuestions, container, meta);
      }
    });
  }

  // 3. Final Score Container (populated once all questions answered)
  const finalCelebrationBox = document.createElement('div');
  finalCelebrationBox.id = 'quiz-final-box';
  finalCelebrationBox.className = 'quiz-final-celebration hidden';
  wrapper.appendChild(finalCelebrationBox);

  // 4. Questions List
  const cardsList = document.createElement('div');
  cardsList.className = 'quiz-cards-list';

  const questionCards = [];

  quizQuestions.forEach((item, qIndex) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.id = `quiz-card-${qIndex}`;

    // Question Header with number, status pill, and copy button
    const cardHeader = document.createElement('div');
    cardHeader.className = 'quiz-card-header';
    cardHeader.innerHTML = `
      <div class="quiz-card-header-left">
        <span class="quiz-question-number">Question ${qIndex + 1} of ${total}</span>
        <span class="quiz-status-pill pending" id="pill-${qIndex}">Unanswered</span>
      </div>
      <button type="button" class="btn-copy-question action-btn-xs" title="Copy question and options" aria-label="Copy question ${qIndex + 1}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span>Copy</span>
      </button>
    `;
    card.appendChild(cardHeader);

    // Bind copy handler for this quiz question
    const copyQBtn = cardHeader.querySelector('.btn-copy-question');
    if (copyQBtn) {
      copyQBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const letters = ['A', 'B', 'C', 'D'];
        const optionsText = item.options.map((opt, i) => `${letters[i] || i + 1}) ${opt}`).join('\n');
        const textToCopy = `Question ${qIndex + 1}: ${item.question}\n\nOptions:\n${optionsText}\n\nCorrect Answer: ${letters[item.answer] || ''}) ${item.options[item.answer]}\nExplanation: ${item.explanation || ''}`;
        if (window.StudyUtils && window.StudyUtils.copyToClipboard) {
          const ok = await window.StudyUtils.copyToClipboard(textToCopy);
          if (ok && window.StudyUtils.showToast) {
            window.StudyUtils.showToast(`Quiz question #${qIndex + 1} copied!`, 'success');
          }
        }
      });
    }

    // Question Prompt
    const questionTitle = document.createElement('h4');
    questionTitle.className = 'quiz-question-text';
    questionTitle.textContent = item.question;
    card.appendChild(questionTitle);

    // Options Grid
    const optionsGrid = document.createElement('div');
    optionsGrid.className = 'quiz-options-grid';

    const optionLetters = ['A', 'B', 'C', 'D'];
    const optionButtons = [];

    item.options.forEach((optText, optIndex) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="option-letter-badge">${optionLetters[optIndex]}</span>
        <span class="option-text">${optText}</span>
      `;

      // Click handler: locks question and displays correct/wrong feedback
      btn.addEventListener('click', () => {
        cleanupQuizTimers();
        const cardObj = questionCards[qIndex];
        if (cardObj) cardObj.isAnswered = true;

        // Record user answer for review mistakes and retry
        userAnswers[qIndex] = {
          question: item.question,
          options: [...item.options],
          answer: item.answer,
          userSelected: optIndex,
          userAnswerText: item.options[optIndex],
          correctAnswerText: item.options[item.answer],
          isCorrect: optIndex === item.answer,
          explanation: item.explanation,
        };

        handleOptionSelect({
          selectedIndex: optIndex,
          correctIndex: item.answer,
          explanation: item.explanation,
          selectedBtn: btn,
          allButtons: optionButtons,
          cardEl: card,
          pillEl: cardHeader.querySelector(`#pill-${qIndex}`),
          onAnswered: (isCorrect) => {
            if (isCorrect) score += 1;
            answeredCount += 1;
            updateQuizScoreUI(score, answeredCount, total, scoreBanner, finalCelebrationBox);

            if (answeredCount === total) {
              finishQuiz();
            } else if (isTimedMode) {
              // Move on to next question in timed mode
              const nextIdx = findNextUnanswered(qIndex);
              if (nextIdx !== -1) {
                questionCards[nextIdx].card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                startQuestionTimer(nextIdx);
              }
            }
          }
        });
      });

      optionButtons.push(btn);
      optionsGrid.appendChild(btn);
    });

    card.appendChild(optionsGrid);
    cardsList.appendChild(card);

    questionCards.push({
      card,
      cardHeader,
      questionTitle,
      pillEl: cardHeader.querySelector(`#pill-${qIndex}`),
      optionButtons,
      item,
      qIndex,
      isAnswered: false,
    });
  });

  wrapper.appendChild(cardsList);
  container.appendChild(wrapper);

  /**
   * Finds the next unanswered question index.
   * @param {number} fromIndex - Index to search after
   * @returns {number} Next unanswered index or -1 if all answered
   */
  function findNextUnanswered(fromIndex = -1) {
    for (let i = fromIndex + 1; i < questionCards.length; i++) {
      if (!questionCards[i].isAnswered) return i;
    }
    for (let i = 0; i <= fromIndex; i++) {
      if (!questionCards[i].isAnswered) return i;
    }
    return -1;
  }

  /**
   * Starts a 30-second countdown timer on the specified question card.
   * Shows a shrinking bar that turns red in the last 5 seconds.
   * Auto-locks question as wrong and moves on when time runs out.
   * @param {number} qIdx - Target question index
   */
  function startQuestionTimer(qIdx) {
    cleanupQuizTimers();
    if (!isTimedMode || qIdx < 0 || qIdx >= total) return;
    const cardObj = questionCards[qIdx];
    if (!cardObj || cardObj.isAnswered) return;

    // Clean up any existing timer bars
    questionCards.forEach((c) => {
      const oldBar = c.card.querySelector('.quiz-timer-bar-wrapper');
      if (oldBar) oldBar.remove();
    });

    const timerWrapper = document.createElement('div');
    timerWrapper.className = 'quiz-timer-bar-wrapper';
    timerWrapper.id = `quiz-timer-wrapper-${qIdx}`;
    timerWrapper.innerHTML = `
      <div class="quiz-timer-header">
        <span class="quiz-timer-badge" id="timer-badge-${qIdx}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="timer-clock-icon" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span class="timer-countdown-text" id="timer-sec-${qIdx}">30s remaining</span>
        </span>
        <span class="timer-hint">Auto-locks when time runs out</span>
      </div>
      <div class="quiz-timer-track" role="progressbar" aria-valuemin="0" aria-valuemax="30" aria-valuenow="30">
        <div class="quiz-timer-progress-bar" id="timer-bar-${qIdx}" style="width: 100%;"></div>
      </div>
    `;

    cardObj.card.insertBefore(timerWrapper, cardObj.questionTitle);

    const barEl = timerWrapper.querySelector(`#timer-bar-${qIdx}`);
    const badgeEl = timerWrapper.querySelector(`#timer-badge-${qIdx}`);
    const textEl = timerWrapper.querySelector(`#timer-sec-${qIdx}`);

    const durationMs = 30000;
    const startTime = Date.now();

    activeQuizTimerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingMs = Math.max(0, durationMs - elapsed);
      const remainingSec = Math.ceil(remainingMs / 1000);
      const pct = (remainingMs / durationMs) * 100;

      if (barEl) barEl.style.width = `${pct}%`;
      if (textEl) textEl.textContent = `${remainingSec}s remaining`;

      // Turn red in the last 5 seconds
      if (remainingSec <= 5) {
        if (barEl) barEl.classList.add('timer-critical');
        if (badgeEl) badgeEl.classList.add('timer-critical');
      }

      // Time ran out: lock question as wrong and move on
      if (remainingMs <= 0) {
        cleanupQuizTimers();
        onQuestionTimeout(qIdx);
      }
    }, 100);
  }

  /**
   * Handles timeout when 30 seconds expires on a question.
   * Locks the question as wrong, shows correct answer and explanation, and moves on.
   * @param {number} qIdx - Index of question that timed out
   */
  function onQuestionTimeout(qIdx) {
    const cardObj = questionCards[qIdx];
    if (!cardObj || cardObj.isAnswered) return;

    cardObj.isAnswered = true;

    // 1. Lock all option buttons as wrong
    cardObj.optionButtons.forEach((btn) => {
      btn.disabled = true;
    });
    cardObj.card.classList.add('answered');

    // 2. Mark status pill
    cardObj.pillEl.textContent = 'Time Expired';
    cardObj.pillEl.className = 'quiz-status-pill wrong';

    // 3. Highlight the correct option
    if (cardObj.optionButtons[cardObj.item.answer]) {
      cardObj.optionButtons[cardObj.item.answer].classList.add('correct');
    }

    // 4. Reveal explanation under the question
    const explanationText = cardObj.item.explanation ? cardObj.item.explanation.trim() : 'Correct answer explanation.';
    const safeExplanation = window.StudyUtils && window.StudyUtils.escapeHtml ? window.StudyUtils.escapeHtml(explanationText) : explanationText;
    const explanationBox = document.createElement('div');
    explanationBox.className = 'quiz-explanation-box';
    explanationBox.innerHTML = `<strong>Time expired!</strong> ${safeExplanation}`;
    cardObj.card.appendChild(explanationBox);

    // 5. Update timer badge
    const badgeEl = cardObj.card.querySelector(`#timer-badge-${qIdx}`);
    const barEl = cardObj.card.querySelector(`#timer-bar-${qIdx}`);
    if (badgeEl) {
      badgeEl.classList.add('timer-critical');
      badgeEl.innerHTML = `<span>⏱️ Time Expired</span>`;
    }
    if (barEl) {
      barEl.style.width = '0%';
      barEl.classList.add('timer-critical');
    }

    // Record timeout mistake for review mistakes and retry
    userAnswers[qIdx] = {
      question: cardObj.item.question,
      options: [...cardObj.item.options],
      answer: cardObj.item.answer,
      userSelected: -1,
      userAnswerText: 'Time expired (No option selected)',
      correctAnswerText: cardObj.item.options[cardObj.item.answer],
      isCorrect: false,
      explanation: cardObj.item.explanation,
    };

    answeredCount += 1;
    updateQuizScoreUI(score, answeredCount, total, scoreBanner, finalCelebrationBox);

    // 6. Check if quiz completed or move on
    if (answeredCount === total) {
      finishQuiz();
    } else {
      const nextIdx = findNextUnanswered(qIdx);
      if (nextIdx !== -1) {
        questionCards[nextIdx].card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        startQuestionTimer(nextIdx);
      }
    }
  }

  /**
   * Finalizes completed quiz, records score in localStorage, and clears all timers.
   * Shows the Review Mistakes section with Retry Wrong Ones button if any were wrong.
   */
  function finishQuiz() {
    cleanupQuizTimers();
    if (!hasRecordedScore) {
      hasRecordedScore = true;
      const quizRecord = {
        date: new Date().toISOString(),
        topicTitle: meta.topicTitle || 'Study Session Quiz',
        score: score,
        total: total,
        difficulty: meta.difficulty || 'medium',
      };
      if (window.StudyStorage && window.StudyStorage.saveQuizScore) {
        window.StudyStorage.saveQuizScore(quizRecord);
      }
      const progressEl = document.getElementById('quiz-progress-section');
      if (progressEl) {
        renderQuizProgress(progressEl);
      }
    }

    renderMistakesReview();
  }

  /**
   * Renders the "Review mistakes" section listing only wrong questions with
   * user's answer, correct answer, explanation, and "Retry wrong ones" button.
   */
  function renderMistakesReview() {
    const existingSection = wrapper.querySelector('#quiz-review-mistakes');
    if (existingSection) existingSection.remove();

    const mistakes = userAnswers.filter((ans) => !ans.isCorrect);

    if (mistakes.length === 0) {
      const perfectBanner = document.createElement('div');
      perfectBanner.id = 'quiz-review-mistakes';
      perfectBanner.className = 'quiz-perfect-score-banner';
      perfectBanner.innerHTML = `<span>🌟 Perfect Score! All ${total} questions answered correctly. No mistakes to review!</span>`;
      wrapper.appendChild(perfectBanner);
      return;
    }

    const escapeFn = (window.StudyUtils && window.StudyUtils.escapeHtml) || ((s) => s);

    const mistakesContainer = document.createElement('div');
    mistakesContainer.id = 'quiz-review-mistakes';
    mistakesContainer.className = 'quiz-mistakes-section';

    mistakesContainer.innerHTML = `
      <div class="mistakes-header">
        <div class="mistakes-title-wrap">
          <h4 class="mistakes-title">
            <svg class="mistakes-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Review Mistakes (${mistakes.length} Question${mistakes.length > 1 ? 's' : ''})</span>
          </h4>
          <p class="mistakes-subtitle">Review questions answered incorrectly and explanations before retrying.</p>
        </div>
        <button type="button" class="btn btn-sm btn-retry-wrong" id="retry-wrong-btn" title="Retry only the questions you missed">
          <svg class="icon btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
          <span>Retry wrong ones (${mistakes.length})</span>
        </button>
      </div>
      <div class="mistakes-cards-list">
        ${mistakes.map((m, mIdx) => `
          <div class="mistake-card">
            <h5 class="mistake-card-question">${mIdx + 1}. ${escapeFn(m.question)}</h5>
            <div class="mistake-comparison-grid">
              <div class="mistake-comparison-item user-wrong">
                <span class="comparison-label">Your answer:</span>
                <span class="comparison-val">${escapeFn(m.userAnswerText)}</span>
              </div>
              <div class="mistake-comparison-item correct-answer">
                <span class="comparison-label">Correct answer:</span>
                <span class="comparison-val">${escapeFn(m.correctAnswerText)}</span>
              </div>
            </div>
            <div class="mistake-card-explanation">
              <strong>Explanation:</strong> ${escapeFn(m.explanation || 'No explanation provided.')}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    wrapper.appendChild(mistakesContainer);

    // Bind "Retry wrong ones" button
    const retryBtn = mistakesContainer.querySelector('#retry-wrong-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        const wrongQuestionsOnly = mistakes.map((m) => ({
          question: m.question,
          options: [...m.options],
          answer: m.answer,
          explanation: m.explanation,
        }));
        renderQuiz(wrongQuestionsOnly, container, {
          ...meta,
          topicTitle: `${meta.topicTitle || 'Quiz'} (Retry Mistakes)`,
        });
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  // Bind checkbox toggle change to dynamically start or cancel timer
  if (timedCheckbox) {
    timedCheckbox.onchange = () => {
      isTimedMode = timedCheckbox.checked;
      const indicator = document.getElementById('quiz-mode-indicator');
      if (indicator) {
        indicator.textContent = isTimedMode ? 'Timed Practice (30s)' : 'Practice Mode';
      }

      if (isTimedMode) {
        const nextIdx = findNextUnanswered(-1);
        if (nextIdx !== -1) {
          questionCards[nextIdx].card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          startQuestionTimer(nextIdx);
        }
      } else {
        cleanupQuizTimers();
        questionCards.forEach((c) => {
          const oldBar = c.card.querySelector('.quiz-timer-bar-wrapper');
          if (oldBar) oldBar.remove();
        });
      }
    };
  }

  // Start Question 0 timer if Timed mode is active
  if (isTimedMode && total > 0) {
    startQuestionTimer(0);
  }
}

/**
 * Handles option selection for a single question.
 * Disables (locks) all options for that question, applies correct/wrong styles,
 * and reveals explanation.
 */
function handleOptionSelect(params) {
  const { selectedIndex, correctIndex, explanation, selectedBtn, allButtons, cardEl, pillEl, onAnswered } = params;

  // 1. Lock all option buttons for this question (cannot be answered twice)
  allButtons.forEach((button) => {
    button.disabled = true;
  });

  cardEl.classList.add('answered');

  const isCorrect = selectedIndex === correctIndex;

  // 2. Visual feedback on buttons
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    pillEl.textContent = 'Correct';
    pillEl.className = 'quiz-status-pill correct';
  } else {
    selectedBtn.classList.add('wrong');
    // Highlight the correct option as well
    if (allButtons[correctIndex]) {
      allButtons[correctIndex].classList.add('correct');
    }
    pillEl.textContent = 'Incorrect';
    pillEl.className = 'quiz-status-pill wrong';
  }

  // 3. Reveal Explanation Box under the question
  const explanationText = explanation ? explanation.trim() : 'Correct answer explanation.';
  const safeExplanation = window.StudyUtils && window.StudyUtils.escapeHtml ? window.StudyUtils.escapeHtml(explanationText) : explanationText;
  const explanationBox = document.createElement('div');
  explanationBox.className = 'quiz-explanation-box';
  explanationBox.innerHTML = `<strong>Explanation:</strong> ${safeExplanation}`;
  cardEl.appendChild(explanationBox);

  // 4. Trigger score tally callback
  onAnswered(isCorrect);
}

/**
 * Updates live score banner and displays final celebratory banner when all questions are answered.
 */
function updateQuizScoreUI(score, answeredCount, total, bannerEl, finalBoxEl) {
  const liveScoreEl = bannerEl.querySelector('#quiz-live-score');
  const progressLabelEl = bannerEl.querySelector('#quiz-progress-label');

  if (liveScoreEl) {
    liveScoreEl.textContent = `Score: ${score} / ${total}`;
  }

  if (progressLabelEl) {
    progressLabelEl.textContent = `${answeredCount} of ${total} answered`;
  }

  // If all 5 questions answered, show final score summary
  if (answeredCount === total) {
    const percentage = Math.round((score / total) * 100);
    finalBoxEl.classList.remove('hidden');
    finalBoxEl.innerHTML = `
      <div>
        <strong>Quiz Completed!</strong> Final Score: ${score} / ${total} (${percentage}%)
      </div>
      <span>${percentage >= 80 ? 'Mastery Achieved! 🌟' : 'Good Effort! Keep Reviewing 📚'}</span>
    `;
  }
}

/**
 * Renders flashcards with CSS 3D flip card animation, mastery tracking,
 * Known and Not known buttons under each card, counter ("You know X of Y cards"),
 * progress bar, and "Reset progress" button with localStorage persistence.
 *
 * @param {Array<Object>} flashcards - Array of { front, back }
 * @param {HTMLElement} container - DOM container element
 * @param {string} [sessionId=''] - Unique history item / session identifier
 */
function renderFlashcards(flashcards, container, sessionId = '') {
  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'flashcards-rendered-wrapper';

  const totalCards = flashcards.length;

  // Retrieve saved mastery state from localStorage for this specific session
  const savedMastery = window.StudyStorage.getFlashcardMastery(sessionId) || {};
  const cardMastery = new Map();
  Object.keys(savedMastery).forEach((key) => {
    const idx = parseInt(key, 10);
    if (!isNaN(idx) && idx >= 0 && idx < totalCards) {
      cardMastery.set(idx, savedMastery[key]);
    }
  });

  // 1. Toolbar with Counter, Progress Bar, Shuffle, Unknown Filter, and Reset button
  const toolbar = document.createElement('div');
  toolbar.className = 'flashcards-toolbar';
  toolbar.innerHTML = `
    <div class="fc-progress-section">
      <div class="fc-progress-meta">
        <span class="fc-counter-text" id="fc-counter-text">You know 0 of ${totalCards} cards</span>
        <span class="fc-progress-pct" id="fc-progress-pct">0%</span>
      </div>
      <div class="fc-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${totalCards}" aria-valuenow="0" aria-label="Flashcard mastery progress">
        <div class="fc-progress-fill" id="fc-progress-fill" style="width: 0%"></div>
      </div>
      <!-- Leitner 3-Box Stats Chips -->
      <div class="fc-srs-boxes-bar" id="fc-srs-boxes-bar">
        <span class="srs-box-chip srs-chip-1" title="Box 1: Challenging / Reviewed most often">Box 1: <strong id="srs-count-box1">0</strong></span>
        <span class="srs-box-chip srs-chip-2" title="Box 2: Familiar / Moderate interval">Box 2: <strong id="srs-count-box2">0</strong></span>
        <span class="srs-box-chip srs-chip-3" title="Box 3: Mastered / Longest interval">Box 3: <strong id="srs-count-box3">0</strong></span>
      </div>
    </div>
    <div class="fc-toolbar-actions">
      <!-- Leitner SRS Review Due Cards Button -->
      <button type="button" class="btn btn-sm btn-srs-review" id="fc-srs-review-btn" title="Review due cards using Leitner 3-box spaced repetition">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 14 14"></polyline>
        </svg>
        <span>Review due cards</span>
      </button>

      <!-- "Study only unknown cards" filter toggle -->
      <label class="fc-filter-toggle" for="fc-unknown-toggle" title="Filter to show only cards not yet marked as Known">
        <input type="checkbox" id="fc-unknown-toggle">
        <span class="timed-toggle-switch" aria-hidden="true"></span>
        <span class="fc-filter-label">Study only unknown cards</span>
      </label>

      <!-- Shuffle Flashcards Button -->
      <button type="button" class="btn btn-sm btn-shuffle-fc" id="fc-shuffle-btn" title="Shuffle flashcards order">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="16 3 21 3 21 8"></polyline>
          <line x1="4" y1="20" x2="21" y2="3"></line>
          <polyline points="21 16 21 21 16 21"></polyline>
          <line x1="15" y1="15" x2="21" y2="21"></line>
          <line x1="4" y1="4" x2="9" y2="9"></line>
        </svg>
        <span>Shuffle</span>
      </button>

      <!-- Reset Progress Button -->
      <button type="button" class="btn btn-sm btn-reset-progress" id="fc-reset-progress-btn" title="Reset all cards to unrated">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="1 4 1 10 7 10"></polyline>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
        </svg>
        <span>Reset progress</span>
      </button>
      <span class="fc-hint-text">Click card to flip ↺</span>
    </div>
  `;
  wrapper.appendChild(toolbar);

  const counterTextEl = toolbar.querySelector('#fc-counter-text');
  const progressPctEl = toolbar.querySelector('#fc-progress-pct');
  const progressFillEl = toolbar.querySelector('#fc-progress-fill');
  const progressTrackEl = toolbar.querySelector('.fc-progress-track');
  const resetBtn = toolbar.querySelector('#fc-reset-progress-btn');
  const shuffleBtn = toolbar.querySelector('#fc-shuffle-btn');
  const srsReviewBtn = toolbar.querySelector('#fc-srs-review-btn');
  const unknownFilterToggle = toolbar.querySelector('#fc-unknown-toggle');
  const srsCount1El = toolbar.querySelector('#srs-count-box1');
  const srsCount2El = toolbar.querySelector('#srs-count-box2');
  const srsCount3El = toolbar.querySelector('#srs-count-box3');

  /**
   * Updates SRS Leitner box counters in the toolbar.
   */
  function updateSrsBoxCounts() {
    if (window.StudySRS && typeof window.StudySRS.getBoxCounts === 'function') {
      const counts = window.StudySRS.getBoxCounts();
      if (srsCount1El) srsCount1El.textContent = counts.box1 || 0;
      if (srsCount2El) srsCount2El.textContent = counts.box2 || 0;
      if (srsCount3El) srsCount3El.textContent = counts.box3 || 0;
    }
  }

  /**
   * Recalculates mastery counts, updates progress bar & counter, and persists to localStorage.
   */
  function updateProgressUI(shouldSave = true) {
    let knownCount = 0;
    const masteryObj = {};

    cardMastery.forEach((status, idx) => {
      masteryObj[idx] = status;
      if (status === 'known') knownCount += 1;
    });

    const percentage = totalCards > 0 ? Math.round((knownCount / totalCards) * 100) : 0;

    if (counterTextEl) {
      counterTextEl.textContent = `You know ${knownCount} of ${totalCards} cards`;
    }

    if (progressPctEl) {
      progressPctEl.textContent = `${percentage}%`;
    }

    if (progressFillEl) {
      progressFillEl.style.width = `${percentage}%`;
    }

    if (progressTrackEl) {
      progressTrackEl.setAttribute('aria-valuenow', knownCount);
    }

    if (shouldSave) {
      window.StudyStorage.saveFlashcardMastery(sessionId, masteryObj);
    }

    updateSrsBoxCounts();
  }

  // Preserve cards list with original indices for correct mastery persistence across shuffles
  let currentCards = flashcards.map((c, i) => ({
    ...c,
    originalIndex: c.originalIndex !== undefined ? c.originalIndex : i,
  }));

  // 2. Flashcards Grid Container
  const grid = document.createElement('div');
  grid.className = 'flashcards-grid';
  wrapper.appendChild(grid);

  /**
   * Renders the cards into the grid, applying the unknown-only filter if toggled.
   */
  function renderCardsGrid() {
    grid.innerHTML = '';
    const unknownOnly = unknownFilterToggle ? unknownFilterToggle.checked : false;

    // Filter cards if "Study only unknown cards" is active
    const cardsToDisplay = unknownOnly
      ? currentCards.filter((c) => cardMastery.get(c.originalIndex) !== 'known')
      : currentCards;

    if (cardsToDisplay.length === 0 && unknownOnly) {
      const emptyState = document.createElement('div');
      emptyState.className = 'fc-empty-state';
      emptyState.innerHTML = `
        <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🎉</div>
        <div>All cards marked as Known! Great work.</div>
        <div style="font-size: 0.825rem; font-weight: normal; margin-top: 0.4rem; color: var(--text-secondary);">
          Toggle off "Study only unknown cards" to review all cards, or click "Reset progress".
        </div>
      `;
      grid.appendChild(emptyState);
      return;
    }

    cardsToDisplay.forEach((card, displayIndex) => {
      const originalIdx = card.originalIndex;
      const srsBox = window.StudySRS ? window.StudySRS.getCardBox(card) : 1;

      // Card container holding the 3D flipping card AND the action buttons under it
      const cardContainer = document.createElement('div');
      cardContainer.className = 'flashcard-card-container';
      cardContainer.id = `fc-container-${originalIdx}`;

      // 3D Flip Card
      const cardEl = document.createElement('div');
      cardEl.className = 'flashcard-item';
      cardEl.id = `fc-item-${originalIdx}`;
      cardEl.setAttribute('tabindex', '0');
      cardEl.setAttribute('role', 'button');
      cardEl.setAttribute('aria-label', `Flashcard ${displayIndex + 1}: ${card.front}. Click or press Enter to flip.`);

      cardEl.innerHTML = `
        <div class="flashcard-inner">
          <!-- Front Side -->
          <div class="flashcard-face flashcard-front">
            <div class="flashcard-meta">
              <span class="flashcard-tag">Term / Question</span>
              <div class="flashcard-meta-right">
                <span class="fc-srs-box-badge srs-box-${srsBox}" id="fc-srs-front-${originalIdx}">Box ${srsBox}</span>
                <span class="fc-green-badge hidden" id="fc-badge-front-${originalIdx}">✓ Known</span>
                <span class="flashcard-number">${displayIndex + 1} of ${cardsToDisplay.length}</span>
              </div>
            </div>
            <p class="flashcard-prompt-text">${card.front}</p>
            <div class="flashcard-hint">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              <span>Click to flip</span>
            </div>
          </div>

          <!-- Back Side -->
          <div class="flashcard-face flashcard-back">
            <div class="flashcard-meta">
              <span class="flashcard-tag">Explanation / Answer</span>
              <div class="flashcard-meta-right">
                <span class="fc-srs-box-badge srs-box-${srsBox}" id="fc-srs-back-${originalIdx}">Box ${srsBox}</span>
                <span class="fc-green-badge hidden" id="fc-badge-back-${originalIdx}">✓ Known</span>
                <span class="flashcard-number">${displayIndex + 1} of ${cardsToDisplay.length}</span>
              </div>
            </div>
            <p class="flashcard-answer-text">${card.back}</p>
            <div class="flashcard-hint">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              <span>Click to flip</span>
            </div>
          </div>
        </div>
      `;

      // 3D Flip Handlers (click or Enter/Space)
      cardEl.addEventListener('click', () => {
        cardEl.classList.toggle('is-flipped');
      });

      cardEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          cardEl.classList.toggle('is-flipped');
        }
      });

      // Action buttons placed UNDER each card
      const actionsEl = document.createElement('div');
      actionsEl.className = 'flashcard-actions';
      actionsEl.setAttribute('role', 'group');
      actionsEl.setAttribute('aria-label', `Mark mastery for card ${displayIndex + 1}`);

      actionsEl.innerHTML = `
        <button type="button" class="fc-btn fc-btn-not-known" id="btn-not-known-${originalIdx}" title="Mark as not known / review needed (moves to Leitner Box 1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          <span>Not known</span>
        </button>
        <button type="button" class="fc-btn fc-btn-known" id="btn-known-${originalIdx}" title="Mark as known / mastered (promotes to next Leitner Box)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Known</span>
        </button>
        <button type="button" class="fc-btn fc-btn-copy" id="btn-copy-card-${originalIdx}" title="Copy flashcard front and back" aria-label="Copy card ${displayIndex + 1}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        </button>
      `;

      const btnKnown = actionsEl.querySelector(`#btn-known-${originalIdx}`);
      const btnNotKnown = actionsEl.querySelector(`#btn-not-known-${originalIdx}`);
      const btnCopyCard = actionsEl.querySelector(`#btn-copy-card-${originalIdx}`);
      const badgeFront = cardEl.querySelector(`#fc-badge-front-${originalIdx}`);
      const badgeBack = cardEl.querySelector(`#fc-badge-back-${originalIdx}`);
      const srsBadgeFront = cardEl.querySelector(`#fc-srs-front-${originalIdx}`);
      const srsBadgeBack = cardEl.querySelector(`#fc-srs-back-${originalIdx}`);

      // Copy handler for single flashcard
      if (btnCopyCard) {
        btnCopyCard.addEventListener('click', async (e) => {
          e.stopPropagation();
          const textToCopy = `Front: ${card.front}\nBack: ${card.back}`;
          if (window.StudyUtils && window.StudyUtils.copyToClipboard) {
            const ok = await window.StudyUtils.copyToClipboard(textToCopy);
            if (ok && window.StudyUtils.showToast) {
              window.StudyUtils.showToast(`Flashcard #${displayIndex + 1} copied!`, 'success');
            }
          }
        });
      }

      /**
       * Applies visual state to the card according to status ('known' | 'not-known' | null).
       */
      function applyCardVisualState(status) {
        if (status === 'known') {
          cardContainer.classList.add('card-known');
          cardContainer.classList.remove('card-not-known');
          cardEl.classList.add('card-known');
          cardEl.classList.remove('card-not-known');
          btnKnown.classList.add('active');
          btnNotKnown.classList.remove('active');
          if (badgeFront) badgeFront.classList.remove('hidden');
          if (badgeBack) badgeBack.classList.remove('hidden');
        } else if (status === 'not-known') {
          cardContainer.classList.add('card-not-known');
          cardContainer.classList.remove('card-known');
          cardEl.classList.add('card-not-known');
          cardEl.classList.remove('card-known');
          btnNotKnown.classList.add('active');
          btnKnown.classList.remove('active');
          if (badgeFront) badgeFront.classList.add('hidden');
          if (badgeBack) badgeBack.classList.add('hidden');
        } else {
          cardContainer.classList.remove('card-known', 'card-not-known');
          cardEl.classList.remove('card-known', 'card-not-known');
          btnKnown.classList.remove('active');
          btnNotKnown.classList.remove('active');
          if (badgeFront) badgeFront.classList.add('hidden');
          if (badgeBack) badgeBack.classList.add('hidden');
        }
      }

      // Initial visual state from saved mastery
      applyCardVisualState(cardMastery.get(originalIdx));

      // Attach button listeners (clicking buttons does not flip card)
      btnKnown.addEventListener('click', (e) => {
        e.stopPropagation();
        const current = cardMastery.get(originalIdx);
        const nextStatus = current === 'known' ? null : 'known';
        if (nextStatus) {
          cardMastery.set(originalIdx, nextStatus);
        } else {
          cardMastery.delete(originalIdx);
        }
        applyCardVisualState(nextStatus);

        // Promote in Leitner SRS
        if (window.StudySRS && window.StudySRS.promoteCard) {
          const newBox = window.StudySRS.promoteCard(card);
          if (srsBadgeFront) {
            srsBadgeFront.textContent = `Box ${newBox}`;
            srsBadgeFront.className = `fc-srs-box-badge srs-box-${newBox}`;
          }
          if (srsBadgeBack) {
            srsBadgeBack.textContent = `Box ${newBox}`;
            srsBadgeBack.className = `fc-srs-box-badge srs-box-${newBox}`;
          }
        }

        if (window.StudyStorage && window.StudyStorage.recordActivity) {
          window.StudyStorage.recordActivity();
        }

        updateProgressUI(true);

        // If unknown-only filter is active and card marked known, update grid view
        if (unknownOnly && nextStatus === 'known') {
          renderCardsGrid();
        }
      });

      btnNotKnown.addEventListener('click', (e) => {
        e.stopPropagation();
        const current = cardMastery.get(originalIdx);
        const nextStatus = current === 'not-known' ? null : 'not-known';
        if (nextStatus) {
          cardMastery.set(originalIdx, nextStatus);
        } else {
          cardMastery.delete(originalIdx);
        }
        applyCardVisualState(nextStatus);

        // Demote in Leitner SRS to Box 1
        if (window.StudySRS && window.StudySRS.demoteCard) {
          window.StudySRS.demoteCard(card);
          if (srsBadgeFront) {
            srsBadgeFront.textContent = `Box 1`;
            srsBadgeFront.className = `fc-srs-box-badge srs-box-1`;
          }
          if (srsBadgeBack) {
            srsBadgeBack.textContent = `Box 1`;
            srsBadgeBack.className = `fc-srs-box-badge srs-box-1`;
          }
        }

        if (window.StudyStorage && window.StudyStorage.recordActivity) {
          window.StudyStorage.recordActivity();
        }

        updateProgressUI(true);
      });

      // Assemble container: 3D card + buttons under it
      cardContainer.appendChild(cardEl);
      cardContainer.appendChild(actionsEl);
      grid.appendChild(cardContainer);
    });
  }

  // Initial Grid Render and SRS Counts
  renderCardsGrid();
  updateSrsBoxCounts();

  // Bind SRS Due Cards Review button
  if (srsReviewBtn) {
    srsReviewBtn.addEventListener('click', () => {
      if (window.StudySRS && window.StudySRS.buildWeightedReviewSession) {
        const weighted = window.StudySRS.buildWeightedReviewSession(flashcards);
        if (weighted && weighted.length > 0) {
          currentCards = weighted.map((c, i) => ({
            ...c,
            originalIndex: c.originalIndex !== undefined ? c.originalIndex : i,
          }));
          renderCardsGrid();
          if (window.StudyUtils && window.StudyUtils.showToast) {
            window.StudyUtils.showToast(`Loaded ${weighted.length} due cards via Leitner spaced repetition!`, 'info');
          }
        }
      }
    });
  }

  // Initial Grid Render
  renderCardsGrid();

  // Bind Shuffle Flashcards button
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      if (window.StudyUtils && window.StudyUtils.shuffleArray) {
        currentCards = window.StudyUtils.shuffleArray(currentCards);
        renderCardsGrid();
      }
    });
  }

  // Bind "Study only unknown cards" filter toggle
  if (unknownFilterToggle) {
    unknownFilterToggle.addEventListener('change', () => {
      renderCardsGrid();
    });
  }

  // Reset Progress Button Listener
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      cardMastery.clear();
      window.StudyStorage.clearFlashcardMastery(sessionId);
      updateProgressUI(false);
      renderCardsGrid();
    });
  }

  // Initial Progress UI calculation without re-saving
  updateProgressUI(false);

  wrapper.appendChild(grid);
  container.appendChild(wrapper);
}

/**
 * Renders the saved study history list with preview information,
 * difficulty badges, click-to-open handlers, and individual delete buttons.
 *
 * @param {Array<Object>} historyItems - List of past sessions [{ id, title, notes, difficulty, result, date }]
 * @param {HTMLElement} container - Target container (#history-list)
 * @param {Function} onSelect - Callback when a history card is clicked: (item) => void
 * @param {Function} onDelete - Callback when delete button is clicked: (id) => void
 * @param {boolean} [isFiltered=false] - Whether a search query or difficulty filter is currently active
 * @param {Function} [onResetFilters=null] - Callback when "Clear Search & Filters" button is clicked
 */
function renderHistory(historyItems, container, onSelect, onDelete, isFiltered = false, onResetFilters = null) {
  if (!container) return;

  container.innerHTML = '';

  if (!historyItems || historyItems.length === 0) {
    if (isFiltered) {
      container.innerHTML = `
        <div class="history-empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <p class="empty-title">No Matching Sessions Found</p>
          <p class="empty-subtitle">No saved study kits match your current search query or difficulty filter.</p>
          <button type="button" class="btn-reset-filter" id="reset-history-filter-btn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            <span>Clear Search & Filters</span>
          </button>
        </div>
      `;

      const resetBtn = container.querySelector('#reset-history-filter-btn');
      if (resetBtn && typeof onResetFilters === 'function') {
        resetBtn.addEventListener('click', onResetFilters);
      }
    } else {
      container.innerHTML = `
        <div class="history-empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
          </svg>
          <p class="empty-title">No Previous Study Sessions</p>
          <p class="empty-subtitle">Generated study kits are preserved automatically in your local browser storage for offline review.</p>
        </div>
      `;
    }
    return;
  }

  const escapeFn = window.StudyUtils?.escapeHtml || ((s) => s || '');
  const formatFn = window.StudyUtils?.formatDate || ((d) => d || '');

  historyItems.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'history-item-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open previous study session: ${item.title}`);

    const qCount = item.result?.quiz?.length || 5;
    const fCount = item.result?.flashcards?.length || 5;
    const snippet = item.notes ? item.notes.slice(0, 150) + (item.notes.length > 150 ? '...' : '') : 'No notes recorded.';
    const diff = (item.difficulty || item.result?.difficulty || 'medium').toLowerCase();
    const diffLabel = diff.charAt(0).toUpperCase() + diff.slice(1);
    const diffClass = `badge-${diff}`;

    card.innerHTML = `
      <div class="history-item-main">
        <div class="history-item-header">
          <h3 class="history-item-title">${escapeFn(item.title)}</h3>
          <span class="history-item-date">${formatFn(item.date)}</span>
        </div>
        <p class="history-item-preview">${escapeFn(snippet)}</p>
        <div class="history-item-badges">
          <span class="history-badge ${diffClass}">${escapeFn(diffLabel)}</span>
          <span class="history-badge">${qCount} Questions</span>
          <span class="history-badge">${fCount} Flashcards</span>
        </div>
      </div>
      <button type="button" class="history-item-delete-btn" title="Delete this session" aria-label="Delete session: ${escapeFn(item.title)}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    `;

    // Click handler for selecting/re-displaying the session
    card.addEventListener('click', (e) => {
      // Don't trigger if delete button was clicked
      if (e.target.closest('.history-item-delete-btn')) return;
      if (typeof onSelect === 'function') {
        onSelect(item);
      }
    });

    // Keyboard support for selecting
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('.history-item-delete-btn')) return;
        e.preventDefault();
        if (typeof onSelect === 'function') {
          onSelect(item);
        }
      }
    });

    // Delete button handler
    const deleteBtn = card.querySelector('.history-item-delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof onDelete === 'function') {
          onDelete(item.id);
        }
      });
    }

    container.appendChild(card);
  });
}

/**
 * Sanitizes strings for safe DOM HTML insertion.
 * @param {string} str
 * @returns {string} Sanitized string
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Renders the Quiz Progress section:
 * - Summary metrics (Average score, Best score, Total quizzes completed)
 * - Plain CSS bar chart visualizing the last 10 scores with hover details
 * - "Clear scores" button
 *
 * @param {HTMLElement} container - Target container element (#quiz-progress-section)
 */
function renderQuizProgress(container) {
  if (!container) return;
  container.innerHTML = '';

  const allScores = (window.StudyStorage && window.StudyStorage.getQuizScores)
    ? window.StudyStorage.getQuizScores()
    : [];

  const wrapper = document.createElement('div');
  wrapper.className = 'quiz-progress-card';

  const totalCount = allScores.length;
  let avgText = '—';
  let bestText = '—';

  if (totalCount > 0) {
    const avgPct = Math.round(
      allScores.reduce((sum, item) => sum + ((item.score / (item.total || 1)) * 100), 0) / totalCount
    );
    avgText = `${avgPct}%`;

    let bestItem = allScores[0];
    let bestRatio = bestItem.score / (bestItem.total || 1);
    allScores.forEach((item) => {
      const ratio = item.score / (item.total || 1);
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestItem = item;
      }
    });
    bestText = `${bestItem.score}/${bestItem.total} (${Math.round(bestRatio * 100)}%)`;
  }

  // Slice last 10 scores
  const last10 = allScores.slice(-10);

  // 1. Header with Title and "Clear scores" button
  const header = document.createElement('div');
  header.className = 'quiz-progress-header';
  header.innerHTML = `
    <div class="quiz-progress-title-group">
      <svg class="progress-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
      <div>
        <h4 class="quiz-progress-title">Quiz Progress & Score History</h4>
        <p class="quiz-progress-subtitle">Track your accuracy and performance over your last 10 quizzes</p>
      </div>
    </div>
    <button type="button" class="btn btn-sm btn-clear-scores" id="clear-scores-btn" title="Clear all recorded quiz scores" ${totalCount === 0 ? 'disabled' : ''}>
      <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
      <span>Clear scores</span>
    </button>
  `;
  wrapper.appendChild(header);

  // 2. Metrics summary grid
  const metricsGrid = document.createElement('div');
  metricsGrid.className = 'quiz-metrics-grid';
  metricsGrid.innerHTML = `
    <div class="quiz-metric-card">
      <span class="metric-label">Average Score</span>
      <span class="metric-value" id="quiz-metric-avg">${avgText}</span>
      <span class="metric-meta">${totalCount} ${totalCount === 1 ? 'quiz' : 'quizzes'} completed</span>
    </div>
    <div class="quiz-metric-card">
      <span class="metric-label">Best Score</span>
      <span class="metric-value" id="quiz-metric-best">${bestText}</span>
      <span class="metric-meta">Highest recorded</span>
    </div>
    <div class="quiz-metric-card">
      <span class="metric-label">Recent Quizzes</span>
      <span class="metric-value">${last10.length}</span>
      <span class="metric-meta">Showing last 10 in chart</span>
    </div>
  `;
  wrapper.appendChild(metricsGrid);

  // 3. Plain CSS Bar Chart
  const chartWrapper = document.createElement('div');
  chartWrapper.className = 'quiz-chart-container';

  if (last10.length === 0) {
    chartWrapper.innerHTML = `
      <div class="quiz-chart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>No quiz scores recorded yet. Complete a quiz above to track your progress over time!</p>
      </div>
    `;
  } else {
    const chart = document.createElement('div');
    chart.className = 'quiz-bar-chart';
    chart.setAttribute('role', 'img');
    chart.setAttribute('aria-label', `Bar chart of last ${last10.length} quiz scores`);

    // Guidelines for 100%, 75%, 50%, 25%, 0%
    const guidelines = document.createElement('div');
    guidelines.className = 'quiz-chart-guidelines';
    guidelines.innerHTML = `
      <div class="guideline-row" data-val="100%"><span>100%</span></div>
      <div class="guideline-row" data-val="75%"><span>75%</span></div>
      <div class="guideline-row" data-val="50%"><span>50%</span></div>
      <div class="guideline-row" data-val="25%"><span>25%</span></div>
      <div class="guideline-row" data-val="0%"><span>0%</span></div>
    `;
    chart.appendChild(guidelines);

    // Columns
    const columnsArea = document.createElement('div');
    columnsArea.className = 'quiz-chart-bars';

    last10.forEach((item, idx) => {
      const pct = Math.round((item.score / (item.total || 1)) * 100);
      const col = document.createElement('div');
      col.className = 'quiz-bar-col';

      let barClass = 'bar-mid';
      if (pct >= 80) barClass = 'bar-high';
      else if (pct < 60) barClass = 'bar-low';

      let dateLabel = '#' + (idx + 1);
      try {
        const d = new Date(item.date);
        if (!isNaN(d.getTime())) {
          dateLabel = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
      } catch (e) {}

      col.innerHTML = `
        <div class="bar-slot">
          <span class="bar-score-num">${item.score}/${item.total}</span>
          <div class="bar-pillar ${barClass}" style="height: ${Math.max(pct, 6)}%;" tabindex="0">
            <div class="bar-tooltip">
              <strong class="tooltip-topic">${escapeHtml(item.topicTitle)}</strong>
              <span class="tooltip-score">Score: ${item.score}/${item.total} (${pct}%)</span>
              <span class="tooltip-diff">Difficulty: ${(item.difficulty || 'medium').toUpperCase()}</span>
              <span class="tooltip-date">${dateLabel}</span>
            </div>
          </div>
        </div>
        <span class="bar-x-label" title="${dateLabel}">${dateLabel}</span>
      `;
      columnsArea.appendChild(col);
    });

    chart.appendChild(columnsArea);
    chartWrapper.appendChild(chart);
  }

  wrapper.appendChild(chartWrapper);
  container.appendChild(wrapper);

  // 4. Bind Clear Scores handler
  const clearBtn = wrapper.querySelector('#clear-scores-btn');
  if (clearBtn && totalCount > 0) {
    clearBtn.addEventListener('click', () => {
      const confirmed = window.confirm('Are you sure you want to clear your quiz score history?');
      if (confirmed) {
        if (window.StudyStorage && window.StudyStorage.clearQuizScores) {
          window.StudyStorage.clearQuizScores();
        }
        renderQuizProgress(container);
      }
    });
  }
}

/**
 * Renders the glossary of key terms and definitions into the glossary container.
 * Supports a real-time search filter and copy-to-clipboard button per term.
 *
 * @param {Array<Object>} glossaryItems - Array of { term, definition }
 * @param {HTMLElement} container - DOM container element (#glossary-content)
 */
function renderGlossary(glossaryItems, container) {
  if (!container) return;
  container.innerHTML = '';

  if (!Array.isArray(glossaryItems) || glossaryItems.length === 0) {
    container.innerHTML = `
      <div class="summary-card-placeholder">
        <div class="placeholder-icon-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        </div>
        <h4>No Glossary Terms Yet</h4>
        <p>Key terms and clear definitions generated from your notes will appear here.</p>
      </div>
    `;
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'glossary-rendered-wrapper';

  // Toolbar with Search and Count
  const toolbar = document.createElement('div');
  toolbar.className = 'glossary-toolbar';
  toolbar.innerHTML = `
    <div class="glossary-search-wrapper">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input type="search" class="glossary-search-input" placeholder="Search key terms and definitions..." aria-label="Search glossary terms">
    </div>
    <span class="glossary-count-badge">${glossaryItems.length} Terms</span>
  `;
  wrapper.appendChild(toolbar);

  // Cards Grid
  const grid = document.createElement('div');
  grid.className = 'glossary-grid';

  glossaryItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'glossary-card';
    card.setAttribute('data-term', (item.term || '').toLowerCase());
    card.setAttribute('data-def', (item.definition || '').toLowerCase());

    card.innerHTML = `
      <div class="glossary-card-header">
        <div class="glossary-term-group">
          <span class="glossary-term-badge">#${index + 1}</span>
          <h4 class="glossary-term-title">${escapeHtml(item.term)}</h4>
        </div>
        <button type="button" class="btn-copy-term action-btn-xs" title="Copy term and definition" aria-label="Copy ${escapeHtml(item.term)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span class="copy-text">Copy</span>
        </button>
      </div>
      <p class="glossary-term-def">${escapeHtml(item.definition)}</p>
    `;

    // Copy Handler
    const copyBtn = card.querySelector('.btn-copy-term');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const textToCopy = `${item.term}: ${item.definition}`;
        if (window.StudyUtils && window.StudyUtils.copyToClipboard) {
          const ok = await window.StudyUtils.copyToClipboard(textToCopy);
          if (ok) {
            const originalHtml = copyBtn.innerHTML;
            copyBtn.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Copied!</span>
            `;
            if (window.StudyUtils.showToast) {
              window.StudyUtils.showToast(`Copied "${item.term}" to clipboard!`, 'success');
            }
            setTimeout(() => {
              copyBtn.innerHTML = originalHtml;
            }, 1800);
          }
        }
      });
    }

    grid.appendChild(card);
  });

  wrapper.appendChild(grid);
  container.appendChild(wrapper);

  // Live filter search
  const searchInput = toolbar.querySelector('.glossary-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      const cards = grid.querySelectorAll('.glossary-card');
      let visibleCount = 0;
      cards.forEach((c) => {
        const term = c.getAttribute('data-term') || '';
        const def = c.getAttribute('data-def') || '';
        const matches = !q || term.includes(q) || def.includes(q);
        c.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });
      const badge = toolbar.querySelector('.glossary-count-badge');
      if (badge) {
        badge.textContent = q ? `${visibleCount} of ${glossaryItems.length}` : `${glossaryItems.length} Terms`;
      }
    });
  }
}

/**
 * Renders hierarchical collapsible outline tree (<details><summary>).
 * @param {Array<Object>} outline - Array of { title, children }
 * @param {HTMLElement} container - DOM container element
 */
function renderOutline(outline, container) {
  if (!container) return;
  container.innerHTML = '';

  if (!Array.isArray(outline) || outline.length === 0) {
    container.innerHTML = `
      <div class="summary-card-placeholder">
        <h4>No Outline Available</h4>
        <p>This study set does not include a hierarchical outline.</p>
      </div>
    `;
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'outline-rendered-wrapper';

  const header = document.createElement('div');
  header.className = 'outline-header-bar';
  header.innerHTML = `
    <div class="outline-header-info">
      <span class="outline-count-badge">${outline.length} Sections</span>
      <span class="outline-hint">Click sections to expand / collapse</span>
    </div>
    <div class="outline-header-actions">
      <button type="button" class="btn btn-sm btn-secondary" id="outline-expand-all-btn">Expand All</button>
      <button type="button" class="btn btn-sm btn-secondary" id="outline-collapse-all-btn">Collapse All</button>
    </div>
  `;
  wrapper.appendChild(header);

  const list = document.createElement('div');
  list.className = 'outline-list';

  outline.forEach((section, idx) => {
    const details = document.createElement('details');
    details.className = 'outline-item';
    details.open = idx === 0;

    const summary = document.createElement('summary');
    summary.className = 'outline-summary';
    const childrenCount = Array.isArray(section.children) ? section.children.length : 0;
    summary.innerHTML = `
      <div class="outline-summary-content">
        <svg class="outline-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span class="outline-section-title">${window.StudyUtils ? window.StudyUtils.escapeHtml(section.title) : section.title}</span>
      </div>
      <span class="outline-points-count">${childrenCount} points</span>
    `;

    const childrenList = document.createElement('ul');
    childrenList.className = 'outline-children';
    if (Array.isArray(section.children)) {
      section.children.forEach((child) => {
        const li = document.createElement('li');
        li.className = 'outline-child-item';
        const escaped = window.StudyUtils ? window.StudyUtils.escapeHtml(child) : child;
        li.innerHTML = `<span class="outline-bullet" aria-hidden="true">•</span><span>${escaped}</span>`;
        childrenList.appendChild(li);
      });
    }

    details.appendChild(summary);
    details.appendChild(childrenList);
    list.appendChild(details);
  });

  wrapper.appendChild(list);
  container.appendChild(wrapper);

  const expandBtn = header.querySelector('#outline-expand-all-btn');
  const collapseBtn = header.querySelector('#outline-collapse-all-btn');
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      wrapper.querySelectorAll('.outline-item').forEach((d) => (d.open = true));
    });
  }
  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      wrapper.querySelectorAll('.outline-item').forEach((d) => (d.open = false));
    });
  }
}

/**
 * Renders the live Dashboard view with streaks, study kit stats, and a CSS bar chart.
 * @param {HTMLElement} container
 */
function renderDashboard(container) {
  if (!container) return;
  const stats = window.StudyStorage.getDashboardStats();
  const streak = window.StudyStorage.getStreakData();

  container.innerHTML = `
    <div class="dashboard-wrapper">
      <div class="dashboard-hero">
        <div class="dashboard-hero-content">
          <span class="dashboard-greeting">Study Assistant Hub</span>
          <h2 class="dashboard-title">Learning & Performance Dashboard</h2>
          <p class="dashboard-subtitle">Monitor your study streak, quiz scores, and spaced repetition retention over time.</p>
        </div>
        <div class="streak-hero-card">
          <div class="streak-fire-icon" aria-hidden="true">🔥</div>
          <div class="streak-hero-info">
            <span class="streak-hero-count">${streak.currentStreak || 1} Days</span>
            <span class="streak-hero-label">Current Streak &bull; Best: ${streak.bestStreak || 1} Days</span>
          </div>
        </div>
      </div>

      <!-- 4-Card Metrics Grid -->
      <div class="dashboard-metrics-grid">
        <div class="metric-card">
          <div class="metric-icon-wrap metric-icon-packs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <div class="metric-content">
            <span class="metric-value">${stats.totalGenerations}</span>
            <span class="metric-label">Study Packs Generated</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-wrap metric-icon-quizzes">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div class="metric-content">
            <span class="metric-value">${stats.quizzesCompleted}</span>
            <span class="metric-label">Quizzes Completed</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-wrap metric-icon-score">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div class="metric-content">
            <span class="metric-value">${stats.averageScorePercent}%</span>
            <span class="metric-label">Average Quiz Score</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-wrap metric-icon-mastery">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <div class="metric-content">
            <span class="metric-value">${stats.cardsMastered}</span>
            <span class="metric-label">Cards in Box 3 (Mastered)</span>
          </div>
        </div>
      </div>

      <!-- CSS Bar Chart for Recent Quiz Scores -->
      <div class="card dashboard-chart-card">
        <div class="chart-header">
          <div>
            <h3 class="chart-title">Recent Quiz Performance (Last 10 Quizzes)</h3>
            <p class="chart-subtitle">Chronological score accuracy plotted with pure CSS bars</p>
          </div>
        </div>
        <div class="dashboard-chart-body" id="dashboard-bar-chart"></div>
      </div>
    </div>
  `;

  const chartBody = container.querySelector('#dashboard-bar-chart');
  if (chartBody) {
    if (stats.recentScores.length === 0) {
      chartBody.innerHTML = `
        <div class="history-empty-state" style="padding: 2.5rem 1rem;">
          <p class="empty-title">No Quiz Attempts Recorded</p>
          <p class="empty-subtitle">Take a quiz in Study Hub to start tracking your accuracy chart here!</p>
        </div>
      `;
    } else {
      const chartWrap = document.createElement('div');
      chartWrap.className = 'quiz-chart-container';
      stats.recentScores.forEach((item, idx) => {
        const pct = Math.round(((item.score || 0) / (item.total || 5)) * 100);
        const col = document.createElement('div');
        col.className = 'quiz-chart-col';
        col.innerHTML = `
          <div class="quiz-chart-bar-wrapper" title="${item.topicTitle}: ${item.score}/${item.total} (${pct}%)">
            <span class="quiz-bar-pct">${pct}%</span>
            <div class="quiz-chart-bar" style="height: ${Math.max(10, pct)}%;"></div>
          </div>
          <span class="quiz-bar-label">#${idx + 1}</span>
        `;
        chartWrap.appendChild(col);
      });
      chartBody.appendChild(chartWrap);
    }
  }
}

/**
 * Renders the Pomodoro Focus Timer widget / section.
 * @param {HTMLElement} container
 */
function renderPomodoro(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="pomodoro-wrapper card">
      <div class="pomodoro-header">
        <div class="pomodoro-title-group">
          <div class="pomodoro-icon-wrap" aria-hidden="true">
            <svg class="pomodoro-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div>
            <h2 class="pomodoro-title">Focus & Pomodoro Timer</h2>
            <p class="pomodoro-subtitle">25-minute deep focus intervals with 5-minute cognitive breaks</p>
          </div>
        </div>
        <div class="pomodoro-mode-chips" role="tablist">
          <button type="button" class="pomo-mode-btn active" id="pomo-mode-focus" data-minutes="25">25m Focus</button>
          <button type="button" class="pomo-mode-btn" id="pomo-mode-break" data-minutes="5">5m Break</button>
        </div>
      </div>

      <div class="pomodoro-display-area">
        <div class="pomodoro-circle-wrap">
          <svg class="pomodoro-ring-svg" viewBox="0 0 220 220" aria-hidden="true">
            <circle class="pomo-ring-bg" cx="110" cy="110" r="95"></circle>
            <circle class="pomo-ring-fill" id="pomo-ring-fill" cx="110" cy="110" r="95" stroke-dasharray="596.9" stroke-dashoffset="0"></circle>
          </svg>
          <div class="pomodoro-time-text">
            <span class="pomo-digits" id="pomo-digits">25:00</span>
            <span class="pomo-status-label" id="pomo-status-label">Ready to Focus</span>
          </div>
        </div>
      </div>

      <div class="pomodoro-controls">
        <button type="button" class="btn btn-primary pomo-btn-start" id="pomo-start-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span id="pomo-start-label">Start Focus</span>
        </button>
        <button type="button" class="btn btn-secondary pomo-btn-reset" id="pomo-reset-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
          </svg>
          <span>Reset</span>
        </button>
      </div>
    </div>
  `;
}

// Global namespace exposure
window.StudyRender = {
  FAKE_AI_RESPONSE,
  cleanupQuizTimers,
  renderStudyKit,
  renderSummary,
  renderQuiz,
  renderQuizProgress,
  renderFlashcards,
  renderGlossary,
  renderOutline,
  renderDashboard,
  renderPomodoro,
  renderHistory,
};
