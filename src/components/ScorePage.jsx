import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ScoreContext } from '../context/ScoreContext.jsx';

  // Function to update score in cats with values from scores
  function updateScores(A, B) {
    A.forEach((image) => {
      if (B.hasOwnProperty(image.id)) {
        image.score = B[image.id];
      }
    });
  }

const ScorePage = () => {
    const [cats, setCats] = useState([]);
  const { scores } = useContext(ScoreContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ['cats'],
    queryFn: () =>
      axios.get('https://data.latelier.co/cats.json').then((res) => res.data),
    onSuccess: (data) => {
      setCats(data.images.map((cat) => ({ ...cat, score: 0 })));
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cats</p>;

  function getVoteWord(number) {
    return number > 1 ? 'votes' : 'vote';
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
