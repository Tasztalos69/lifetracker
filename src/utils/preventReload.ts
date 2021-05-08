const beforeUnloadListener = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = '';
};

/**
 * Prevents reloading by displaying a system modal.
 */
export const setReloadPrevention = (): void =>
  window.addEventListener('beforeunload', beforeUnloadListener);

/**
 * Removes the reload prevention.
 */
export const removeReloadPrevention = (): void =>
  window.removeEventListener('beforeunload', beforeUnloadListener);
