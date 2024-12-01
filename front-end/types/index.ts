export type Role = "admin" | "player" | "guest";

export type User = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  creationDate?: Date;
  role?: string;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};
