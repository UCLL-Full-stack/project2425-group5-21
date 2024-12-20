import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/components/header";
import "@testing-library/jest-dom";

window.React = React;

jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));
jest.mock("next/router", () => ({
  useRouter: () => ({
    locale: "en",
  }),
}));

test("given header - when rendered - then it shows the correct titles", async () => {
  // when
  render(<Header />);

  // then
  expect(screen.getByText("app.title")).toBeInTheDocument();
  expect(screen.getByText("header.nav.home")).toBeInTheDocument();
  expect(screen.getByText("header.nav.stats")).toBeInTheDocument();
  expect(screen.getByText("header.nav.leaderboard")).toBeInTheDocument();
  expect(screen.getByText("header.nav.login.register")).toBeInTheDocument();
});

test("given logged in user - when rendered - then it shows the logout link and welcome message", async () => {
  // given
  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({ username: "testuser" })
  );

  // when
  render(<Header />);

  // then
  expect(screen.getByText("header.nav.logout")).toBeInTheDocument();
  expect(screen.getByText("header.welcome, testuser!")).toBeInTheDocument();

  // cleanup
  localStorage.removeItem("loggedInUser");
});

test("given no logged in user - when rendered - then it does not show the logout link and welcome message", async () => {
  // when
  render(<Header />);

  // then
  expect(screen.queryByText("header.nav.logout")).not.toBeInTheDocument();
  expect(screen.queryByText("header.welcome")).not.toBeInTheDocument();
});

test("given logged in user - when rendered - then it shows the logout link and welcome message", async () => {
  // given
  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({ username: "testuser" })
  );

  // when
  render(<Header />);

  // then
  expect(screen.getByText("header.nav.logout")).toBeInTheDocument();
  expect(screen.getByText("header.welcome, testuser!")).toBeInTheDocument();

  // cleanup
  localStorage.removeItem("loggedInUser");
});

test("given no logged in user - when rendered - then it does not show the logout link and welcome message", async () => {
  // when
  render(<Header />);

  // then
  expect(screen.queryByText("header.nav.logout")).not.toBeInTheDocument();
  expect(screen.queryByText("header.welcome")).not.toBeInTheDocument();
});

test("given logged in user - when rendered - then it shows the logout link and welcome message", async () => {
  // given
  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({ username: "testuser" })
  );

  // when
  render(<Header />);

  // then
  expect(screen.getByText("header.nav.logout")).toBeInTheDocument();
  expect(screen.getByText("header.welcome, testuser!")).toBeInTheDocument();

  // cleanup
  localStorage.removeItem("loggedInUser");
});
