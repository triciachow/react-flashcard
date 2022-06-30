import React from "react";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards }) {
  return (
    <>
      <div className="card-grid">
        {flashcards.map(flashcard => {
          return <Flashcard flashcard={flashcard} index={flashcard.id} />;
        })}
      </div>
    </>
  );
}
