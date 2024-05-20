import React, { useContext, useEffect, useState } from 'react';
import { ScoreContext } from '../context/ScoreContext.jsx';

const ScorePage = () => {
  const { scores } = useContext(ScoreContext);
  const [cats, setCats] = useState([]);
  // A faire avec useQuery pour gerer le datat fetching d'une maniere plus efficiente
  useEffect(() => {
    fetch('https://data.latelier.co/cats.json')
      .then((response) => response.json())
      .then((data) =>
        setCats(data.images.map((cat) => ({ ...cat, score: 0 })))
      );
  }, []);

  function getVoteWord(number) {
    return number > 1 ? 'votes' : 'vote';
  }

  // Function to update score in cats with values from scores
  function updateScores(A, B) {
    A.forEach((image) => {
      if (B.hasOwnProperty(image.id)) {
        image.score = B[image.id];
      }
    });
  }
  updateScores(cats, scores);
  const sortedCats = cats.sort(function (a, b) {
    return b.score - a.score;
  });

  return (
    <div className="score-page">
      <h1>All Cats and their Scores</h1>
      <ul className="score-list">
        {sortedCats.map((cat) => (
          <li key={cat.id} className="score-item">
            <img src={cat.url} alt={cat.id} style={{ width: '100px' }} />
            <p>
              Score: {scores[cat.id] || 0} {getVoteWord(scores[cat.id])}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScorePage;
