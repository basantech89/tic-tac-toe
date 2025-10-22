import type React from 'react'

import { Button } from './ui/button'
import { useGame } from '@/hooks/use-game'

export default function Square({
	children,
	index,
	...rest
}: React.ComponentProps<'button'> & {
	index: number
}) {
	const { playTurn } = useGame()
	const handleClick = () => playTurn(index)

	return (
		<Button
			className="min-h-20 min-w-20 cursor-text rounded-none border text-2xl shadow hover:border-slate-300"
			onClick={handleClick}
			variant="secondary"
			{...rest}
		>
			{children}
		</Button>
	)
}
