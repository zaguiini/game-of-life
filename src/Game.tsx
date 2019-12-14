import React from 'react'
import produce from 'immer'

interface GameProps {
  running: boolean
  speed: number
}

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]

const numRows = 50
const numCols = 50

const getGrid = (): number[][] => {
  return new Array(numRows).fill(new Array(numCols).fill(0))
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: `repeat(${numCols}, 20px)`,
}

const Game = ({ running, speed }: GameProps) => {
  const [grid, setGrid] = React.useState(getGrid)

  const toggleCell = React.useCallback(
    (rowIndex: number, columnIndex: number) => {
      setGrid((grid) =>
        produce(grid, (gridCopy) => {
          gridCopy[rowIndex][columnIndex] = +!grid[rowIndex][columnIndex]
        })
      )
    },
    []
  )

  React.useEffect(() => {
    let intervalId: number | undefined

    if (running) {
      intervalId = window.setInterval(() => {
        setGrid((grid) => {
          return produce(grid, (gridCopy) => {
            for (let row = 0; row < numRows; row++) {
              for (let column = 0; column < numCols; column++) {
                let neighbors = 0

                operations.forEach(([x, y]) => {
                  const newI = row + x
                  const newK = column + y

                  if (
                    newI >= 0 &&
                    newI < numRows &&
                    newK >= 0 &&
                    newK < numCols
                  ) {
                    neighbors += grid[newI][newK]
                  }
                })

                if (neighbors < 2 || neighbors > 3) {
                  gridCopy[row][column] = 0
                } else if (grid[row][column] === 0 && neighbors === 3) {
                  gridCopy[row][column] = 1
                }
              }
            }
          })
        })
      }, speed)
    } else {
      clearInterval(intervalId)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [running, speed])

  return (
    <div style={gridStyle}>
      {grid.map((row, rowIndex) =>
        row.map((_, columnIndex) => (
          <div
            key={`${rowIndex}-${columnIndex}`}
            onClick={() => toggleCell(rowIndex, columnIndex)}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[rowIndex][columnIndex] ? 'pink' : undefined,
              border: 'solid 1px black',
            }}
          />
        ))
      )}
    </div>
  )
}

export default Game
