import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ 
    user: null,
     isLoggedIn: false,
      login: (id, password) => { },
      signup : (name, password, phone) => { },
      logout : () => { }
     })
export const useAuth = ()=> useContext(AuthContext)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = (id, password) => { }
    const signup = (name, password, phone) => { }
    const logout = () => { }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider