import './App.css'

import Game from './components/game'
import { GameProvider } from './hooks/use-game'

function App() {
	return (
		<GameProvider>
			<Game />
		</GameProvider>
	)
}

export default App
