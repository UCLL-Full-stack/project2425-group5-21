import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Header from "@/components/header";
import { createTypingTest } from "@/services/TypingTestService";

const Singleplayer: React.FC = () => {
  const allWords = [
    "from",
    "quick",
    "brown",
    "fox",
    "jumps",
    "over",
    "lazy",
    "dog",
    "keyboard",
    "monitor",
    "speed",
    "test",
    "race",
    "game",
    "challenge",
    "practice",
    "skill",
    "accuracy",
    "effort",
    "focus",
    "energy",
    "learn",
    "improve",
    "progress",
    "success",
    "goal",
    "complete",
    "start",
    "finish",
    "try",
    "repeat",
    "mistake",
    "correct",
    "words",
    "letters",
    "sentence",
    "flow",
    "rhythm",
    "technique",
    "fast",
    "slow",
    "persevere",
    "achieve",
    "understand",
    "concept",
    "time",
    "memory",
    "test",
    "confidence",
    "competence",
    "control",
    "growth",
    "habit",
    "practice",
    "method",
    "optimize",
    "performance",
    "action",
    "reaction",
    "passion",
    "consistency",
    "dedication",
    "focus",
    "drive",
    "learning",
    "engagement",
    "clarity",
    "insight",
    "vision",
    "routine",
    "success",
    "system",
    "goal",
    "outcome",
    "task",
    "process",
    "steps",
    "result",
    "plan",
    "goal",
    "aspiration",
    "ambition",
    "target",
    "mission",
    "strategy",
    "priority",
    "objective",
    "perspective",
    "context",
    "framework",
    "roadmap",
    "journey",
    "adventure",
    "explore",
    "discover",
    "insight",
    "knowledge",
  ];

  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [typedLetters, setTypedLetters] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [stats, setStats] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const randomWords = Array.from(
      { length: 65 },
      () => allWords[Math.floor(Math.random() * allWords.length)]
    );
    setSelectedWords(randomWords);
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isGameFinished) return;

    if (!isGameStarted) {
      setIsGameStarted(true);
    }

    if (event.key === "Backspace") {
      if (typedLetters.length > 0) {
        const newTypedLetters = typedLetters.slice(0, -1);
        setTypedLetters(newTypedLetters);
        const wordsArray = newTypedLetters.trim().split(" ");
        setCurrentWordIndex(wordsArray.length - 1);
        setCurrentLetterIndex(wordsArray[wordsArray.length - 1]?.length || 0);
      }
    } else if (event.key === " ") {
      if (currentWordIndex < selectedWords.length - 1) {
        setTypedLetters((prev) => prev + " ");
        setCurrentWordIndex((prev) => prev + 1);
        setCurrentLetterIndex(0);
      }
    } else if (event.key.length === 1) {
      setTypedLetters((prev) => prev + event.key);
      setCurrentLetterIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!isGameStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameStarted, timeLeft]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [typedLetters, isGameStarted, isGameFinished]);

  const finishGame = async () => {
    setIsGameStarted(false);
    setIsGameFinished(true);

    const typedWordsArray = typedLetters.trim().split(" ");
    const correctWords = selectedWords.filter(
      (word, index) => word === typedWordsArray[index]
    );

    const totalCharsTyped = typedLetters.length;
    const correctCharsTyped = selectedWords
      .join(" ")
      .split("")
      .filter((char, index) => typedLetters[index] === char).length;

    const accuracy = totalCharsTyped
      ? Math.round((correctCharsTyped / totalCharsTyped) * 100)
      : 0;

    const wpm = Math.round(
      (typedWordsArray.length / (selectedTime || 15)) * 60
    );

    setStats({
      accuracy,
      wpm,
    });

  
    try {
      await createTypingTest({
        wpm: wpm,
        accuracy: accuracy,
        time: selectedTime || 15,
        type: 'singleplayer',
      });
    } catch (error) {
      console.error('Failed to save typing test:', error);
    }

  };

  const resetGame = () => {
    setIsGameStarted(false);
    setIsGameFinished(false);
    setStats(null);
    setTimeLeft(selectedTime || 15);
    setTypedLetters("");
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);

    const randomWords = Array.from(
      { length: 65 },
      () => allWords[Math.floor(Math.random() * allWords.length)]
    );
    setSelectedWords(randomWords);
  };

  const startGame = (time: number) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setIsGameStarted(true);
  };

  const splitWords = selectedWords.join(" ").split(" ");
  const typedWordsArray = typedLetters.trim().split(" ");

  return (
    <>
      <Head>
        <title>MR Typer | Singleplayer</title>
        <meta name="description" content="Singleplayer typing test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className="h-screen bg-[#120e17] flex flex-col justify-center items-center text-white">
        {!isGameStarted && !isGameFinished && (
          <div className="flex flex-col items-center space-y-4 -mt-40">
            <h2 className="text-3xl font-bold mb-4">Select Time Duration</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => startGame(15)}
                className="bg-[#5ac4d7] text-[#1a1d2e] py-2 px-4 rounded-lg text-xl font-semibold shadow-md transform transition-transform hover:scale-105 hover:bg-[#49a8b8]"
              >
                15 Seconds
              </button>
              <button
                onClick={() => startGame(30)}
                className="bg-[#5ac4d7] text-[#1a1d2e] py-2 px-4 rounded-lg text-xl font-semibold shadow-md transform transition-transform hover:scale-105 hover:bg-[#49a8b8]"
              >
                30 Seconds
              </button>
              <button
                onClick={() => startGame(60)}
                className="bg-[#5ac4d7] text-[#1a1d2e] py-2 px-4 rounded-lg text-xl font-semibold shadow-md transform transition-transform hover:scale-105 hover:bg-[#49a8b8]"
              >
                60 Seconds
              </button>
            </div>
          </div>
        )}

        {isGameStarted && (
          <div className="w-[80%] flex items-center -mt-40">
            <p className="font-bold text-3xl text-[#5ac4d7] -ml40">
              {timeLeft} {isGameFinished && "Game Over!"}
            </p>
          </div>
        )}

        {isGameFinished ? (
          <div className="w-[80%] text-center mt-8 -mt-40">
            <h2 className="text-white text-4xl font-bold mb-6">Game Stats</h2>
            <ul className="text-white text-lg">
              <li>Accuracy: {stats.accuracy}%</li>
              <li>WPM: {stats.wpm}</li>
            </ul>
            <button
              onClick={resetGame}
              className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Restart Game
            </button>
          </div>
        ) : (
          isGameStarted && (
            <section className="relative w-[80%] h-[25%] flex flex-wrap justify-start items-center">
              {splitWords.map((word, wordIndex) => {
                const typedWord = typedWordsArray[wordIndex] || "";
                return (
                  <div
                    className="flex items-center px-2 relative"
                    key={wordIndex}
                    ref={(el) => (wordRefs.current[wordIndex] = el)}
                  >
                    {word.split("").map((letter, letterIndex) => {
                      const isTyped = letterIndex < typedWord.length;
                      const isCorrect = typedWord[letterIndex] === letter;
                      const isCursorPosition =
                        wordIndex === currentWordIndex &&
                        letterIndex === currentLetterIndex;

                      let className =
                        "font-bold text-4xl transition-colors duration-300 ";
                      if (isTyped) {
                        className += isCorrect
                          ? "text-white/70"
                          : "text-red-500";
                      } else {
                        className += "text-white/30";
                      }

                      return (
                        <span key={letterIndex} className="relative">
                          {isCursorPosition && (
                            <span className="absolute -left-1 w-1 h-10 mt-1 bg-white animate-pulse transition-all"></span>
                          )}
                          <p className={className}>{letter}</p>
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </section>
          )
        )}
      </main>
    </>
  );
};

export default Singleplayer;


