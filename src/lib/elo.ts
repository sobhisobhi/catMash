import { K_FACTOR } from './constants';

export interface EloResult {
  newWinnerScore: number;
  newLoserScore: number;
}

export const calculateElo = (
  winnerScore: number,
  loserScore: number
): EloResult => {
  const expectedWinner =
    1 / (1 + Math.pow(10, (loserScore - winnerScore) / 400));
  const expectedLoser =
    1 / (1 + Math.pow(10, (winnerScore - loserScore) / 400));

  return {
    newWinnerScore: Math.round(winnerScore + K_FACTOR * (1 - expectedWinner)),
    newLoserScore: Math.round(loserScore + K_FACTOR * (0 - expectedLoser)),
  };
};
