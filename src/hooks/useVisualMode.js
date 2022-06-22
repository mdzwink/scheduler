import React, { useState, useEffect } from 'react';


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial])
  
  function transition(newMode, replace = false) {
    if (replace) {
      let replacing = [...history]
      replacing.splice(replacing.length-1, 1, newMode) ;
      return setHistory(replacing);
    }
    setMode(newMode);
    setHistory(prev => ([...prev, newMode]));
  };
  
  function back() {
    if (history.length === 1) {
      return undefined;
    }
    let updatedHistory = [...history];
    updatedHistory.pop();
    
    setHistory(updatedHistory);
    
  };
  useEffect(() => {
    setMode(history[history.length - 1]);
  }, [history, setMode]);

  return { mode, transition , back};
}