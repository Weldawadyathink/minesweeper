import type { Cell } from "@/minefield.ts";
import React from "react";

export function Tile(props: {
  className?: string | undefined;
  onContextMenu?: React.MouseEventHandler<HTMLImageElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLImageElement> | undefined;
  cellData: Cell;
}) {
  let tileImageName = "tile_base.png";
  if (props.cellData.isSwept) {
    if (props.cellData.isBomb) {
      tileImageName = "tile_bomb_2.png";
    } else {
      if (props.cellData.surroundingBombs === 0) {
        tileImageName = "tile_pressed.png";
      } else {
        tileImageName = `tile_${props.cellData.surroundingBombs}.png`;
      }
    }
  } else {
    if (props.cellData.isFlagged) {
      tileImageName = "tile_flag.png";
    } else {
      tileImageName = "tile_base.png";
    }
  }

  if (props.cellData)
    return (
      <img
        className={props.className}
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        alt="tile"
        src={`/3.1/${tileImageName}`}
      />
    );
}
