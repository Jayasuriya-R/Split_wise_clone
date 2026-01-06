import { createContext, useContext, useState } from "react";
import { isValidString } from "../constants/helper";
import { CreateUser } from "../sql/auth/user";
import { Create_session, Delete_Session } from "../sql/auth/session";

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

    const login = (email, password) => {

        if(!email || !password || email.trim() ==="" || password.trim()==="") {
            return
        }


     }
    const signup = async (name, email, phone, password) => {
        if(isValidString([name, email, phone, password])) {
        const result = await CreateUser(name,email,phone, password )
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