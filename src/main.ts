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
  readonly width = 100;
  readonly height = 50;

  x: number;
  y: number;
  speedX = 2;
  speedY = 2;

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

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    this.ctx.fillStyle = "black";
    this.ctx.font = "24px Arial";
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
    }

    if (this.y + this.height > this.screenHeight || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }

  loop() {
    this.move();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  resize(screenWidth: number, screenHeight: number) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.draw();
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
