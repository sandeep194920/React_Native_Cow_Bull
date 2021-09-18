import React, { useState, useContext } from 'react'

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {

    const [theme, setTheme] = useState('blue')

    const changeTheme = (color) => {
        setTheme(color)
    }

    return <AppContext.Provider value={{ theme, changeTheme }}>
        {children}
    </AppContext.Provider>
}

export const useGlobal = () => {
    return useContext(AppContext)
}
