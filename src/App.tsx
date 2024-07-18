import { useState } from "react";
import "./App.css";
import { MineField } from "./minefield.ts";

function App() {
  const [field, setField] = useState(new MineField(5, 5, 1));

  function sweep(x: number, y: number) {
    setField(field.sweep(x, y));
  }

  return (
    <div className="font-mono">
      {field.grid.map((row, x) => (
        <div key={x}>
          {row.map((cell, y) => (
            <button key={y} className="mx-2" onClick={() => sweep(x, y)}>
              {cell.surroundingBombs}
              {cell.isBomb ? "B" : "_"}
              {cell.isSwept ? "S" : "_"}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
