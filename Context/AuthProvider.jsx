import { createContext, useContext, useEffect, useState } from "react";
import { isValidString } from "../constants/helper";
import { CreateUser, GetUser, GetUserByIdentifier } from "../sql/auth/user";
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

    const login = async (identifier, password) => {
        // identifier can be user id, email or phone
        if (!isValidString([identifier, password])) {
            alert('Please enter both credentials');
            return;
        }

        try {
            const result = await GetUserByIdentifier(identifier);
            console.log("login lookup result", result);

            if (!result || result.password !== password) {
                alert("Invalid credentials");
                return;
            }

            // clear any existing session and create a new one
            await Delete_Session();
            await Create_session(result.id);
            setIsLoggedIn(true);
            setUser(result);
        } catch (error) {
            console.log("Login error", error);
            alert("An error occurred during login");
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
    const logout = async () => {
        try {
        await Delete_Session();
        setUser(null)
        setIsLoggedIn(false)
        } catch (error) {
         console.log("Error while log out",error)
         return
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider