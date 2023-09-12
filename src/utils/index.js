export const saveStateToLocalStorage = (key, state) => {
  window.localStorage.setItem(key, JSON.stringify(state));
};

export const getStateFromLocalStorage = (key) => {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const clearLocalStorage = (key) => {
  window.localStorage.removeItem(key);
};
