import React, { useState, useRef, useEffect } from "react";

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const frontEl = useRef();
  const backEl = useRef();

  const handleFlip = () => {
    setFlip(!flip);
  };

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, [
    flashcard.answer,
    flashcard.question,
    flashcard.options,
  ]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <>
      <div
        className={`card ${flip ? "flip" : " "}`}
        onClick={handleFlip}
        style={{ height: height }}
      >
        <div className="front" ref={frontEl}>
          {flashcard.question}
          <div className="flashcard-options">
            {flashcard.options.map((option, index) => {
              return (
                <div className="flashcard-option" key={index}>
                  {option}
                </div>
              );
            })}
          </div>
        </div>
        <div className="back" ref={backEl}>
          {flashcard.answer}
        </div>
      </div>
    </>
  );
}
