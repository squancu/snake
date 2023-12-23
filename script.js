const canvas = document.getElementById("game"); //переменная содержащая объект внутри которого будет игра
const ctx = canvas.getContext("2d"); //переменная содержащая формат игры - 2d

const ground = new Image(); //переменная картинки игрового поля
ground.src = "поле.png";

const foodImg = new Image(); //переменная картинки еды
foodImg.src = "еда.png";

let box = 32; //сторона клетки

let score = 0; //счет в игре

let food = { //координаты для отображения еды
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = []; //координаты для отображения змейки
snake[0] = {
	x: 9 * box,
	y: 10 * box
};

document.addEventListener("keydown", direction); //на всю стрницу вешаем обработчика действий 

let dir; //хранит нажатую клавишу

function refreshPage(){ 
    window.location.reload();
} 

function direction(event) { //отслеживает на какие кнопки нажимает пользователь и записывает в переменную
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

function eatTail(head, arr) { //если змейка пересечет себя 
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}

function drawGame() {    // функция рисуящая элементы игры
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y);

	for(let i = 0; i < snake.length; i++) { //рисует змейку квадратиками
		ctx.fillStyle = i == 0 ? "green" : "green";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.7); //рисует счетчик

	let snakeX = snake[0].x; 
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else
		snake.pop();

	if(snakeX < box || snakeX > box * 17
		|| snakeY < 3 * box || snakeY > box * 17)
		clearInterval(game);

	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}

let game = setInterval(drawGame, 150); //отрисовывает игру каждые 150 миллисекнуд
