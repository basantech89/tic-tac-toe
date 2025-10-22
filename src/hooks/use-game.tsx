import React from 'react'

type Player = 'X' | 'O'
type Board = Array<Player | ''>

type Game = {
	board: Board
	playTurn: (index: number) => void
	winner: Winner
	isGameTied: boolean
	resetGame: () => void
}

export const gameContext = React.createContext<Game | null>(null)

export const useGame = () => {
	const game = React.useContext(gameContext)

	if (game === null) {
		throw new Error('useGame must be used within a GameProvider')
	}

	return game
}

const initialValue = Array(9).fill('')

const initialTurn: Player = 'O'
let currentTurn: Player = initialTurn

type Winner = Player | null

const checkGameWinner = (board: Board): Winner => {
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	for (const combination of winningCombinations) {
		const [a, b, c] = combination
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a]
		}
	}

	return null
}

const checkGameTied = (board: Board) => board.every(cell => cell !== '')

let winner: Winner = null
let isGameTied = false

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const [board, setBoard] = React.useState<Board>(initialValue)

	const resetGame = React.useCallback(() => {
		currentTurn = initialTurn
		winner = null
		isGameTied = false
		setBoard(initialValue)
	}, [])

	const playTurn = React.useCallback((index: number) => {
		currentTurn = currentTurn === 'X' ? 'O' : 'X'

		setBoard(prevBoard => {
			if (prevBoard[index] !== '') {
				return prevBoard
			}

			const newBoard = prevBoard.with(index, currentTurn)

			winner = checkGameWinner(newBoard)
			isGameTied = !winner && checkGameTied(newBoard)

			return newBoard
		})
	}, [])

	const value = React.useMemo(
		() => ({ board, playTurn, winner, isGameTied, resetGame }),
		[board, playTurn, resetGame],
	)

	return <gameContext.Provider value={value}>{children}</gameContext.Provider>
}
