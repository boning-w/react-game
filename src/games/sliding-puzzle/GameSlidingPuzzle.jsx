import { useImmer } from "use-immer";
import img0 from "./game-data/1.png";
import img1 from "./game-data/2.png";
import img2 from "./game-data/3.png";
import img3 from "./game-data/4.png";
import img4 from "./game-data/5.png";
import img5 from "./game-data/6.png";
import img6 from "./game-data/7.png";
import img7 from "./game-data/8.png";
import "./GameSlidingPuzzle.css";

export default function GameSlidingPuzzle() {
  // Define the blank cell (white cell) in the puzzle
  const BLANKCELL = null;
  // Define the answer to the puzzle.
  // Each number refers to the related image data
  const ANSWER = [
    [img0, img1, img2],
    [img3, img4, img5],
    [img6, img7, BLANKCELL],
  ];
  const [puzzle, updatePuzzle] = useImmer(generateRandomPuzzle(ANSWER.flat(1)));
  const { blankCellRowIndex, blankCellColIndex } = getBlankCellPosition(
    puzzle,
    BLANKCELL
  );
  const win = isWin(ANSWER, puzzle);
  console.log(ANSWER);
  console.log(puzzle);

  const handleSolve = () => {
    updatePuzzle(ANSWER);
  };

  const handleReset = () => {
    updatePuzzle(generateRandomPuzzle(ANSWER.flat(1)));
  };

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {win && <h1>🎉 Correct!</h1>}
      <SlidingPuzzle
        puzzle={puzzle}
        updatePuzzle={updatePuzzle}
        BLANKCELL={BLANKCELL}
        blankCellRowIndex={blankCellRowIndex}
        blankCellColIndex={blankCellColIndex}
      />
      <div>
        <button
          type="button"
          style={{ margin: "10px 10px 0 0" }}
          disabled={win}
          onClick={handleSolve}
        >
          Solve
        </button>
        <button
          type="button"
          style={{ margin: "10px 0 0 10px" }}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function SlidingPuzzle({
  puzzle,
  updatePuzzle,
  BLANKCELL,
  blankCellRowIndex,
  blankCellColIndex,
}) {
  const handleMoveCell = (rowIndex, colIndex, cell) => {
    const rowDistance = blankCellRowIndex - rowIndex;
    const colDistance = blankCellColIndex - colIndex;

    // If the cell and the blank cell are in the same row
    if (rowDistance === 0 && (colDistance === -1 || colDistance === 1)) {
      updatePuzzle((draft) => {
        draft[rowIndex][colIndex] = BLANKCELL;
        draft[blankCellRowIndex][blankCellColIndex] = cell;
      });
      return;
    }

    // If the cell and the blank cell are in the same col
    if (colDistance === 0 && (rowDistance === -1 || rowDistance === 1)) {
      updatePuzzle((draft) => {
        draft[rowIndex][colIndex] = BLANKCELL;
        draft[blankCellRowIndex][blankCellColIndex] = cell;
      });
      return;
    }
  };

  return (
    <div>
      {puzzle.map((row, rowIndex) => {
        return (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, colIndex) => {
              if (cell !== BLANKCELL) {
                return (
                  <img
                    id={`${rowIndex}-${colIndex}-${cell}`}
                    className="sliding-puzzle-cell"
                    key={`${rowIndex}-${colIndex}-${cell}`}
                    src={puzzle[rowIndex][colIndex]}
                    alt={`img${cell}`}
                    style={{ border: "1px solid #333", cursor: "pointer" }}
                    onClick={() => handleMoveCell(rowIndex, colIndex, cell)}
                  />
                );
              } else {
                return (
                  <div
                    className="sliding-puzzle-cell"
                    key={`${rowIndex}-${colIndex}-${cell}`}
                    style={{
                      border: "1px solid #333",
                    }}
                  ></div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
}

function generateRandomPuzzle(array) {
  const shuffleArray = shuffle(array);
  const puzzle = [[], [], []];
  puzzle[0].push(shuffleArray[0]);
  puzzle[0].push(shuffleArray[1]);
  puzzle[0].push(shuffleArray[2]);
  puzzle[1].push(shuffleArray[3]);
  puzzle[1].push(shuffleArray[4]);
  puzzle[1].push(shuffleArray[5]);
  puzzle[2].push(shuffleArray[6]);
  puzzle[2].push(shuffleArray[7]);
  puzzle[2].push(shuffleArray[8]);
  return puzzle;
}

function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function getBlankCellPosition(puzzle, BLANKCELL) {
  let blankCellRowIndex = null;
  let blankCellColIndex = null;

  for (let row = 0; row < puzzle.length; row++) {
    const rowArray = puzzle[row];
    for (let col = 0; col < rowArray.length; col++) {
      const cell = rowArray[col];
      if (cell === BLANKCELL) {
        blankCellRowIndex = row;
        blankCellColIndex = col;
      }
    }
  }

  return { blankCellRowIndex, blankCellColIndex };
}

// Compare the puzzle with the answer, if they are equal then the user win.
function isWin(ANSWER, puzzle) {
  for (let row = 0; row < puzzle.length; row++) {
    const rowArray = puzzle[row];
    for (let col = 0; col < rowArray.length; col++) {
      const cell = rowArray[col];
      if (cell !== ANSWER[row][col]) {
        return false;
      }
    }
  }

  return true;
}
