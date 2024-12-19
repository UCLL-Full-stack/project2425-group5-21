import React, { useEffect, useState, useRef } from "react";

const MultiplayerPage: React.FC = () => {
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
    const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const randomWords = Array.from(
            { length: 46 },
            () => allWords[Math.floor(Math.random() * allWords.length)]
        );
        setSelectedWords(randomWords);
    }, []);

    const handleKeyPress = (event: KeyboardEvent) => {
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
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [typedLetters]);

    const splitWords = selectedWords.join(" ").split(" ");
    const typedWordsArray = typedLetters.trim().split(" ");

    return (
        <>
            <main className="h-screen bg-[#120e17] flex flex-col justify-center items-center">
                <section className="relative w-[80%] h-[25%] flex flex-wrap justify-center items-center">
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
                                        className += isCorrect ? "text-white/70" : "text-red-500";
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
            </main>
        </>
    );
};

export default MultiplayerPage;
