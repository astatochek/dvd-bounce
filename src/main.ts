import "./style.css";

const app = document.getElementById("app");

const canvas = document.createElement("canvas");
app?.appendChild(canvas);

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

canvas.width = screenWidth;
canvas.height = screenHeight;

class DVD {
  readonly text = "DVD";
  readonly width = 200;
  readonly height = 100;

  x: number;
  y: number;
  speedX = 4;
  speedY = 4;

  squareColor = "white";

  constructor(
    readonly ctx: CanvasRenderingContext2D,
    public screenWidth: number,
    public screenHeight: number,
  ) {
    this.x = screenWidth / 2;
    this.y = screenHeight / 2;
  }

  draw() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);

    this.ctx.fillStyle = this.squareColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    this.ctx.fillStyle = "black";
    this.ctx.font = "48px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2,
    );
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.width > this.screenWidth || this.x < 0) {
      this.speedX = -this.speedX;
      return { isCollision: true };
    }

    if (this.y + this.height > this.screenHeight || this.y < 0) {
      this.speedY = -this.speedY;
      return { isCollision: true };
    }
    return { isCollision: false };
  }

  loop() {
    const { isCollision } = this.move();
    if (isCollision) this.changeColor();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  resize(screenWidth: number, screenHeight: number) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.draw();
  }

  changeColor() {
    const l = Math.random() * 0.7 + 0.3;
    const c = Math.random() * 0.3 + 0.1;
    const h = Math.random() * 360;

    this.squareColor = `oklch(${l} ${c} ${h})`;
  }
}

const dvd = new DVD(canvas.getContext("2d")!, screenWidth, screenHeight);

dvd.loop();

window.addEventListener("resize", () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  canvas.width = screenWidth;
  canvas.height = screenHeight;

  dvd.resize(screenWidth, screenHeight);
});
