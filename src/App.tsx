import { useState } from "react";
import "./App.css";
import { MineField } from "./minefield.ts";

function App() {
  const [field, setField] = useState(new MineField(5, 5, 1));

  const isGameOver = field.grid.flat().some((a) => a.isBomb && a.isSwept);

  function sweep(x: number, y: number) {
    if (!isGameOver) {
      setField(field.sweep(x, y));
    }
  }

  function flag(e: React.MouseEvent, x: number, y: number) {
    e.preventDefault();
    if (!isGameOver) {
      setField(field.toggleFlag(x, y));
    }
  }

  return (
    <>
      <h1 className="text-3xl">{!isGameOver ? "Ready" : "Game Over"}</h1>
      <div className="font-mono">
        {field.grid.map((row, x) => (
          <div key={x}>
            {row.map((cell, y) => (
              <button
                key={y}
                className="mx-2"
                onClick={() => sweep(x, y)}
                onContextMenu={(e) => flag(e, x, y)}
              >
                {cell.surroundingBombs}
                {cell.isBomb ? "B" : "_"}
                {cell.isSwept ? "S" : "_"}
                {cell.isFlagged ? "F" : "_"}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
