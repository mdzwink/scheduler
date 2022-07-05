import { useState, useEffect } from 'react';

// stores current mode and mode history. Facilitates updates to both through exported 'mode' state, 'transition()' function, and 'back()' function
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial])
  
  function transition(newMode, replace = false) {
    if (replace) {
      return setHistory(prev => ([...prev.slice(0, -1), newMode]));
    }
    setMode(newMode);
    setHistory(prev => ([...prev, newMode]));
  };
  
  function back() {
    if (history.length === 1) {
      return undefined;
    }
    setHistory(prev => ([...prev.slice(0, -1)]));
  };

  useEffect(() => {
    setMode(history[history.length - 1]);
  }, [history, setMode]);

  return { mode, transition , back};
}