document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const startButton = document.getElementById('start-button');
  canvas.width = 320;
  canvas.height = 480;

  let bird = {
      x: 50,
      y: 150,
      width: 20,
      height: 20,
      gravity: 0.2,
      lift: -6,
      velocity: 0
  };

  let pipes = [];
  let frame = 0;
  let score = 0;
  let highScore = localStorage.getItem('flappy_bird_high_score') || 0;
  let gameStarted = false;

  function drawBird() {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
  }

  function drawPipes() {
      ctx.fillStyle = 'green';
      pipes.forEach(pipe => {
          ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
          ctx.fillRect(pipe.x, pipe.y + pipe.height + pipe.gap, pipe.width, canvas.height - pipe.y - pipe.height - pipe.gap);
      });
  }

  function updatePipes() {
      if (frame % 100 === 0) {
          let pipeHeight = Math.floor(Math.random() * (canvas.height / 3)) + 20;
          let gap = 190;
          pipes.push({
              x: canvas.width,
              y: pipeHeight,
              width: 20,
              height: pipeHeight,
              gap: gap
          });
      }

      pipes.forEach(pipe => {
          pipe.x -= 2;
      });

      pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
  }

  function updateBird() {
      bird.velocity += bird.gravity;
      bird.y += bird.velocity;

      if (bird.y + bird.height > canvas.height || bird.y < 0) {
          handleGameOver();
      }
  }

  function checkCollision() {
      pipes.forEach(pipe => {
          if (
              bird.x < pipe.x + pipe.width &&
              bird.x + bird.width > pipe.x &&
              (bird.y < pipe.y + pipe.height || bird.y + bird.height > pipe.y + pipe.height + pipe.gap)
          ) {
              handleGameOver();
          }
      });
  }

  function handleGameOver() {
      if (score > highScore) {
          highScore = score;
          localStorage.setItem('flappy_bird_high_score', highScore);
      }
      resetGame();
  }

  function resetGame() {
      bird = {
          x: 50,
          y: 150,
          width: 20,
          height: 20,
          gravity: 0.2,
          lift: -6,
          velocity: 0
      };
      pipes = [];
      frame = 0;
      score = 0;
      gameStarted = false;
      startButton.style.display = 'block';
      document.getElementById('score').textContent = `Pontuação: ${score}`;
      document.getElementById('high-score').textContent = `Maior Pontuação: ${highScore}`;
  }

  function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (gameStarted) {
          updateBird();
          updatePipes();
          checkCollision();
          drawBird();
          drawPipes();

          frame++;
          if (frame % 100 === 0) {
              score++;
              document.getElementById('score').textContent = `Pontuação: ${score}`;
          }
      }

      requestAnimationFrame(gameLoop);
  }

  startButton.addEventListener('click', () => {
      gameStarted = true;
      startButton.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !gameStarted) {
          gameStarted = true;
          startButton.style.display = 'none';
      } else if (e.code === 'Space' && gameStarted) {
          bird.velocity = bird.lift;
          e.preventDefault();
      }
  });

  canvas.addEventListener('click', () => {
      if (gameStarted) {
          bird.velocity = bird.lift;
      }
  });

  document.getElementById('high-score').textContent = `Maior Pontuação: ${highScore}`;

  gameLoop();
});
