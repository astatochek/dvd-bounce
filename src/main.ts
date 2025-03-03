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
  readonly width = 300;
  readonly height = 150;

  x: number;
  y: number;
  speedX = 2;
  speedY = 2;

  squareColor = "white";

  readonly logo: HTMLImageElement;

  constructor(
    readonly ctx: CanvasRenderingContext2D,
    public screenWidth: number,
    public screenHeight: number,
  ) {
    this.x = screenWidth / 2;
    this.y = screenHeight / 2;

    this.logo = new Image();
    this.logo.src = "./DVD_logo.svg";

    if (!this.logo.complete) {
      this.logo.onload = () => this.drawLogo();
    }
  }

  draw() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);

    this.ctx.fillStyle = this.squareColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.logo.complete) {
      this.drawLogo();
    }
  }

  move() {
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > this.screenWidth) {
      this.x = this.screenWidth - this.width;
    } else if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.height > this.screenHeight) {
      this.y = this.screenHeight - this.height;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    const isXCollision = this.x + this.width > this.screenWidth || this.x < 0;
    const isYCollision = this.y + this.height > this.screenHeight || this.y < 0;

    if (isXCollision) {
      this.speedX = -this.speedX;
    }

    if (isYCollision) {
      this.speedY = -this.speedY;
    }

    return { isCollision: isXCollision || isYCollision };
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

  drawLogo() {
    const padding = 4;
    this.ctx.drawImage(
      this.logo,
      this.x + padding,
      this.y + padding,
      this.width - 2 * padding,
      this.height - 2 * padding,
    );
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
