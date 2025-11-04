import React, { useState, useEffect } from "react";
import TinderCard from "./TinderCardShim";
import "./App.css";

export default function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [finished, setFinished] = useState(false);

  // Fetch cat images from Cataas
  useEffect(() => {
    const loadCats = async () => {
      const urls = Array.from({ length: 10 }, (_, i) => 
        `https://cataas.com/cat?${i}`
      );
      setCats(urls);
    };
    loadCats();
  }, []);

  const swiped = (direction, catUrl) => {
    if (direction === "right") {
      setLikedCats((prev) => [...prev, catUrl]);
    }

    if (currentIndex + 1 === cats.length) {
      setFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="app">
      <h1>Find Your Favourite Kitty Meow</h1>

      {!finished ? (
        <div className="cardContainer">
          {cats.length > 0 && currentIndex < cats.length ? (
            <TinderCard
              key={cats[currentIndex]}
              onSwipe={(dir) => swiped(dir, cats[currentIndex])}
              preventSwipe={["up", "down"]}
            >
              <div className="card">
                <img
                  src={cats[currentIndex]}
                  alt={`cat-${currentIndex}`}
                  onError={(e) => {
                    // Fallback to a lightweight placeholder if the cat image fails to load
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://via.placeholder.com/400x400?text=No+cat";
                  }}
                />
              </div>
            </TinderCard>
          ) : (
            <p>Loading cats...</p>
          )}
        </div>
      ) : (
        <div className="summary">
          <h2>You liked {likedCats.length} cats! 😻</h2>
          <div className="likedCats">
            {likedCats.map((url, i) => (
              <img key={i} src={url} alt="liked cat" />
            ))}
          </div>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      )}
    </div>
  );
}
