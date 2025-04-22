import { useEffect, useRef } from "react";
import "./styles.css";

enum TextPosition {
  RIGHT = "right",
  LEFT = "left",
  TOP = "top",
  BOTTOM = "bottom",
}

const data = [
  {
    text: "One",
    rect: { x: 10, y: 20, height: 40, width: 20 },
    textPos: TextPosition.TOP,
  },
  {
    text: "Two",
    rect: { x: 50, y: 40, height: 10, width: 20 },
    textPos: TextPosition.BOTTOM,
  },
  {
    text: "Three",
    rect: { x: 150, y: 300, height: 20, width: 20 },
    textPos: TextPosition.LEFT,
  },
  {
    text: "Four",
    rect: { x: 300, y: 250, height: 120, width: 200 },
    textPos: TextPosition.TOP,
  },
  {
    text: "Five",
    rect: { x: 420, y: 450, height: 30, width: 30 },
    textPos: TextPosition.TOP,
  },
  {
    text: "Six",
    rect: { x: 340, y: 440, height: 45, width: 30 },
    textPos: TextPosition.RIGHT,
  },
  {
    text: "Seven",
    rect: { x: 200, y: 300, height: 40, width: 20 },
    textPos: TextPosition.LEFT,
  },
  {
    text: "Eight",
    rect: { x: 250, y: 400, height: 120, width: 200 },
    textPos: TextPosition.TOP,
  },
];

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.font = "16px Arial";

    data.forEach(({ text, rect, textPos }) => {
      ctx.strokeStyle = "orange";
      ctx.beginPath();
      ctx.rect(rect.x, rect.y, rect.width, rect.height);
      ctx.stroke();
      // ctx.fill();

      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const textHeight =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

      let textX = rect.x;
      let textY = rect.y;

      switch (textPos) {
        case TextPosition.TOP:
          textX = rect.x + rect.width / 2 - textWidth / 2;
          textY = rect.y - 5;
          break;
        case TextPosition.BOTTOM:
          textX = rect.x + rect.width / 2 - textWidth / 2;
          textY = rect.y + rect.height + textHeight + 5;
          break;
        case TextPosition.LEFT:
          textX = rect.x - textWidth - 5;
          textY = rect.y + rect.height / 2 + textHeight / 2;
          break;
        case TextPosition.RIGHT:
          textX = rect.x + rect.width + 5;
          textY = rect.y + rect.height / 2 + textHeight / 2;
          break;
      }
      // ctx.fillStyle = "red";
      ctx.fillText(text, textX, textY);
    });
  }, []);

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        height="600"
        width="600"
        style={{ border: "1px solid black" }}
      />
    </div>
  );
}
