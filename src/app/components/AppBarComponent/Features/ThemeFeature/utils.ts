export function saveTheme(theme: string) {
  window.localStorage && localStorage.setItem('theme', theme);
}

/* istanbul ignore next line */
export function getThemeFromStorage(): string {
  return (window.localStorage && localStorage.getItem('theme')) || 'light';
}
