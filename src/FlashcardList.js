import React from "react";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards }) {
  return (
    <>
      <div className="card-grid">
        {flashcards.map((flashcard, index) => {
          return (
            <Flashcard flashcard={flashcard} index={flashcard.id} key={index} />
          );
        })}
      </div>
    </>
  );
}
