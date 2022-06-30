import React, { useEffect, useState, useRef } from "react";
import FlashcardList from "./FlashcardList";
import "./app.css";
import axios from "axios";

export default function App() {
  const url = "https://opentdb.com/api.php";
  const categoryUrl = "https://opentdb.com/api_category.php";
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get(categoryUrl).then(res => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  // Translate HTML character coding to normal string
  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get(url, {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then(res => {
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
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category, index) => {
              return (
                <option value={category.id} key={index}>
                  {category.name}
                </option>
              );
            })}
            <option></option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}
