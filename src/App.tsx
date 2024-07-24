import React, { useState } from "react";
import { MineField } from "./minefield.ts";
import { Tile } from "@/components/Tile.tsx";

function App() {
  const [field, setField] = useState(new MineField(5, 5, 1));

  const isGameOver = field.grid.flat().some((a) => a.isBomb && a.isSwept);

  const isGameComplete = isGameOver
    ? false
    : field.grid.flat().every((a) => {
        return a.isSwept || (a.isBomb && a.isFlagged);
      });

  function sweep(x: number, y: number) {
    if (!isGameOver || !isGameComplete) {
      setField(field.clone().sweep(x, y));
    }
  }

  function flag(e: React.MouseEvent, x: number, y: number) {
    e.preventDefault();
    if (!isGameOver || !isGameComplete) {
      setField(field.clone().toggleFlag(x, y));
    }
  }

  return (
    <div className="flex justify-center m-4">
      <div>
        <div className="flex flex-row justify-center gap-4">
          <h1 className="text-3xl">{!isGameOver ? "Ready" : "Game Over"}</h1>
          <h1 className="text-3xl">
            {isGameComplete ? "Complete" : "Not Complete"}
          </h1>
        </div>
        <div className="font-mono">
          {field.grid.map((row, x) => (
            <div key={x} className="flex flex-row">
              {row.map((cell, y) => (
                <Tile
                  key={`${x}-${y}`}
                  cellData={cell}
                  onClick={() => sweep(x, y)}
                  onContextMenu={(e) => flag(e, x, y)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
