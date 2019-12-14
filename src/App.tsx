import React from 'react'
import Game from './Game'

const App = () => {
  const [running, setRunning] = React.useState(false)
  const [speed, setSpeed] = React.useState(1000)

  return (
    <div>
      <p>
        <button onClick={() => setRunning((running) => !running)}>
          {running ? 'Stop' : 'Start'}
        </button>{' '}
        Every{' '}
        <input
          placeholder="Input the speed"
          onChange={({ target }) => setSpeed(parseInt(target.value, 10))}
          value={speed}
          type="number"
        />{' '}
        milliseconds
      </p>
      <Game running={running} speed={speed} />
    </div>
  )
}

export default App
