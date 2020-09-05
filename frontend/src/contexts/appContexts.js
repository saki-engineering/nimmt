import { createContext } from 'react'

export const AppContext = createContext({
    state: {
        isPlayed: Array(105).fill(false)
    },
    dispatch: null
});
