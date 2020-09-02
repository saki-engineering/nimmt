import { createContext } from 'react'

export const AppContext = createContext({
    isPlayed: Array(105).fill(false),
    toggleButton: () => {},
    multiOnButton: () => {}
});
