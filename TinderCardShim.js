import React from "react";

export default function TinderCardShim({ children, onSwipe }) {
  const handleSwipe = (dir) => {
    if (typeof onSwipe === "function") onSwipe(dir);
  };

  return (
    <div className="tinderCardShim">
      {children}
      <div className="cardControls">
        <button
          className="dislike"
          aria-label="dislike"
          onClick={() => handleSwipe("left")}
        >
          Dislike
        </button>
        <button
          className="like"
          aria-label="like"
          onClick={() => handleSwipe("right")}
        >
          Like
        </button>
      </div>
    </div>
  );
}
