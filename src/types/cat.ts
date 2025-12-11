export interface Cat {
  id: string;
  url: string;
  score: number;
  votes: number;
}

export interface StoredData {
  cats: Cat[];
  lastUpdated: string;
}