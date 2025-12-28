// Shared state for expanded card
let isExpanded = false;
let listeners = [];

export const expandedState = {
  getIsExpanded: () => isExpanded,
  setIsExpanded: (value) => {
    isExpanded = value;
    listeners.forEach(listener => listener(value));
  },
  subscribe: (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
};
