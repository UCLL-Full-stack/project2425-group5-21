export type Role = "admin" | "player" | "guest";

export type User = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  creationDate?: Date;
  role?: string;
};

export type Leaderboard = {
  id?: number;
  maxScores?: number;
  type?: string;
  scores?: TypingTest[];
};

export type TypingTest = {
  id?: number;
  wpm: number;
  accuracy?: number;
  time?: number;
  type?: string;
  userId?: number;
  gameId?: number;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};
