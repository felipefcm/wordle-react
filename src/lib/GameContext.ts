import React from "react"

import { EventBus } from "./EventBus"

export type GameContextType = {
	eventBus: EventBus
}

export const GameContext = React.createContext<GameContextType | null>(null)
