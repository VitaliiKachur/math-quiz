import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const createSettingsSlice = (set) => ({
  settings: {
    duration: 30,
    difficulty: 'easy',
    operators: ['+', '-']
  },
  setSettings: (newSettings) => set({ settings: newSettings }),
});

const createResultsSlice = (set) => ({
  history: [], 
  
  addResult: (result) => set((state) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('uk-UA') + ' ' + new Date().toLocaleTimeString('uk-UA', {hour: '2-digit', minute:'2-digit'}),
      ...result
    };
    return { history: [newEntry, ...state.history].slice(0, 20) };
  }),
  
  clearHistory: () => set({ history: [] }),
});

const createGameSlice = (set) => ({
  playerName: '',
  setPlayerName: (name) => set({ playerName: name }),
});

export const useStore = create(
  persist(
    (...a) => ({
      ...createSettingsSlice(...a),
      ...createResultsSlice(...a),
      ...createGameSlice(...a),
    }),
    {
      name: 'math-quiz-storage', 
      storage: createJSONStorage(() => localStorage), 
      partialize: (state) => ({ settings: state.settings, history: state.history }),
    }
  )
);