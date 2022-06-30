import React, { useEffect, useState } from "react";
import FlashcardList from "./FlashcardList";
import "./app.css";
import axios from "axios";

export default function App() {
  const url = "https://opentdb.com/api.php?amount=10";
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARD);

  useEffect(() => {
    axios.get(url).then(res => {
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map(ans => decodeString(ans)),
            answer,
          ];

          return {
            id: `${index}-${Date.now()}`, // To ensure a unique ID
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  // Translate HTML character coding to normal string
  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

const SAMPLE_FLASHCARD = [
  {
    id: 1,
    question: "What is 2 + 2??",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "What is 3 + 2?",
    answer: "5",
    options: ["2", "3", "4", "5"],
  },
];
