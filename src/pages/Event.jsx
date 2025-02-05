import React, { useState, useEffect } from "react";

const DinoGame = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleLeft, setObstacleLeft] = useState(500);
  const [dinoTop, setDinoTop] = useState(150);
  const gravity = 3;
  const jumpHeight = 100;
  const gameWidth = 500;
  const gameHeight = 200;
  const obstacleSpeed = 5;

  useEffect(() => {
    let obstacleInterval;
    if (obstacleLeft > -20) {
      obstacleInterval = setInterval(() => {
        setObstacleLeft((prev) => prev - obstacleSpeed);
      }, 30);
    } else {
      setObstacleLeft(gameWidth);
    }
    return () => clearInterval(obstacleInterval);
  }, [obstacleLeft]);

  useEffect(() => {
    let fallInterval;
    if (isJumping) {
      setTimeout(() => setIsJumping(false), 500);
    } else {
      fallInterval = setInterval(() => {
        if (dinoTop < 150) {
          setDinoTop((prev) => prev + gravity);
        }
      }, 30);
    }
    return () => clearInterval(fallInterval);
  }, [isJumping]);

  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setDinoTop(dinoTop - jumpHeight);
    }
  };

  return (
    <div className="relative w-[500px] h-[200px] bg-gray-200 border overflow-hidden">
      <div
        className="absolute bottom-0 left-10 w-10 h-10 bg-green-500"
        style={{ bottom: `${dinoTop}px` }}
      ></div>
      <div
        className="absolute bottom-0 w-10 h-10 bg-red-500"
        style={{ left: `${obstacleLeft}px` }}
      ></div>
      <button
        className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded"
        onClick={handleJump}
      >
        Jump
      </button>
    </div>
  );
};

export default DinoGame;
