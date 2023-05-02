const gameContainer = document.getElementById("gameContainer");
      let score = 0;
      let intervalId;
      let snake = [{ x: 1, y: 20 }];
      let direction = "right";
      let food = generateFood();

      function createPixel(x, y) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.id = `pixel${y * 20 + x + 1}`;
        pixel.style.left = `${x * 40}px`;
        pixel.style.top = `${y * 40}px`;
        gameContainer.appendChild(pixel);
        return pixel;
      }

      function generateFood() {
        let x = Math.floor(Math.random() * 20);
        let y = Math.floor(Math.random() * 20);
        let id = `pixel${y * 20 + x + 1}`;
        while (snake.some((bodyPart) => bodyPart.x == x && bodyPart.y == y)) {
          x = Math.floor(Math.random() * 20);
          y = Math.floor(Math.random() * 20);
          id = `pixel${y * 20 + x + 1}`;
        }
        const food = createPixel(x, y);
        food.classList.add("food");
        return { x, y, id };
      }

      function moveSnake() {
        const head = snake[0];
        let x = head.x;
        let y = head.y;

        if (direction === "right") {
          x++;
        } else if (direction === "left") {
          x--;
        } else if (direction === "up") {
          y--;
        } else if (direction === "down") {
          y++;
        }

        if (x > 19) {
          x = 0;
        } else if (x < 0) {
          x = 19;
        } else if (y > 19) {
          y = 0;
        } else if (y < 0) {
          y = 19;
        }

        const newHead = createPixel(x, y);
        newHead.classList.add("snakeBodyPixel");
        snake.unshift({ x, y });

        if (x == food.x && y == food.y) {
          food.remove();
          food = generateFood();
          score++;
          document.getElementById("score").textContent = score;
        } else {
          const tail = snake.pop();
          const tailPixel = document.getElementById(
            `pixel${tail.y * 20 + tail.x + 1}`
          );
          tailPixel.classList.remove("snakeBodyPixel");
        }

        if (
			snake.some(
        (bodyPart, index) =>
          index !== 0 && bodyPart.x === x && bodyPart.y === y
      )
    ) {
      clearInterval(intervalId);
      alert("Game Over! Your Score: " + score);
      location.reload();
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && direction !== "left") {
      direction = "right";
    } else if (event.key === "ArrowLeft" && direction !== "right") {
      direction = "left";
    } else if (event.key === "ArrowUp" && direction !== "down") {
      direction = "up";
    } else if (event.key === "ArrowDown" && direction !== "up") {
      direction = "down";
    }
  });

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      createPixel(j, i);
    }
  }

  food.classList.add("food");

  intervalId = setInterval(moveSnake, 100);