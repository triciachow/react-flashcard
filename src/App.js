import { useState } from "react";
import FlashcardList from "./FlashcardList";

export default function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARD);

  return (
    <>
      <FlashcardList flashcards={flashcards} />
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
