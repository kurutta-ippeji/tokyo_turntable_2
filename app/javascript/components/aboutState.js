// Shared state for About component
let showAbout = false;
let listeners = [];

export const aboutState = {
  getShowAbout: () => showAbout,
  setShowAbout: (value) => {
    showAbout = value;
    listeners.forEach(listener => listener(value));
  },
  subscribe: (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
};
