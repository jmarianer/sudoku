import { Region, Cell, Board } from '../types';
import * as React from './noreact';

function cellToTd(cell: Cell, className: string) {
  return <td class={ className } />;
}

const range9: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const boardCells: number[][] = range9.map((i)=>range9.map((j)=>i*9+j));

export = (board: Board, region: Region) =>
  <table>
  { boardCells.map((row) =>
    <tr>
    { row.map((index) =>
      cellToTd(board.cells[index], region.cell_indexes.has(index) ? "highlighted" : "")) }
    </tr>
  )}
  </table>;
