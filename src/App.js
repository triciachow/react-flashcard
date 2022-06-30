import { useEffect, useState } from "react";
import FlashcardList from "./FlashcardList";
import "./app.css";
import axios from "axios";

/* eslint-disable */
export default function App() {
  /* eslint-disable */
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARD);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then(res => {
      console.log(res.data);
    });
  }, []);

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
