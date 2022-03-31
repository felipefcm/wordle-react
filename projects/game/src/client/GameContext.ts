import MatchState from '@common/MatchState'
import React from 'react'

import { EventBus } from '../common/EventBus'

export type GameContextType = {
	eventBus: EventBus
	matchState: MatchState
}

export const GameContext = React.createContext<GameContextType | null>(null)
