import React from "react";
import { render, screen } from "@testing-library/react";
import LeaderboardTable from "@/components/leaderboard/leaderBoardTable";

window.React = React;

jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const leaderboard = {
  id: 1,
  maxScores: 10,
  type: 60,
  scores: [
    {
      id: 1,
      wpm: 100,
      accuracy: 100,
      time: 60,
      type: "singeplayer",
      user: {
        id: 1,
        username: "johndoe",
      },
      gameId: 1,
    },
    {
      id: 2,
      wpm: 95,
      accuracy: 98,
      time: 60,
      type: "singeplayer",
      user: {
        id: 2,
        username: "janetoe",
      },
      gameId: 1,
    },
  ],
};

test("given leaderboard - when rendered - then users in leaderboard is shown", async () => {
  // when
  render(<LeaderboardTable leaderboard={leaderboard} />);

  // then
  expect(screen.getByText("johndoe"));
  expect(screen.getByText("janetoe"));
});
