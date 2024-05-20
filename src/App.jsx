import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ScoreProvider } from './context/ScoreContext.jsx';
import VotePage from './components/VotePage';
import ScorePage from './components/ScorePage';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <ScoreProvider>
        <Routes>
          <Route path="/" element={<VotePage />} />
          <Route path="/allCats" element={<ScorePage />} />
        </Routes>
      </ScoreProvider>
    </Router>
  );
}

export default App;