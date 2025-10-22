/** biome-ignore-all lint/suspicious/noArrayIndexKey: we're not changing the array structure */

import Square from './square'
import { Button } from './ui/button'
import { useGame } from '@/hooks/use-game'

export default function Game() {
	const { board, winner, isGameTied, resetGame } = useGame()

	return (
		<div className="grid gap-15">
			<h2 className="text-center font-bold text-2xl">
				Game Status:{' '}
				{winner
					? `Winner: ${winner}`
					: isGameTied
						? 'Game Tied'
						: 'In Progress'}
			</h2>

			<div className="grid grid-cols-3">
				{board.map((cell, index) => (
					<Square disabled={!!winner || isGameTied} index={index} key={index}>
						{cell}
					</Square>
				))}
			</div>

			<Button onClick={resetGame}>Reset Game</Button>
		</div>
	)
}
