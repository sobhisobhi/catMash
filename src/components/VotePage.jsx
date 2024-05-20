import React, { useContext, useState, useEffect } from 'react';
import catLogo from '../assets/catLogo.png';
import { ScoreContext } from '../context/ScoreContext.jsx';
import Header from './Header';

const VotePage = () => {
  const { addScore, scores } = useContext(ScoreContext);
  console.log('scores==>', scores);
  const [cats, setCats] = useState([]);
  const [currentPair, setCurrentPair] = useState([]);

  // A faire avec useQuery pour gerer le data fetching d'une maniere plus efficiente
  useEffect(() => {
    fetch('https://data.latelier.co/cats.json')
      .then((response) => response.json())
      .then((data) => {
        setCats(data.images);
        setCurrentPair(getRandomPair(data.images));
      });
  }, [setCats]);

  const getRandomPair = (cats) => {
    const shuffled = cats.sort(() => 0.5 - Math.random());
    console.log('shuffled ==>', shuffled);
    return shuffled.slice(0, 2);
  };

  const voteCat = (id) => {
    addScore(id);
    setCurrentPair(getRandomPair(cats));
  };

  const matchScore = (id) => {
    return scores[id] || 0;
  };

  if (cats.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="vote-page">
        {/* <Header /> */}
        <img src={catLogo} alt="catLogo" className="logo" />
        <h1>CAT MASH</h1>
        {currentPair.length === 2 && (
          <div className="cat-images">
            <div>
              <img
                src={currentPair[0].url}
                alt="cat"
                className="cat-image"
                onClick={() => voteCat(currentPair[0].id)}
              />
              <p>Score: {matchScore(currentPair[0].id)}</p>
            </div>
            <div className="orStyle">
              <h1>OR</h1>
            </div>
            <div>
              <img
                src={currentPair[1].url}
                alt="cat"
                className="cat-image"
                onClick={() => voteCat(currentPair[1].id)}
              />
              <p>Score: {matchScore(currentPair[1].id)}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VotePage;
