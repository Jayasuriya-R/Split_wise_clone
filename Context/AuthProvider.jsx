import { createContext, useContext, useEffect, useState } from "react";
import { isValidString } from "../constants/helper";
import { CreateUser, GetUser } from "../sql/auth/user";
import { Create_session, Delete_Session, Get_Session } from "../sql/auth/session";

const AuthContext = createContext({
    user: null,
    isLoggedIn: false,
    login: (id, password) => { },
    signup: (name, email, phone, password) => { },
    logout: () => { }
})
export const useAuth = () => useContext(AuthContext)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        checkSession()
    }, [])

    const checkSession = async () => {
        try {
            const session = await Get_Session()
            console.log("session created", session)

            if (session?.[0]?.user_id) {
                const userId = session?.[0]?.user_id
                const curUser = await GetUser(userId)
                setUser(curUser)
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const login = async (id, password) => {
        if (isValidString([password])) {
            const result = await GetUser(id)
            console.log("login", result)
            if (!result.password === password) {
                alert("Invalid credentials")
            }
            await Delete_Session()
            await Create_session(result?.id)
            setIsLoggedIn(true)
            console.log("result", result)
            setUser(result)
        }
    }
    const signup = async (name, email, phone, password) => {
        if (isValidString([name, email, phone, password])) {
            const result = await CreateUser(name, email, phone, password)
            await Delete_Session()
            const session = await Create_session(result?.id)
            console.log(session)
            console.log("session created")
            setUser(result)
            setIsLoggedIn(true)
        }
    }
    const logout = () => { }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider