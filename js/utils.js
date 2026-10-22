/**
 * ==========================================================================
 * AI Study Assistant - Utility Functions
 * Helper functions for clipboard copying, file downloads, string sanitization,
 * date formatting, and debouncing.
 * ==========================================================================
 */

/**
 * Escapes unsafe HTML characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Formats an ISO string, timestamp, or Date object into a readable date string.
 * @param {Date|number|string} dateInput
 * @returns {string} e.g. "Oct 22, 2026 • 2:30 PM"
 */
function formatDate(dateInput) {
  if (!dateInput) return '';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput);

  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Copies plain text to the user's clipboard using the modern Clipboard API
 * with fallback to execCommand for older environments.
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} True if copy was successful
 */
async function copyToClipboard(text) {
  if (!text) return false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('utils.js: navigator.clipboard failed, attempting fallback', err);
    }
  }

  // Fallback for non-secure contexts or older browsers
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('utils.js: Fallback clipboard copy failed', err);
    return false;
  }
}

/**
 * Triggers a client-side download of text content as a .txt file.
 * @param {string} filename - The name of the file (e.g. "study-summary.txt")
 * @param {string} text - The text content to write into the file
 */
function downloadTextFile(filename, text) {
  if (!text) return;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = filename || 'study-summary.txt';
  anchor.style.display = 'none';

  document.body.appendChild(anchor);
  anchor.click();

  // Clean up
  setTimeout(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Strips markdown symbols, equations, and code markers to produce
 * clean, natural text for speech synthesis audio narration.
 * @param {string} text - Raw markdown text
 * @returns {string} Clean plain text suitable for speech synthesis
 */
function stripMarkdownForSpeech(text) {
  if (!text) return '';
  let clean = text;

  // Remove markdown headings (# Heading)
  clean = clean.replace(/^#+\s+/gm, '');
  // Remove bold & italic (**text**, *text*, __text__, _text_)
  clean = clean.replace(/[*_]{1,3}(.*?)[*_]{1,3}/g, '$1');
  // Remove inline code and code blocks (`code`)
  clean = clean.replace(/`([^`]+)`/g, '$1');
  // Remove math/latex formulas ($...$ or $$...$$)
  clean = clean.replace(/\$\$[\s\S]*?\$\$/g, '');
  clean = clean.replace(/\$([^$]+)\$/g, '$1');
  // Remove bullet points and list numbering
  clean = clean.replace(/^[\s*-]+(?=\S)/gm, '');
  clean = clean.replace(/^\d+\.\s+/gm, '');
  // Clean multiple blank lines
  clean = clean.replace(/\n\s*\n/g, '. ');
  clean = clean.replace(/\n/g, ' ');

  return clean.trim();
}

/**
 * Simple debounce utility for search inputs.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function debounce(fn, delay = 250) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Global namespace exposure
window.StudyUtils = {
  escapeHtml,
  formatDate,
  copyToClipboard,
  downloadTextFile,
  stripMarkdownForSpeech,
  debounce,
};
