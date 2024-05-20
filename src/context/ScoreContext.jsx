import React, { createContext, useState } from 'react';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState({});

  const addScore = (id) => {
    setScores((prevScores) => ({
      ...prevScores,
      [id]: (prevScores[id] || 0) + 1,
    }));
  };

  return (
    <ScoreContext.Provider value={{ scores, addScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
