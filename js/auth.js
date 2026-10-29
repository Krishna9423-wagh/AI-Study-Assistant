/**
 * Self-healing rescue script for client browsers that cached older HTML versions.
 * Unlocks the interface immediately, purges obsolete caches, and unregisters old service workers.
 */
(function () {
  // Immediately remove authentication lock from UI if present
  function unlockInterface() {
    try {
      if (document.body) {
        document.body.classList.remove('auth-pending');
      }
      const authScreen = document.getElementById('auth-screen');
      if (authScreen) {
        authScreen.remove();
      }
    } catch (e) {}
  }

  // Purge legacy caches and unregister outdated service worker
  function purgeOldServiceWorkers() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((reg) => reg.unregister());
      }).catch(() => {});
    }
    if ('caches' in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key));
      }).catch(() => {});
    }
    try {
      localStorage.removeItem('ai_study_assistant_auth_user');
      localStorage.removeItem('ai_study_assistant_guest_session');
      localStorage.removeItem('ai_study_assistant_supabase_url');
      localStorage.removeItem('ai_study_assistant_supabase_anon_key');
    } catch (e) {}
  }

  // Fallback StudyAuth object so cached scripts never throw TypeError
  window.StudyAuth = {
    whenAuthenticated(callback) {
      unlockInterface();
      if (typeof callback === 'function') {
        try { callback(); } catch (e) {}
      }
    },
    signOut() {
      window.location.reload();
    },
    isGuest() { return true; },
    getUserIdentity() { return 'Student'; }
  };

  // Run immediately and on DOM load
  unlockInterface();
  purgeOldServiceWorkers();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      unlockInterface();
      // If the old auth screen was rendered from cache, reload to fetch clean HTML
      if (document.getElementById('auth-screen') || document.body.classList.contains('auth-pending')) {
        window.location.reload();
      }
    });
  }
}());
