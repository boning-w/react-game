import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import img0 from "./game-data/1.png";
import img1 from "./game-data/2.png";
import img2 from "./game-data/3.png";
import img3 from "./game-data/4.png";
import img4 from "./game-data/5.png";
import img5 from "./game-data/6.png";
import img6 from "./game-data/7.png";
import img7 from "./game-data/8.png";

const dataImg = [img0, img1, img2, img3, img4, img5, img6, img7, null];

export default function GameSlidingPuzzle() {
  console.groupEnd();
  console.group(`[${GameSlidingPuzzle.name}]`);
  // Define the blank cell (white cell) in the puzzle
  const BLANKCELL = 8;
  // Define the answer to the puzzle.
  // Each number refers to the related image data
  const ANSWER = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, BLANKCELL],
  ];
  const [puzzle, updatePuzzle] = useImmer(
    generateRandomPuzzle(ANSWER.flat(1), BLANKCELL)
  );
  const { blankCellRowIndex, blankCellColIndex } = getBlankCellPosition(
    puzzle,
    BLANKCELL
  );
  const [win, setWin] = useState(false);
  const [move, setMove] = useState(0);

  console.log(ANSWER);
  console.log(puzzle);
  console.log(move);

  useEffect(() => {
    if (!win && isWin(ANSWER, puzzle)) {
      alert("Correct!");
      updatePuzzle(generateRandomPuzzle(ANSWER.flat(1), BLANKCELL));
      setWin(false);
      setMove(0);
    }
  });

  const handleSolve = () => {
    updatePuzzle(ANSWER);
    setWin(true);
    setMove(1);
  };

  const handleReset = () => {
    updatePuzzle(generateRandomPuzzle(ANSWER.flat(1), BLANKCELL));
    setWin(false);
    setMove(0);
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
      <SlidingPuzzle
        puzzle={puzzle}
        updatePuzzle={updatePuzzle}
        BLANKCELL={BLANKCELL}
        blankCellRowIndex={blankCellRowIndex}
        blankCellColIndex={blankCellColIndex}
        move={move}
        setMove={setMove}
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
          disabled={move === 0}
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
  move,
  setMove,
}) {
  const [active, setActive] = useState(false);
  console.log(active);
  const handleMoveCell = (rowIndex, colIndex, cell) => {
    console.log(`Move cell: ${rowIndex}-${colIndex}-${cell}`);
    const rowDistance = blankCellRowIndex - rowIndex;
    const colDistance = blankCellColIndex - colIndex;
    console.log(rowDistance, colDistance);

    // The cell and the blanl cell are in the same row
    if (rowDistance === 0 && (colDistance === -1 || colDistance === 1)) {
      updatePuzzle((draft) => {
        draft[rowIndex][colIndex] = BLANKCELL;
        draft[blankCellRowIndex][blankCellColIndex] = cell;
      });
      setMove(move + 1);
      return;
    }

    // The cell and the blanl cell are in the same col
    if (colDistance === 0 && (rowDistance === -1 || rowDistance === 1)) {
      updatePuzzle((draft) => {
        draft[rowIndex][colIndex] = BLANKCELL;
        draft[blankCellRowIndex][blankCellColIndex] = cell;
      });
      setMove(move + 1);
      return;
    }
  };

  const handleActiveSlidoGrid = () => {
    setActive(true);
  };

  const handleKeyDown = (e) => {
    e = e || window.event;

    switch (e.keyCode) {
      case 37:
        // left
        console.log("left");
        if (blankCellColIndex !== 2) {
          updatePuzzle((draft) => {
            draft[blankCellRowIndex][blankCellColIndex] =
              puzzle[blankCellRowIndex][blankCellColIndex + 1];
            draft[blankCellRowIndex][blankCellColIndex + 1] = BLANKCELL;
          });
        }
        break;
      case 38:
        // up
        console.log("up");
        if (blankCellRowIndex !== 2) {
          updatePuzzle((draft) => {
            draft[blankCellRowIndex][blankCellColIndex] =
              puzzle[blankCellRowIndex + 1][blankCellColIndex];
            draft[blankCellRowIndex + 1][blankCellColIndex] = BLANKCELL;
          });
        }

        break;
      case 39:
        // right
        console.log("right");
        if (blankCellColIndex !== 0) {
          updatePuzzle((draft) => {
            draft[blankCellRowIndex][blankCellColIndex] =
              puzzle[blankCellRowIndex][blankCellColIndex - 1];
            draft[blankCellRowIndex][blankCellColIndex - 1] = BLANKCELL;
          });
        }

        break;
      case 40:
        // down
        console.log("down");
        if (blankCellRowIndex !== 0) {
          updatePuzzle((draft) => {
            draft[blankCellRowIndex][blankCellColIndex] =
              puzzle[blankCellRowIndex - 1][blankCellColIndex];
            draft[blankCellRowIndex - 1][blankCellColIndex] = BLANKCELL;
          });
        }

        break;
      default:
        break;
    }
  };

  if (active) {
    document.onkeydown = handleKeyDown;
  }

  return (
    <div onClick={handleActiveSlidoGrid}>
      {puzzle.map((row, rowIndex) => {
        return (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, colIndex) => {
              if (cell !== BLANKCELL) {
                return (
                  <img
                    id={`${rowIndex}-${colIndex}-${cell}`}
                    key={`${rowIndex}-${colIndex}-${cell}`}
                    src={dataImg[cell]}
                    alt={`img${dataImg[cell]}`}
                    style={{ border: "1px solid #333", cursor: "pointer" }}
                    onClick={() => handleMoveCell(rowIndex, colIndex, cell)}
                  />
                );
              } else {
                return (
                  <div
                    key={`${rowIndex}-${colIndex}-${cell}`}
                    style={{
                      width: 150,
                      height: 150,
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

function generateRandomPuzzle(array, BLANKCELL) {
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
  puzzle[2].push(shuffleArray[BLANKCELL]);
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

  if (!puzzle) {
    return { blankCellRowIndex, blankCellColIndex };
  }

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
