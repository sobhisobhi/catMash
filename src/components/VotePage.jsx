import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import catLogo from '../assets/catLogo.png';
import { ScoreContext } from '../context/ScoreContext.jsx';

const getRandomPair = (cats) => {
    const shuffled = cats.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
};

const VotePage = () => {
    const [cats, setCats] = useState([]);
    const [currentPair, setCurrentPair] = useState([]);
    const { addScore, scores } = useContext(ScoreContext);

    const { data, isLoading, error } = useQuery({
        queryKey: ['cats'],
        queryFn: () =>
            axios.get('https://data.latelier.co/cats.json').then((res) => res.data),
        onSuccess: (data) => {
            setCurrentPair(getRandomPair(data.images));
            setCats(data.images);
        },
    });

    if (isLoading || (cats.length === 0)) return <p>Loading...</p>;
    if (error) return <p>Error loading cats</p>;

    const voteCat = (id) => {
        addScore(id);
        setCurrentPair(getRandomPair(cats));
    };

    const matchScore = (id) => {
        return scores[id] || 0;
    };

    return (
        <>
            <div className="vote-page">
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
