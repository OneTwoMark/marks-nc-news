import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [username, setUsername] = useState(null)

    return (
        <UserContext.Provider value={{username, setUsername}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}